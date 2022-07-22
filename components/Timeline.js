import classNames from "classnames";
import { RenderPlainText } from "@components/RenderBlock";
import { Timeline } from 'react-svg-timeline'

const dateToMillis = (date) => {
    const d = new Date(date)
    return d.getTime()     
}

export default function TimelineAlt({ className, timeline }) {
    const lanes = [
        {
            laneId: "peach",
            label: '🍑 Pêches',
        },
        {
            laneId: "strawberry",
            label: '🍓 Fraises',
        },
    ]
    const dateFormat = (ms) => new Date(ms).toLocaleString("fr-FR", { month: "short", year: "numeric" });

    const events = [
        {
            eventId: 'event-1',
            tooltip: 'Event 1',
            laneId: "peach",
            startTimeMillis: 1167606000000,
            endTimeMillis: 1230698892000,
        },
        {
            eventId: 'event-2',
            tooltip: 'Event 2',
            laneId: "peach",
            startTimeMillis: 1399845600000,
        },
        {
            eventId: 'event-3',
            tooltip: 'Event 2',
            laneId: "peach",
            startTimeMillis: 1399845600000,
        },
    ]


    const timelineEvents = timeline.map((item, id) => {
        const start = dateToMillis(item.properties.Date.date.start);
        const end = dateToMillis(item.properties.Date.date.end);

        return (
            {
                eventId: id,
                tooltip: RenderPlainText(item.properties.Name.title),
                laneId: "peach",
                startTimeMillis: end,
                endTimeMillis: start
            }
 
        )
    })

    console.log(timelineEvents);
    console.log(events);


    return(
        <ul className={className}>
            <Timeline width={600} height={300} events={timelineEvents} lanes={lanes} dateFormat={dateFormat} />
        </ul>
        )


}