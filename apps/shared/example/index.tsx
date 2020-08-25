import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Title } from '../src/index';

const App = () => {
  return (
    <div>
      <Title title="test" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));