import React from 'react';
import SampleGeneratorForm from './components/SampleGeneratorForm';
import SampleContainer from './components/SampleContainer';
import ResultTable from './components/ResultTable';
import './App.css';
const ArithmeticExpressions = require('./arithmetic-expressions-test');

class App extends React.Component {
  constructor(props) {
    super(props);

    const initialSampleN = 5;
    const initialSelectedDepth = 'all';

    const AE = this.initAE(initialSampleN);

    this.state = {
      selectedDepth: initialSelectedDepth,
      sampleN: initialSampleN,
      result: AE.result,
      samples: AE.samples,
      hasAnswer: false,
    };
  }

  onUpdateResultFilter = (depth) => {
    this.setState({selectedDepth: depth});
  };

  onReCalcHandler = (_sampleN) => {
    console.log('on recalc', _sampleN);
    const sampleN = parseInt(_sampleN);
    if (typeof sampleN === 'number' && Number.isInteger(sampleN)) {
      const AE = this.initAE(sampleN);
      this.setState({
        sampleN: sampleN,
        result: AE.result,
        samples: AE.samples,
        selectedDepth: 'all',
      });
    }
  };

  initAE = (sampleN) => {
    const AE = new ArithmeticExpressions(sampleN);
    console.log(AE);
    return AE;
  };

  render() {
    return (
      <div className="App">
        <SampleGeneratorForm
          sampleN={this.state.sampleN}
          onReCalcHandler={this.onReCalcHandler}
        />
        <SampleContainer
          samples={this.state.samples}
          selectedDepth={this.state.selectedDepth}
          onUpdateResultFilter={this.onUpdateResultFilter}
        />
        <ResultTable
          result={this.state.result}
          selectedDepth={this.state.selectedDepth}
        />
      </div>
    );
  }
}

export default App;
