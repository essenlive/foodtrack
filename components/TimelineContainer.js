import { useD3, timePlot } from '@libs/useD3';
import classNames from "classnames";
import { organizeArticle } from "@libs/filtersHelper";
import React from 'react';
export default function TimelineContainer({ className, articles }) {
    
    const chartRef = useD3(
        
        (svg) => {
            const organizedArticle = organizeArticle(articles)
            
            
            timePlot(organizedArticle, svg, {
                x: d => d.track,
                y: d => d.start,
                y2: d => d.end,
                z: d => d.phase,
            })
        },
        [articles.length]

        );
        return (
            <div className={classNames(className)}>
                <svg ref={chartRef} >
                    <g class="y-axis"></g>
                </svg>
            </div>
        );
    }
    