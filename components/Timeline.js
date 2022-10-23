import { useD3, timePlot } from '@libs/useD3';
import classNames from "classnames";
import React from 'react';
import styles from "@styles/components/timeline.module.css";
import { useSelection } from '@libs/states';
import { useRouter } from 'next/router'

export default function Timeline({ className, articles }) {
    const setSelection = useSelection((state) => state.setSelection)
    const router = useRouter()
    const goToArticle = (id) => { router.push(`/#${id}`) }


    function organizeArticle(articles) {
        articles = articles.map(article => {
            let start = new Date();
            let end = new Date();
            end = new Date(end.setFullYear(end.getFullYear() + 10));

            if (!!article.Date) {
                start = new Date(article.Date.start);
                end = new Date(article.Date.start);
                end = article.Date.end ? new Date(article.Date.end) : new Date(end.setFullYear(end.getFullYear() + 10));
            }

            let tracks = article.Aliment;
            let phase = article.Phase;
            let name = article.page_title;

            return (tracks.map(track => ({
                start,
                end,
                track,
                phase,
                name,
                ...article
            })))
        })
        return articles.flat()
    }


    const chartRef = useD3((ref) => { timePlot(organizeArticle(articles), ref, setSelection, goToArticle) }, [articles.length]);

        return (
            <div ref={chartRef} className={classNames(className, styles.timeline)}>
                <div className="tooltip"> </div>
                <svg >
                </svg>
            </div>
        );
    }
    