import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import styles from "@styles/about.module.css"
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import classNames from "classnames";
import { useNavigation } from "@libs/states";
// import { useEffect } from "react";
import { validatedArticles } from "@libs/filtersHelper";

export default function Home({ page, blocks, articles, className }) {
  let setNavigationAside = useNavigation((state) => state.setNavigationAside);
  setNavigationAside(true)
  // useEffect(() => {
  //   setNavigationMenu(false)
  // });
  console.log('about');

  return (
    <Layout 
      page={page}
      articles={articles}
    >
      <Link href={`/`} >
        <div className={styles.close}onClick={() => { setNavigationAside(false) }}>
          <IoMdClose />
        </div>
      </Link>
      <div className={classNames(className, styles.about)}>


      {page.cover &&

        <img className={styles.cover} src={page.cover.type === "external" ? page.cover.external.url :
          page.cover.file.url} alt="" />
      }
      <div className={styles.infos}>

        {page.page_title &&
          <h2 className={styles.title}>
            {page.icon && page.icon.emoji} <RenderText text={page.page_title} />
          </h2>
        }
        {page.page_title &&
          <h2 className={styles.title}>
            {page.icon && page.icon.emoji} <RenderText text={page.page_title} />
          </h2>
        }
      </div>
      <div className={styles.content}>
        {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {

  const aboutpageId = "28a70d4c59f54a84b57ae18abd4552e2";
  const page = await getPage(aboutpageId);
  const pageContent = await getContent(aboutpageId);

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
