import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { useNavigation } from "@libs/states"

export default function Home({ page, articles }) {
  let setNavigationHome = useNavigation((state) => state.setNavigationHome);
  setNavigationHome()

  return (
    <Layout 
      page={page}
      articles={articles}
    >
    </Layout>
  );
}

export const getStaticProps = async () => {

  const homePageId = "82491ac216894c7f9dae484a1dc0cf2b";
  const page = await getPage(homePageId);
  const pageContent = await getContent(homePageId);
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
