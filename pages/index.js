import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";

export default function Home({ page, timeline }) {
  
  return (
    <Layout 
      page={page}
      nav={{
        menuActive: true,
        articleActive: false
      }}
      timeline={timeline}
    >
    </Layout>
  );
}

export const getStaticProps = async () => {

  const homePage = JSON.parse(process.env.PAGES).filter((pages)=>(pages.route === ""))[0];
  const page = await getPage(homePage.id);
  const pageContent = await getContent(homePage.id);
  const timeline = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8")
  return {
    props: {
      page,
      blocks: pageContent,
      timeline
    },
    revalidate: 1,
  };
};
