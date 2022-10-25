import styles from "@styles/components/blocks.module.css";
import Link from "next/link";

export const RenderPlainText = (text) => {
    if (!text) return null;
    return (text.map(el => el.plain_text).join(""))
}


export const RenderText = ({ text }) => {

    if (!text) {
        return null;
    }
    return text.map((value, id) => {
        const {
            annotations: { bold, code, color, italic, strikethrough, underline },
            text,
        } = value;
        return (
            <span key={id}
                className={[
                    bold ? styles.bold : "",
                    code ? styles.code : "",
                    italic ? styles.italic : "",
                    strikethrough ? styles.strikethrough : "",
                    underline ? styles.underline : "",
                ].join(" ")}
                style={color !== "default" ? { color } : {}}
            >
                {text.link ? <a className="link" href={text.link.url}>{text.content}</a> : text.content}
            </span>
        );
    });
};


export const RenderBlock = ({block}) => {
    const { type, id } = block;
    const value = block[type];
    switch (type) {
        case "paragraph":
            return (
                <p>
                    <RenderText text={value.rich_text} />
                </p>
            );
        case "heading_1":
            return (
                <h1>
                    <RenderText text={value.rich_text} />
                </h1>
            );
        case "heading_2":
            return (
                <h2>
                    <RenderText text={value.rich_text} />
                </h2>
            );
        case "heading_3":
            return (
                <h3>
                    <RenderText text={value.rich_text} />
                </h3>
            );
        case "quote":
            return (
                <blockquote>
                    <RenderText text={value.rich_text} />
                </blockquote>
            );
        case "bulleted_list_item":
        case "numbered_list_item":
            return (
                <li>
                    <RenderText text={value.rich_text} />
                </li>
            );
        case "to_do":
            return (
                <div>
                    <label htmlFor={id}>
                        <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
                        <RenderText text={value.rich_text} />
                    </label>
                </div>
            );
        case "toggle":
            return (
                <details>
                    <summary>
                        <RenderText text={value.rich_text} />
                    </summary>
                    {value.children?.map((block) => (
                        <RenderBlock key={block.id} block={block}/>
                    ))}
                </details>
            );
        case "child_page":
            return(
                <Link href={`/${value.id}`}>
                    <span className="link">
                        {value.title}
                    </span>
                </Link>);
        case "image":
            const src = value.type === "external" ? value.external.url : value.file.url;
            return (
                <img className={styles.image} src={src} />
            );
        case "divider":
            return (
                <hr/>
            );
        case "child_database":
            const items = value.blocks;
            if(!items) return("")
            return (""
            // <ul className={styles.items}>
            //         {items.map((item) => {

            //         let date = null
            //         if (!!item.properties?.Date?.date?.start) date = new Date(item.properties.Date.date.start).toLocaleString("fr-FR", { month: "short", year: "numeric" });

            //         let src = null;
            //         if ( !!item?.cover ) src = item?.cover?.type === "external" ? item.cover.external.url : item.cover.file.url;
                    
            //         return (
            //             <Card
            //                 id = {item.id}
            //                 title={RenderPlainText(item.properties.Name.title)}
            //                 description={date}
            //                 tags={item.properties.Aliment.multi_select.map(el => el.name)}
            //                 colorMap={item.properties.Aliment.multi_select.map(el => el.color)}
            //                 link={{
            //                     path: `/${value.title}/${item.id}`,
            //                     text: "Lire l'article"
            //                 }} 
            //                 image={src ? { src: src } : null}

            //             />
            //         )
            //     })}
            // </ul>
            );
        default:
            console.log(`❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type
                })`);
            return ``;
    }
}
