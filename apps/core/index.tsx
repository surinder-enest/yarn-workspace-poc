import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Title } from '@mindme/shared';

const App = () => {
  return (
    <div>
      <p>This is playgroud for testing the componets from the shared workspace</p>
      <Title title="test" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
