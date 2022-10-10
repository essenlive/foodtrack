import { useD3, timePlot } from '@libs/useD3';
import classNames from "classnames";
import { organizeArticle } from "@libs/filtersHelper";
import React from 'react';
import styles from "@styles/timeline.module.css";
import { useSelection } from '@libs/states';
import { useRouter } from 'next/router'

export default function Timeline({ className, articles }) {
    const setSelection = useSelection((state) => state.setSelection)
    const router = useRouter()
    const goToArticle = (id) => { router.push(`/#${id}`) }

    const chartRef = useD3((ref) => { timePlot(organizeArticle(articles), ref, setSelection, goToArticle) }, [articles.length]);

        return (
            <div ref={chartRef} className={classNames(className, styles.timeline)}>
                <div className={styles.tooltip}> </div>
                <svg >
                </svg>
            </div>
        );
    }
    