import styles from "@styles/resources.module.css";
import classNames from "classnames";
import { RenderPlainText } from "@components/RenderBlock";
import Card from "@components/Card";
import dynamic from "next/dynamic";
const TimelineContainer = dynamic(() => import("@components/TimelineContainer"), { ssr: false })

export default function Resources({className, articles}) {

    return(
        <div className={classNames(className, styles.resources)}>
            <TimelineContainer articles={articles} className={styles.timeline}/>

            <ul className={styles.articles}>

                {articles.map((item, id) => {
                    let date = null
                    if ( !!item.properties?.Date?.date?.start){
                        date = new Date(item.properties.Date.date.start).toLocaleString("fr-FR", { month: "short", year: "numeric" });
                    }
                        

                    let src = null;
                    if (!!item?.cover) {
                        src = item?.cover?.type === "external" ? item.cover.external.url : item.cover.file.url;
                    }
                    return (
                        <Card
                            id={id}
                            key={id}
                            title={RenderPlainText(item.properties.Name.title)}
                            description={date}
                            tags={item.properties.Aliment.multi_select.map(el => el.name)}
                            colorMap={item.properties.Aliment.multi_select.map(el => "var(--gray-200")}
                            link={{
                                path: `/articles/${item.id}`,
                                text: "Lire l'article"
                            }}
                            image={src ? { src: src } : null}

                        />
                    )
                })}
            </ul>
        </div>
        )
}