import { useD3, timePlot } from '@libs/useD3';
import classNames from "classnames";
import { organizeArticle } from "@libs/filtersHelper";
import React from 'react';
import styles from "@styles/timeline.module.css";

export default function Timeline({ className, articles }) {
    const chartRef = useD3( (ref) => { timePlot( organizeArticle(articles),  ref) }, [articles.length]);

        return (
            <div ref={chartRef} className={classNames(className, styles.timeline)}>
                <div className={styles.tooltip}> </div>
                <svg >
                </svg>
            </div>
        );
    }
    