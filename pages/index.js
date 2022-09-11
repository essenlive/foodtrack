import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { useNavigation } from "@libs/states"
import { validatedArticles } from "@libs/filtersHelper";
// import { useEffect } from "react";

export default function Home({ page, articles }) {
  let { navigationMenuState, setNavigationMenu } = useNavigation((state) => state);
  if (navigationMenuState === null) setNavigationMenu(true)

  // useEffect(() => {
  //   setNavigationAside(false)
  // });

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
  const articles = validatedArticles(await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8"))
  return {
    props: {
      page,
      blocks: pageContent,
      articles
    },
    revalidate: 1,
  };
};
