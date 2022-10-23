import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/pages/article.module.css";
import classNames from "classnames";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigation } from "@libs/states";
import Tags from "@components/Tags";
import Articles from "@components/Articles";

export default function Article({ page, blocks, articles, className }) {
  let setNavigationAside = useNavigation((state) => state.setNavigationAside);
  setNavigationAside(true)


  if (!page) return (<div />)

  return (
    <Layout
      page={page}
      articles={articles}
    >
    <>
      <Link href={`/`} >
        <div className={styles.back} onClick={()=>{setNavigationAside(false)}}>
          <VscChromeClose />
        </div>
      </Link>
      <div className={classNames(className, styles.article)}>
        <div className={styles.cover}>

        {page.cover && <img className={styles.cover} src={page.cover} alt="" />}

        {page.Date.formatted &&
          <div className={styles.date}>
            {page.Date.formatted}
          </div>
        }
        </div>

      <div className={styles.page}>

        <div className={styles.infos}>

          {page.page_title &&
            <h2 className={styles.title}>
              {`${page.icon} ${page.page_title}`}
            </h2>
          }

          {page.Phase &&
            <h4 className={styles.subtitle}> {page.Phase}</h4>
          }
          {page?.Aliment &&
            <Tags 
              tags={page.Aliment}
              colorMap={page.Aliment.map(el => "var(--gray-200")}
              className={styles.tags} dark={true} />
          }

        </div>
        <div className={styles.content}>

          {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
        </div>
        </div>
        {page.Relations.length > 0 &&   
          <div className={styles.related}>
            <Articles articles={page.Relations}/>
          </div>
        }
      </div>

    </>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const articles = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8", {
    "property": "Validée",
    "checkbox": { "equals": true }
  })
  return {
    paths: articles.map((page) => ({ params: { id: page.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocksWithChildren = await getContent(id);
  page.Relations = await Promise.all(page.Relations.map(async relation => await getPage(relation)))

  
  const articles = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8", {
    "property": "Validée",
    "checkbox": { "equals": true }
  })

  return {
    props: {
      page,
      blocks: blocksWithChildren,
      articles
    },
    revalidate: 1,
  };
};
