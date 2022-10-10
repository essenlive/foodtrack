import Tags from '@components/Tags'
import Link from 'next/link'
import styles from "@styles/card.module.css";
import classNames from 'classnames';

const Card = ({ id, title, description, subtitle, tags, colorMap, link, image, className, emoji }) => {
    if(!link) link ={ path:"#"}
    return (
        <Link key={id}  href={{ pathname: link.path }}>
            <div key={id} className={classNames(styles.card, className)}>
            
                    <span id={id} className={styles.anchor}></span>

                    <div className={styles.image}>
                        {image && image.src &&
                            <img
                                src={image.src}
                                alt={title}
                            />
                        }
                        {description &&
                            <p className={styles.description}>{description}</p>
                        }
                        
                        {emoji &&
                            <div className={styles.emoji}>{emoji}</div>
                        }
                        {subtitle &&
                            <h4 className={styles.subtitle}> {subtitle}</h4>
                        }
                    </div>
                    {title &&
                        <h3 className={styles.title}>{title}</h3>
                    }
                    {tags &&
                        <Tags tags={tags} colorMap={colorMap} className={styles.tags} dark={true} />
                    }



            </div>
        </Link>
    );
}

export default Card