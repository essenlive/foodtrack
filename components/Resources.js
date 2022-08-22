import styles from "@styles/resources.module.css";
import classNames from "classnames";
import { RenderPlainText } from "@components/RenderBlock";
import Card from "@components/Card";
import dynamic from "next/dynamic";
const Timeline = dynamic(() => import("@components/Timeline"), { ssr: false })

export default function Resources({className, timeline}) {

    return(
        <div className={classNames(className, styles.resources)}>
            <Timeline timeline={timeline} className={styles.timeline}/>
            <ul className={styles.articles}>

                {timeline.map((item, id) => {
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
                            title={RenderPlainText(item.properties.Name.title)}
                            description={date}
                            tags={item.properties.Aliment.multi_select.map(el => el.name)}
                            colorMap={item.properties.Aliment.multi_select.map(el => el.color)}
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