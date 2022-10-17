import Timeline from "@components/Timeline";
// import Map from "@components/Map";
import styles from "@styles/components/visualisation.module.css";
import * as Tabs from '@radix-ui/react-tabs';
import classNames from "classnames";

export default function Visualisation({articles, className}) {

    return(
            <Tabs.Root defaultValue="tracks" orientation="vertical" className={classNames(className)}>
                <Tabs.List aria-label="tabs" className={styles.tabsList}>
                    <Tabs.Trigger className={styles.tabsTrigger} value="tracks">Tracks</Tabs.Trigger>
                    <Tabs.Trigger className={styles.tabsTrigger} value="map">Cartographie</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tracks" className={styles.tabsContent}>
                    <Timeline
                        articles={articles}
                            className={styles.timeline}
                    />
                </Tabs.Content>

                <Tabs.Content value="map" className={styles.tabsContent}>
                    <div className={styles.map}>
                        <img src="/images/map.jpg"/>
                    </div>
                    {/* <Map
                        articles={articles}
                        className={styles.map}
                    /> */}
                </Tabs.Content>
            </Tabs.Root>
        )}