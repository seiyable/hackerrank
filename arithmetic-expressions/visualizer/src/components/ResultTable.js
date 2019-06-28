import React from 'react';
import './ResultTable.css';

export default (props) => {
  const result = props.result;
  const selectedDepth = props.selectedDepth;
  const nodesAtTheSelectedDepth = [];
  iterateRecursively(result, true);
  nodesAtTheSelectedDepth.sort((a, b) => {
    if (a.depth < b.depth) return -1;
    if (a.depth > b.depth) return 1;
    return 0;
  })

  const rows = [];
  for (let el of nodesAtTheSelectedDepth) {
    const solved = el.remainder === 0 ? 'ResultTable-solved' : '';
    rows.push(
      <tr key={rows.length} className="ResultTable-tr">
        <td className={`ResultTable-td ${solved}`}>{el.expression}</td>
        <td className={`ResultTable-td ${solved}`}>{el.depth}</td>
        <td className={`ResultTable-td ${solved}`}>{el.total}</td>
        <td className={`ResultTable-td ${solved}`}>{el.remainder}</td>
        <td className={`ResultTable-td ${solved}`}>{el.remainderDash}</td>
      </tr>
    );
  }

  function iterateRecursively(node, isRoot) {
    if (isRoot) {
      if (node.depth === selectedDepth || selectedDepth === 'all') {
        nodesAtTheSelectedDepth.push(node);
      }
    }
    for (let el of node.childNodes) {
      if (el.depth === selectedDepth || selectedDepth === 'all') {
        nodesAtTheSelectedDepth.push(el);
      } else if (selectedDepth === 'answers' && el.remainder === 0) {
        nodesAtTheSelectedDepth.push(el);
      }
      iterateRecursively(el, false);
    }
  }

  return (
    <table className="ResultTable">
      <thead>
        <tr className="ResultTable-tr">
          <th className="ResultTable-th">expression</th>
          <th className="ResultTable-th">depth</th>
          <th className="ResultTable-th">total</th>
          <th className="ResultTable-th">rmndr</th>
          <th className="ResultTable-th">101-rmndr</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}