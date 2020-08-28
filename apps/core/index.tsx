import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Title, BuilderElementModel, TitleModel } from '@mindme/shared';
import { title } from 'process';

const App = () => {
  let builderElement = new BuilderElementModel();
  builderElement.title = new TitleModel();
  builderElement.title.text = '<p style="text-align: center; word-break: break-word; margin: 0px; white-space: pre-wrap;"><span style="font-size: 24px;">This is a Title s</span></p>';
  return (
    <div>
      <p>This is playgroud for testing the componets from the shared workspace</p>
      <Title builderElement={builderElement} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
