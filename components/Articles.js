import styles from "@styles/articles.module.css";
import classNames from "classnames";
import { RenderPlainText } from "@components/RenderBlock";
import Card from "@components/Card";

export default function Articles({className, articles}) {

    return(
        <ul className={classNames(className, styles.articles)}>

                {articles.map((item, id) => {
                    let date = null
                    if (!!item.properties?.Date?.date?.start) {
                        date = new Date(item.properties.Date.date.start).toLocaleString("fr-FR", { year: "numeric" });
                    }


                    let src = null;
                    if (!!item?.cover) {
                        src = item?.cover?.type === "external" ? item.cover.external.url : item.cover.file.url;
                    }
                    return (
                        <Card
                            id={id}
                            key={id}
                            title={`${ item?.icon && item?.icon?.emoji} ${RenderPlainText(item.properties.Name.title)}`}
                            description={date}
                            subtitle={item.properties.Phase?.select?.name }
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
        )
}