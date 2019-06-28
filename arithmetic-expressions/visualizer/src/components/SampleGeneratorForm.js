import React from 'react';
import './SampleGeneratorForm.css';

class SampleGeneratorForm extends React.Component {
  onSelectHandler = (e) => {
    const el = document.getElementById('sample-generator-select');
    const value = el.options[el.selectedIndex].value;
    this.props.onReCalcHandler(value);
  };

  render() {
    const options = [];
    for (let i = 2; i <= 8; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return (
      <div className="SampleGeneratorForm">
        <div>
          Re-calculate the samples: 
        </div>
        <select
          id="sample-generator-select"
          className="SampleGeneratorForm-select"
          defaultValue={this.props.sampleN}
          onChange={this.onSelectHandler}
        >
          {options}
        </select>
      </div>
    );
  }
};

export default SampleGeneratorForm;