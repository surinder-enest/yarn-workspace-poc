import React, { Component, ReactNode } from 'react';

import { Thing } from '@mindme/shared';

export default class App extends Component {
  public render(): ReactNode {
    return (
      <div>
        Hello
        <Thing />
      </div>
    );
  }
}
