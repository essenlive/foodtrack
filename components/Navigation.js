import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc"
import styles from "@styles/navigation.module.css";
import classNames from 'classnames';
import { useNavigation } from '@libs/states.js'



export default function Navigation({className}) {
    let { navigationState, toggleNavigation } = useNavigation((state) => state)

return(
    <header className={classNames(className, styles.header, { [`${styles.navigationActive}`]: navigationState })}>

        <div onClick={toggleNavigation} className={styles.collapse}>{navigationState ? <VscArrowLeft /> : <VscArrowRight /> }</div>
        <div className={styles.logo}>
            <Link href={`/`} >
                <h1 className={styles.title}>Foodtrack </h1>
            </Link>
            <h2 className={styles.subtitle}>Héritage et devenir du système alimentaire alternatif parisien </h2>

        </div>
        <div className={styles.filters}>
            Découvrir 
            <select defaultValue="les élements" className={ styles.select} id="title" name="title">
                <option value="personnes">les personnes</option>
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
                <Link href={`mailto:hello@fabcity.paris`} >
                    <span><FaEnvelope /></span>
                </Link>
            <Link href={`https://github.com/FabCityGrandParis`} >
                    <span><FaGithub /></span>
                </Link>
                <Link href={`https://www.linkedin.com/company/fab-city-grand-paris/`} >
                    <span><FaLinkedin /></span>
                </Link>
        </div>
    </header>
)}