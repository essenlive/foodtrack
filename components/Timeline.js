import styles from "@styles/timeline.module.css";
import classNames from "classnames";
import { RenderPlainText } from "@components/RenderBlock";
import Card from "@components/Card";

export default function Timeline({className, timeline}) {

    return(
        <ul className={classNames(className, styles.timeline)}>
                {timeline.map((item, id) => {
                    const date = new Date(item.properties.Date.date.start).toLocaleString("en-US", { month: "short", year: "numeric" });

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
        )
}