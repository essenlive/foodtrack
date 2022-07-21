import Tags from '@components/Tags'
import Link from 'next/link'
import styles from "@styles/card.module.css";
import classNames from 'classnames';

const Card = ({ id, title, description, tags, colorMap, link, image }) => {
    return (
        <div key={id} className={styles.card}>
            {/* <Link href={{ pathname: link.path }}> */}
                <div className={styles.verso}>
                    {image && image.src &&
                        <img
                            className={styles.image}
                            src={image.src}
                            alt={title}
                        />
                    }
                    {title &&
                        <h3 className={styles.title}>{title}</h3>
                    }
                    {tags &&
                        <Tags tags={tags} colorMap={colorMap} className={styles.tags} />
                    }
                    {description &&
                        <p className={styles.description}>{description}</p>
                    }
                    {link &&
                        <Link href={{ pathname: link.path }}>
                            <p className={styles.link}>
                            <span className='link'>{link.text}</span>
                                </p>
                        </Link>
                    }
                </div>
            {/* </Link>  */}
        </div>
    );
}

export default Card