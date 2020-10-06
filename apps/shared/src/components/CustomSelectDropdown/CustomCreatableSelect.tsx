import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

interface Props {
  [otherProps: string]: any;
}

export default class CustomCreatableSelect extends Component<Props> {
  render() {
    return <CreatableSelect {...this.props} />;
  }
}
