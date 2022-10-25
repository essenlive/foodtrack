import Timeline from "@components/Timeline";
import styles from "@styles/components/visualisation.module.css";
import * as Tabs from '@radix-ui/react-tabs';
import classNames from "classnames";
// import dynamic from "next/dynamic";
// import { useMemo } from "react";


export default function Visualisation({articles, className}) {

    // const Map = useMemo( ()=> dynamic(() => import('@components/Map'), { ssr: false } ),[articles])

    return(
        
            <Tabs.Root defaultValue="tracks" orientation="vertical" className={classNames(className)}>
                <Tabs.List aria-label="tabs" className={styles.tabsList}>
                    <Tabs.Trigger className={styles.tabsTrigger} value="tracks">Tracks</Tabs.Trigger>
                    {/* <Tabs.Trigger className={styles.tabsTrigger} value="map">Cartographie</Tabs.Trigger> */}
                </Tabs.List>
                <Tabs.Content value="tracks" className={styles.tabsContent}>
                    <Timeline
                        articles={articles}
                        className={styles.timeline}
                    />
                </Tabs.Content>

                {/* <Tabs.Content value="map" className={styles.tabsContent}>
                    <Map />
                </Tabs.Content> */}
            </Tabs.Root>
        )}