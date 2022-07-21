import Link from 'next/link'
import { FaKeybase, FaGithub, FaLinkedin, FaEnvelope, FaToolbox } from "react-icons/fa";
import styles from "@styles/navigation.module.css";
import classNames from 'classnames';

const { socials } = JSON.parse(process.env.NEXT_PUBLIC_SITE_INFOS);

export default function Navigation({className}) {

return(
    <header className={classNames(className, styles.header)}>

        <div className={styles.logo}>
            <Link href={`/`} >
                <h1 className={styles.title}>Foodtrack </h1>
            </Link>
            <h2 className={styles.subtitle}>Héritage et devenir du système alimentaire alternatif parisien </h2>
        </div>
        <div className={styles.filters}>
            Découvrir 
            <select className={ styles.select} id="title" name="title">
                <option value="personnes" selected>les personnes</option>
                <option value="evenements">les évenements</option>
                <option value="methodes">les méthodes</option>
                </select>
            qui ont marqués 
            <select className={styles.select} id="title" name="title">
                <option value="personnes" selected>le développement</option>
                <option value="evenements">la renaissance</option>
                <option value="methodes">l'apogée</option>
            </select>
            de 
            <select className={styles.select} id="title" name="title">
                <option value="personnes" selected>la pêche</option>
                <option value="evenements">la pomme</option>
                <option value="methodes">la fraise</option>
            </select> en Île-de-France.
        </div>
        <div className={styles.socials}>
            <Link href={`/about`} >
                <a className="link">À propos</a>
            </Link>
            {socials.mail &&
                <Link href={`mailto:${socials.mail}`} >
                    <span><FaEnvelope /></span>
                </Link>}
            {socials.github &&
                <Link href={`${socials.github}`} >
                    <span>    <FaGithub /></span>
                </Link>}
            {socials.linkedin &&
                <Link href={`${socials.linkedin}`} >
                    <span><FaLinkedin /></span>
                </Link>}
            {socials.keybase &&
                <Link href={`${socials.keybase}`} >
                    <span>    <FaKeybase /></span>
                </Link>}
            {socials.wikifactory &&
                <Link href={`${socials.wikifactory}`} >
                    <span><FaToolbox /></span>
                </Link>}
        </div>
    </header>
)}