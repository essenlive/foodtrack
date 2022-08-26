import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { useArticle } from "@libs/states"

export default function Home({ page, articles }) {
  let setArticleInactive = useArticle((state) => state.setArticleInactive);
  setArticleInactive()

  return (
    <Layout 
      page={page}
      nav={{
        menuActive: true,
        articleActive: false
      }}
      articles={articles}
    >
    </Layout>
  );
}

export const getStaticProps = async () => {

  const homePageId = "82491ac216894c7f9dae484a1dc0cf2b";
  const page = await getPage("82491ac216894c7f9dae484a1dc0cf2b");
  const pageContent = await getContent("82491ac216894c7f9dae484a1dc0cf2b");
  const articles = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8")
  return {
    props: {
      page,
      blocks: pageContent,
      articles
    },
    revalidate: 1,
  };
};
