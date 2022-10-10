import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc"
import styles from "@styles/navigation.module.css";
import classNames from 'classnames';
import { useNavigation, useFilters } from '@libs/states.js'



export default function Navigation({className}) {
    let { navigationMenuState, toggleNavigationMenu } = useNavigation((state) => state)
    let { filters, activeFilters, setFilters } = useFilters((state) => state)

    return(
        <header className={classNames(className, styles.header, { [`${styles.navigationActive}`]: navigationMenuState })}>
        
            <div onClick={() => { toggleNavigationMenu() }} className={styles.collapse}>{navigationMenuState ? <VscArrowLeft /> : <VscArrowRight /> }</div>
        <div className={styles.logo}>
        <Link href={`/`} >
        <h1 className={styles.title}>Foodtrack </h1>
        </Link>
        <h2 className={styles.subtitle}>Héritage et devenir du système alimentaire alternatif parisien </h2>
        
        </div>
        <div className={styles.filters}>
            <span>Découvrir </span>
            <select 
                className={styles.select} 
                id="Type" 
                name="Type"
                value={activeFilters.Type} 
                onChange={(e) => setFilters({ Type: e.target.value === "all" ? "all" : e.target.value })}>

                <option value="all">les élements</option>
                {[...filters.Type].map((el=>( <option key={el} value={el}>{el}</option> )))}
            </select>
            
            <span> qui ont marqué </span>

            <select
                className={styles.select}
                id="Phase"
                name="Phase"
                value={activeFilters.Phase}
                onChange={(e) => setFilters({ Phase: e.target.value === "all" ? "all" : e.target.value })}>
                <option value="all">le développement</option>
                {[...filters.Phase].map((el => (<option key={el} value={el}>{el}</option>)))}
            </select> 
    
            <select
                className={styles.select}   
                id="Aliment"
                name="Aliment"                
                value={activeFilters.Aliment}
                onChange={(e) => setFilters({ Aliment: e.target.value === "all" ? "all" : e.target.value })}>
                <option value="all">des aliments</option>
                {[...filters.Aliment].map((el => (<option key={el} value={el}>{el}</option>)))}
            </select> en Île-de-France.
        </div>

        <div className={styles.socials}>
            <Link href={`/about`} >
                <a className="link">À propos</a>
            </Link>
            <Link href={`/contribute`} >
                <a className="link">Contribuer</a>
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