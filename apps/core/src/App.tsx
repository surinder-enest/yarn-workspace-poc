import React, { Component, ReactNode } from 'react';

import { HelloWorld } from '@mindme/shared';

export default class App extends Component {
  public render(): ReactNode {
    return (
      <div>
        Hello
        <HelloWorld />
      </div>
    );
  }
}
