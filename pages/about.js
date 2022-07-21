import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import styles from "@styles/about.module.css"
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import classNames from "classnames";

export default function Home({ page, blocks, timeline, className }) {
  
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
        <div className={styles.close}>
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

  const thisPage = JSON.parse(process.env.PAGES).filter((pages)=>(pages.route === "about"))[0];
  const page = await getPage(thisPage.id);
  const pageContent = await getContent(thisPage.id);
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
