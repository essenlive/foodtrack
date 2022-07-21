import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/article.module.css";
import { FiArrowLeft } from "react-icons/fi";

export default function Post({ page, blocks, timeline }) {
  if(!page)return(<div/>)
  const date = new Date(page.properties.Date.date.start).toLocaleString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Layout
      page={page}
      nav={{
        menuActive: true,
        articleActive: true
      }}
      timeline={timeline}
    >
      <Link href={`/`} >
        <div className={styles.back}>
          <FiArrowLeft />
        </div>
      </Link>
      
      {page.cover &&

        <img className={styles.cover} src={page.cover.type === "external" ? page.cover.external.url :
        page.cover.file.url} alt=""/>
      }
      <div className={styles.infos}>
        
      {page.page_title &&
        <h2 className={styles.title}>
          {page.icon && page.icon.emoji} <RenderText text={page.page_title} />
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
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let database = JSON.parse(process.env.DATABASES).filter((database) => (database.name === "articles"))[0];
  database = await getDatabase(database.id, database.filter, database.sort);

  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocksWithChildren = await getContent(id); 
  const timeline = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8")

  return {
    props: {
      page,
      blocks: blocksWithChildren,
      timeline
    },
    revalidate: 1,
  };
};
