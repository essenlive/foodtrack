import Timeline from "@components/Timeline";
import Map from "@components/Map";
import styles from "@styles/visualisation.module.css";
import * as Tabs from '@radix-ui/react-tabs';

export default function Visualisation({articles, className}) {

    return(
            <Tabs.Root defaultValue="tracks" orientation="vertical" className={className}>
                <Tabs.List aria-label="tabs" className="tabs-list">
                    <Tabs.Trigger className="tabs-trigger" value="tracks">Tracks</Tabs.Trigger>
                    <Tabs.Trigger className="tabs-trigger" value="map">Cartographie</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tracks" className="tabs-content">
                    <Timeline
                        articles={articles}
                            className={styles.timeline}
                    />
                </Tabs.Content>

                <Tabs.Content value="map" className="tabs-content">
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