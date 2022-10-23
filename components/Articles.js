import styles from "@styles/components/articles.module.css";
import classNames from "classnames";
import Card from "@components/Card";
import { useSelection } from "@libs/states";

export default function Articles({className, articles}) {
    let selection = useSelection((state) => state.selection)

    return(
        <ul className={classNames(className, styles.articles)}>

                {articles.map((item, id) => {

                    return (
                        <Card
                            id={item.id}
                            key={id}
                            emoji={item?.icon}
                            title={item?.page_title}
                            description={item?.Date?.formatted}
                            subtitle={item?.Phase }
                            tags={item?.Aliment}
                            colorMap={item?.Aliment?.map(el => "var(--gray-200")}
                            link={{
                                path: `/${item.id}`,
                                text: "Lire l'article"
                            }}
                            image={item?.cover}
                            className={classNames({ [`${styles.selected}`]: selection === item.id }) }

                        />
                    )
                })}
            </ul>
        )
}