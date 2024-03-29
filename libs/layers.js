export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'articles',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': "#e2e8f0",
        'circle-radius': 20,
    }
};

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'articles',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'articles',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#000000',
        'circle-radius': 2,
    }
};
// export const othersLayer = {
//     id: 'others-point',
//     type: 'circle',
//     source: 'articles',
//     filter: ["in", "autre", ["get", "typologies"]],
//     paint: {
//         'circle-color': '#d946ef',
//         'circle-radius': 4,
//         'circle-translate': [-5, -5]

//     }
// };