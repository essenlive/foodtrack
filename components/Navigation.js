import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiArrowRight } from 'react-icons/fi'
import styles from "@styles/components/navigation.module.css";
import classNames from 'classnames';
import { useFilters } from '@libs/states.js'



export default function Navigation({ className }) {
    let { filters, activeFilters, setFilters } = useFilters((state) => state)

    return (
        <header className={classNames(className, styles.header)}>

            <div className={styles.logo}>
                <Link href={`/`} >
                    {/* <h1 className={styles.title}>Foodtrack </h1> */}
                    <img src='/images/logo.png'/>
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
                    {[...filters.Type].map((el => (<option key={el} value={el}>{el}</option>)))}
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
            <Link href={`/contribute`} >
                <div className={styles.contribute}>
                    Contribuer au contenu <FiArrowRight/>
                </div>
            </Link>
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
    )
}