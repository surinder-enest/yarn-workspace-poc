import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props {
  [otherProps: string]: any;
}

export default class CustomSelectDropdown extends Component<Props> {
  animatedComponents = makeAnimated();

  render() {
    return <Select {...this.props} components={this.animatedComponents} />;
  }
}
