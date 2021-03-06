import styles from "@styles/layout.module.css";
import Head from "next/head";
import Navigation from "@components/Navigation";
import Resources from "@components/Resources";
import classNames from "classnames";



export default function Layout({ page, children, nav, timeline }) {

    return (
        <main className={styles.container}>
            <Head>
            <meta name='application-name' content='foodtrack' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-status-bar-style' content='default' />
            <meta name='apple-mobile-web-app-title' content='Foodtrack' />
            <meta name='description' content="Foodtrack | Héritage et devenir du système alimentaire alternatif parisien" />
            <meta name='format-detection' content='telephone=no' />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='msapplication-config' content='/icons/browserconfig.xml' />
            <meta name='msapplication-TileColor' content='#355c7d' />
            <meta name='msapplication-tap-highlight' content='no' />
            <meta name='theme-color' content='#355c7d' />

            {/* 
            <link rel='apple-touch-icon' href='/icons/apple-icon.png' />
            <link rel='apple-touch-icon' sizes='152x152' href='/icons/apple-icon-152x152.png' />
            <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-icon-180x180.png' /> 
            */}

            <link rel='manifest' href='/manifest.json' />
            <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#355c7d' />
            {/* <link rel='shortcut icon' href='/favicon.ico' /> */}

            <meta name='twitter:card' content="Foodtrack | Héritage et devenir du système alimentaire alternatif parisien" />
            <meta name='twitter:url' content='https://foodtrack.paris' />
            <meta name='twitter:title' content='Foodtrack' />
            <meta name='twitter:description' content="Foodtrack | Héritage et devenir du système alimentaire alternatif parisien" />
            {/* <meta name='twitter:image' content='https://essenlive.xyz/icons/android-icon-192x192.png' /> */}
            <meta name='twitter:creator' content='@fabcitygrandparis' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content='https://foodtrack.paris' />
            <meta property='og:description' content="Foodtrack | Héritage et devenir du système alimentaire alternatif parisien" />
            <meta property='og:site_name' content='Foodtrack' />
            <meta property='og:url' content='https://foodtrack.paris' />
            {/* <meta property='og:image' content='https://essenlive.xyz/icons/apple-icon.png' /> */}


            {page?.page_title && <title>Foodtrack | {page.page_title[0].plain_text}</title>}
            {page?.icon.emoji ?
                <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon.emoji}</text></svg>`}></link>
                :
                <>
                    <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
                </>
            }
            </Head>
            <Navigation 
                className={classNames(styles.navigation, { [`${styles.navigationActive}`]: nav.menuActive })}
            />
            <Resources
                className={styles.timeline}
                timeline={timeline}
                />
                
            <article className={classNames(styles.article, { [`${styles.articleActive}`]: nav.articleActive })}>
                {children}
            </article>
        </main>
    );
}
