function initSamples(samples, sampleN) {
  for (let i = 0; i < sampleN; i++) {
    const int = Math.floor(Math.random() * 100) + 1;
    samples.push(int);
  }
  console.log('-------------------------------------------------------------');
  console.log('samples', samples);
  console.log('');
}

function setChildNodesRecursively({rootNode, maxDepth, samples}) {
  let targetNode = rootNode;

  while (true) {
    // set operator
    let operator = null;
    while (operator === null) {
      // check what operator is not created with as the targetNode's childNode
      if (!targetNode.hasChildNodeWithOperator('+')) operator = '+';
      else if (!targetNode.hasChildNodeWithOperator('-')) operator = '-';
      else if (!targetNode.hasChildNodeWithOperator('*')) operator = '*';
      else if (targetNode.depth === 0) {
        // if it has all childNodes needed and it is the rootNode, you are done
        return;
      } else {
        // the current targetNode already has all the operators in its childNodes,
        // so go upstream the node tree
        targetNode = targetNode.parentNode;
      }
    }
  
    // add childNode to targetNode
    const newNode = new ResultNode({
      parentNode: targetNode,
      indexInSamples: targetNode.depth + 1,
      operator: operator,
      samples: samples,
    });
    targetNode.childNodes.push(newNode);

    if (newNode.depth < maxDepth) {
      // if you can still go deeper, go
      targetNode = newNode;
    }
  }
}

function ResultNode({parentNode, indexInSamples, operator, samples}) {
  let total, expression;
  let value = samples[indexInSamples];
  if (parentNode === null) {
    // which means this is root node
    total = value;
    operator = null;
    expression = `${value}`;
  } else {
    // operator validation and pre-process
    if (typeof parentNode !== typeof this) {
      console.error(`invalid parentNode type. parentNode: ${typeof parentNode}`);
    }
    switch(operator) {
      case '+':
        total = parentNode.total + value;
        expression = `${parentNode.expression}+${value}`;
        break;
      case '-':
        total = parentNode.total - value;
        expression = `${parentNode.expression}-${value}`;
        break;
      case '*':
        total = parentNode.total * value;
        expression = `${parentNode.expression}*${value}`;
        break;
      default:
        console.error('invalid operator', operator);
        process.exit(1);
    }
  }

  // properties
  this.parentNode = parentNode;
  this.value = value;
  this.depth = indexInSamples;
  this.operator = operator;
  this.expression = expression;
  this.total = total;
  this.remainder = total % 101;
  this.remainderDash = 101 - this.remainder;
  this.childNodes = [];
}

// methods
ResultNode.prototype.hasChildNodeWithOperator = function(operator) {
  if (operator !== '+' && operator !== '-' && operator !== '*') {
    console.error('invalid operator', operator);
    process.exit(1);
  }
  for (let childNode of this.childNodes) {
    if (childNode.operator === operator) return true;
  }
  return false;
}
// ===================================================================

const ArithmeticExpressions = function (sampleN) {
  this.sampleN = sampleN;
  this.samples = [];
  initSamples(this.samples, this.sampleN);
  this.result = new ResultNode({
    parentNode: null,
    indexInSamples: 0,
    operator: null,
    samples: this.samples,
  });
  setChildNodesRecursively({
    rootNode: this.result,
    maxDepth: this.sampleN - 1,
    samples: this.samples,
  });
};

module.exports = ArithmeticExpressions;