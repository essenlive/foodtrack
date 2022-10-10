import Tags from '@components/Tags'
import Link from 'next/link'
import styles from "@styles/card.module.css";
import classNames from 'classnames';

const Card = ({ id, title, description, subtitle, tags, colorMap, link, image, className }) => {

    return (
        <div id={id} key={id} className={classNames(styles.card, className)}>
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
                    {subtitle &&
                        <h4 className={styles.subtitle}> {subtitle}</h4>
                    }
                    {description &&
                        <p className={styles.description}>{description}</p>
                    }
                    {tags &&
                        <Tags tags={tags} colorMap={colorMap} className={styles.tags} dark={true} />
                    }
                        {link &&
                            <Link href={{ pathname: link.path }}>
                                <p className={styles.link}>
                                <span className='link'>{link.text}</span>
                                    </p>
                            </Link>
                        }

        </div>
    );
}

export default Card