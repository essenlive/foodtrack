import styles from "@styles/articles.module.css";
import classNames from "classnames";
import { RenderPlainText } from "@components/RenderBlock";
import Card from "@components/Card";
import { useSelection } from "@libs/states";

export default function Articles({className, articles}) {
    let selection = useSelection((state) => state.selection)

    return(
        <ul className={classNames(className, styles.articles)}>

                {articles.map((item, id) => {
                    let date = null
                    if (!!item.properties?.Date?.date?.start) {
                        date = new Date(item.properties.Date.date.start).toLocaleString("fr-FR", { year: "numeric" });
                    }
                    if (!!item.properties?.Date?.date?.end) {
                        date = `${date} → ${new Date(item.properties.Date.date.end).toLocaleString("fr-FR", { year: "numeric" })}`;
                    }


                    let src = null;
                    if (!!item?.cover) {
                        src = item?.cover?.type === "external" ? item.cover.external.url : item.cover.file.url;
                    }

                    return (
                        <Card
                            id={item.id}
                            key={id}
                            emoji={item?.icon?.emoji}
                            title={RenderPlainText(item.properties.Name.title)}
                            description={date}
                            subtitle={item.properties.Phase?.select?.name }
                            tags={item.properties.Aliment.multi_select.map(el => el.name)}
                            colorMap={item.properties.Aliment.multi_select.map(el => "var(--gray-200")}
                            link={{
                                path: `/${item.id}`,
                                text: "Lire l'article"
                            }}
                            image={src ? { src: src } : null}
                            className={classNames({ [`${styles.selected}`]: selection === item.id }) }

                        />
                    )
                })}
            </ul>
        )
}