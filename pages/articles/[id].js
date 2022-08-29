import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/article.module.css";
import classNames from "classnames";
import { VscChromeClose } from "react-icons/vsc";
import { useArticle } from "@libs/states"

export default function Articles({ page, blocks, articles, className }) {
  let setArticleActive = useArticle((state) => state.setArticleActive);
  setArticleActive()

  if(!page)return(<div/>)
  let date = null
  if (!!page.properties?.Date?.date?.start) {
    date = new Date(page.properties.Date.date.start).toLocaleString("fr-FR", { 
      month: "short", 
      year: "numeric" 
    });
  };



  return (
    <Layout
      page={page}
      nav={{
        menuActive: true,
        articleActive: true
      }}
      articles={articles}
    >
      <Link href={`/`} >
        <div className={styles.back}>
          <VscChromeClose />
        </div>
      </Link>
      <div className={classNames(className, styles.article)}>

      {page.cover &&

        <img className={styles.cover} src={page.cover.type === "external" ? page.cover.external.url :
        page.cover.file.url} alt=""/>
      }
      <div className={styles.infos}>
        
      {page.page_title &&
        <h2 className={styles.title}>
          {page?.icon && page?.icon?.emoji} <RenderText text={page.page_title} />
        </h2>
        }

      {date && 
        <div className={styles.date}>
          {date}
        </div>
        }
        
      </div>
      <div className={styles.content}>

        {blocks.map((block) => (<RenderBlock block={block} key={block.id}/>))}
        </div>
      </div>

    </Layout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8")
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocksWithChildren = await getContent(id); 
  const articles = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8")

  return {
    props: {
      page,
      blocks: blocksWithChildren,
      articles
    },
    revalidate: 1,
  };
};
