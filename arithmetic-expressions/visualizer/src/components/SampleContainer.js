import React from 'react';
import './SampleContainer.css';

class SampleContainer extends React.Component {
  render() {
    const cells = [];
    for (let i = 0; i < this.props.samples.length; i++) {
      const sample = this.props.samples[i];
      const selected = this.props.selectedDepth === i ? 'SampleContainer-selected' : '';
      cells.push(
        <div 
          className={`SampleContainer-cell ${selected}`}
          onClick={() => this.props.onUpdateResultFilter(i)}
          key={i}
        >
          {sample}
        </div>
      );
    }

    const allButtonSelected = this.props.selectedDepth === 'all' ? 'SampleContainer-selected' : '';
    const answersButtonSelected = this.props.selectedDepth === 'answers' ? 'SampleContainer-selected' : '';

    return (
      <div className="SampleContainer-wrapper">
        <div className="SampleContainer">
          {cells}
        </div>
        <div
          className={`SampleContainer-button ${allButtonSelected}`}
          onClick={() => this.props.onUpdateResultFilter('all')}
        >
          ALL
        </div>
        <div
          className={`SampleContainer-button ${answersButtonSelected}`}
          onClick={() => this.props.onUpdateResultFilter('answers')}
        >
          ANS
        </div>
      </div>
    );
  }
}

export default SampleContainer;