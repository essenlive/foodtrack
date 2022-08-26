import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc"
import styles from "@styles/navigation.module.css";
import classNames from 'classnames';
import { useNavigation, useFilters } from '@libs/states.js'



export default function Navigation({className}) {
    let { navigationState, toggleNavigation } = useNavigation((state) => state)
    let { filters, setFilters } = useFilters((state) => state)
    
    console.log(filters);
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
        <select className={styles.select} id="Type" name="Type" onChange={(e) => setFilters({ Type: e.target.value === "null" ? null : e.target.value })}>
        <option value="null">les élements</option>
        <option value="Portrait">les personnes</option>
        <option value="Évenement">les évenements</option>
        <option value="Outil/Pratique">les méthodes</option>
        </select>
        qui ont marqués 
        <select className={styles.select} id="Phase" name="Phase" onChange={(e) => setFilters({ Phase: e.target.value === "null" ? null : e.target.value })}>
        <option value="null">les différentes phases</option>
        <option value="Origine">l'origine</option>
        <option value="Climax" selected>le climax</option>
        <option value="Rupture">la rupture</option>
        <option value="Redécouverte">la redécouverte</option>
        </select>
        <select className={styles.select} id="Aliment" name="Aliment" onChange={(e) => setFilters({ Aliment: e.target.value === "null" ? null : e.target.value })}>
        <option value="null">de l'alimentation</option>
        <option value="Fraise" selected>de la fraise</option>
        <option value="Légumes">des légumes</option>
        <option value="Champignon">des champignons</option>
        <option value="Pêche">des pêches</option>
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