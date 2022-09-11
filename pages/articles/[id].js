import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/article.module.css";
import classNames from "classnames";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigation } from "@libs/states";
import Tags from "@components/Tags";
import Articles from "@components/Articles";
import { useEffect } from "react";

export default function Article({ page, blocks, articles, className }) {
  let { setNavigationAside, setNavigationMenu } = useNavigation((state) => state);
  useEffect(() => {
    setNavigationMenu(false)
    setNavigationAside(true)
  });


  if (!page) return (<div />)
  let date = null
  if (!!page.properties?.Date?.date?.start) {
    date = new Date(page.properties.Date.date.start).toLocaleString("fr-FR", { year: "numeric" });
  };



  return (
    <Layout
      page={page}
      articles={articles}
    >
      <Link href={`/`} >
        <div className={styles.back} onClick={()=>{setNavigationAside(false)}}>
          <VscChromeClose />
        </div>
      </Link>
      <div className={classNames(className, styles.article)}>

        {page.cover &&

          <img className={styles.cover} src={page.cover.type === "external" ? page.cover.external.url :
            page.cover.file.url} alt="" />
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
          {page.properties?.Phase?.select?.name &&
            <h4 className={styles.subtitle}> {page.properties?.Phase.select.name}</h4>
          }
          {page.properties?.Aliment &&
            <Tags 
              tags={page.properties.Aliment.multi_select.map(el => el.name)}
               colorMap={page.properties.Aliment.multi_select.map(el => "var(--gray-200")}
              className={styles.tags} dark={true} />
          }

        </div>
        <div className={styles.content}>

          {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
        </div>
        {page.properties?.Relations.relation.length > 0 && 
          <div className={styles.related}>
            <h3>Articles liés</h3>
            <Articles articles={page.properties?.Relations?.relation}/>
          </div>
        }
      </div>

    </Layout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8")
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocksWithChildren = await getContent(id);
  
  // Get related pages information
  if (page.properties?.Relations?.relation){
    page.properties.Relations.relation = await Promise.all(page.properties?.Relations.relation.map(async relation => await getPage(relation.id)))
  }
  
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
