import { Title, Paragraph } from '@mindme/shared';
import Layout from '../components/Layout';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <Title title="Hello This is title" />
        <Paragraph description="Hello This is paragraph" />
      </Layout>
    );
  }
}
export default App;
