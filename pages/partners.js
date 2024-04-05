import { getContent, getDatabase, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import styles from "@styles/pages/aside.module.css"
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import classNames from "classnames";
import { useNavigation } from "@libs/states";

export default function Contribute({ page, blocks, articles, className }) {
    let setNavigationAside = useNavigation((state) => state.setNavigationAside);
    setNavigationAside(true)



    return (
        <Layout
            page={page}
            articles={articles}
        >
            <Link href={`/`} >
                <div className={styles.close} onClick={() => { setNavigationAside(false) }}>
                    <IoMdClose />
                </div>
            </Link>
            <div className={classNames(className, styles.about)}>


                <div className={styles.cover}>
                    {page.cover && <img className={styles.cover} src={page.cover} alt="" />}
                </div>

                <div className={styles.page}>

                    <div className={styles.infos}>

                        {page.page_title &&
                            <h2 className={styles.title}>
                                {page.icon && page.icon.emoji} {page.page_title}
                            </h2>
                        }
                    </div>
                    <div className={styles.content}>
                        {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {

    const pageId = "ee61099ba45a449598d34f74c2432533";
    const page = await getPage(pageId);
    const pageContent = await getContent(pageId);

    const articles = await getDatabase("f1d9d65a470043d493bb31e0e7fb62c8", {
        "property": "Validée",
        "checkbox": { "equals": true }
    })

    return {
        props: {
            page,
            blocks: pageContent,
            articles
        },
        revalidate: 1,
    };
};
