import Link from 'next/link'
import { FaKeybase, FaGithub, FaLinkedin, FaEnvelope, FaToolbox } from "react-icons/fa";
import styles from "@styles/navigation.module.css";

const { socials } = JSON.parse(process.env.NEXT_PUBLIC_SITE_INFOS);

export default function Navigation() {

return(
    <header className={styles.header}>

        <div className={styles.logo}>
            <Link href={`/`} >
                <h1 className={styles.title}>Foodtrack </h1>
            </Link>
            <h2 className={styles.subtitle}>Héritage et devenir du système alimentaire alternatif parisien </h2>
        </div>
        <div className={styles.socials}>
            <Link href={`/apropos`} >
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