import { Title, Paragraph } from '@mindme/shared';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <Title title="Hello This is title" />
    <Paragraph description="Hello This is paragraph" />
  </Layout>
);

export default IndexPage;
