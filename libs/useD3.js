import React from 'react';
import * as d3 from 'd3';


export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
    React.useEffect(() => {
        renderChartFn(ref);
        return () => { };
    }, dependencies);

    return ref;
}

export function timePlot(data, ref, setSelection, goToArticle, {
    x = d => d.track,  // given d in data, returns the (quantitative) value x
    y = d => d.start, // given d in data, returns the (categorical) value y
    y2 = d => d.end, // given d in data, returns the (categorical) value y2
    z = d => d.phase,// given d in data, returns the (categorical) value z
    description = d => ({
        name : d.name,
        id: d.id,
        phase : d.phase,
        track : d.track
    }),
    r = 10, // (fixed) radius of dots, in pixels
    yFormat, // a format specifier for the x-axis
    marginTop = 150, // top margin, in pixels
    marginRight = 0, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 30, // left margin, in pixels
    width = ref.current.offsetWidth - 4 * 20, // outer width, in pixels
    height = ref.current.offsetHeight * 2 - 4 * 20, // outer height, in pixels, defaults to heuristic
    xDomain, // [xmin, xmax]
    xRange, // [left, right]
    xLabel, // a label for the x-axis
    xPadding = 1, // separation for first and last dots from axis
    yType = d3.scaleUtc, // type of x-scale
    yDomain, // an array of (ordinal) y-values
    yRange, // [top, bottom]
    yPadding = 1, // separation for first and last dots from axis
    zDomain, // array of z-values
    colors, // color scheme
    stroke = "currentColor", // stroke of rule connecting dots
    strokeWidth = 10, // stroke width of rule connecting dots
    strokeLinecap = "round", // stroke line cap of rule connecting dots
    strokeOpacity, // stroke opacity of rule connecting dots
    duration: initialDuration = 250, // duration of transition, if any
    delay: initialDelay = (_, i) => i * 10, // delay of transition, if any
} = {}) {
    const chart = d3.select(ref.current)
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Y2 = d3.map(data, y2);
    const Z = d3.map(data, z);
    const DESC = d3.map(data, description);
    // Compute default domains, and unique them as needed.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = d3.extent(Y);
    if (zDomain === undefined) zDomain = Z;
    xDomain = new d3.InternSet(xDomain);
    zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in the y- and z-domains.
    const IndexItems = d3.range(Y.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));
    // Compute the default width.
    if (width === undefined) width = Math.ceil((xDomain.size + xPadding) * 40) + marginLeft + marginRight;
    if (xRange === undefined) xRange = [marginLeft, width - marginRight];

    // Compute the default height.
    if (yRange === undefined) yRange = [marginTop, height - marginBottom];

    // Chose a default color scheme based on cardinality.
    if (colors === undefined) colors = d3.schemeSpectral[zDomain.size];
    if (colors === undefined) colors = d3.quantize(d3.interpolateSpectral, zDomain.size);

    // Construct scales and axes.
    const xScale = d3.scalePoint(xDomain, xRange).round(true).padding(xPadding);
    const yScale = yType(yDomain, yRange);

    const color = d3.scaleOrdinal(zDomain, colors);
    const yAxis = d3.axisLeft(yScale).ticks(height / 80, yFormat);

    var Tooltip = chart.select("div")
        .style("opacity", 0)
        .style("position", "absolute")


    const svg = chart.select("svg");
    svg.selectAll('*').remove()
    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        // .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", height - marginTop - marginBottom)
            .attr("stroke-opacity", 0.1))

    // Create tracks
    const tracks = svg.append("g")
        .attr("class", "tracks")
        .attr("text-anchor", "left")
        .attr("font-family", "var(--font-body)")
        .attr("font-size", "1rem")
        .selectAll()
        .data(d3.group(IndexItems, i => X[i])) // defini les datas pour toutes les tracks comme une Map : track => IndexItems
        .join("g")
        .attr("transform", ([x]) => (`translate(${xScale(x)},0)`))
        .attr("class", "track");

    
    // Create g groups to place events inside
    const eventsTracks = tracks.append("g").attr("class", "eventsTracks");

    const click = function (d) {
        let id = DESC[this.__data__].id;
        setSelection(id)
        goToArticle(id)
    }
    const show = function (d) {
        Tooltip.style("opacity", 1)
        d3.select(this)
            .attr("stroke-opacity", 1)
    }
    const hide = function (d) {
        Tooltip.style("opacity", 0)
        d3.select(this)
            .attr("stroke-opacity", 0.5)
    }
    const displayTooltip = function(d){
        const event = DESC[this.__data__];
        Tooltip
            .html(`<h3>${event.name}</h3>
            <p>${event.phase}</p>`)
            .style("left", (d3.pointer(d)[0] + 70) + "px")
            .style("top", (d3.pointer(d)[1] - 150) + "px")
    }
        
    // Create events lines
    eventsTracks.selectAll("line")
        .data(([, IndexItems]) => IndexItems) // Recupere les IndexItems pour chaque track
        .join("line")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 2)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-opacity", 0.5)
        .attr("stroke", i => color(Z[i]))
        .attr("y1", i => yScale(Y[i]))
        .attr("y2", i => yScale(Y2[i]))
        .attr("cursor", "pointer")
        .on("click", click)
        .on("mousemove", displayTooltip)
        .on("mouseover", show)
        .on("mouseleave", hide)


    tracks.append("text")
        .attr("dy", "0.25em")
        .attr("dx", r + 4)
        .attr("y", ([, IndexItems]) => yScale(d3.min(IndexItems, i => Y[i])))
        .attr("transform", ([, IndexItems]) => `rotate(-90 ,0, ${yScale(d3.min(IndexItems, i => Y[i]))})`)
        .text(([y]) => y);

    return Object.assign(svg.node(), { color });
}


export function Streamgraph(data,svg,  {
    x = ([x]) => x, // given d in data, returns the (ordinal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 20, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    zDomain, // array of z-values
    offset = d3.stackOffsetWiggle, // stack offset method
    order = d3.stackOrderInsideOut, // stack order method
    xFormat, // a format specifier string for the x-axis
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    colors = d3.schemeTableau10,
} = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);

    // Compute default x- and z-domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (zDomain === undefined) zDomain = Z;
    zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

    // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
    // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
    // each tuple has an i (index) property so that we can refer back to the
    // original data point (data[i]). This code assumes that there is only one
    // data point for a given unique x- and z-value.
    const series = d3.stack()
        .keys(zDomain)
        .value(([x, I], z) => Y[I.get(z)])
        .order(order)
        .offset(offset)
        (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
        .map(s => s.map(d => Object.assign(d, { i: d.data[1].get(s.key) })));

    // Compute the default y-domain. Note: diverging stacks can be negative.
    if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const color = d3.scaleOrdinal(zDomain, colors);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat).tickSizeOuter(0);

    const area = d3.area()
        .x(({ i }) => xScale(X[i]))
        .y0(([y1]) => yScale(y1))
        .y1(([, y2]) => yScale(y2));

    
    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .selectAll("path")
        .data(series)
        .join("path")
        .attr("fill", ([{ i }]) => color(Z[i]))
        .attr("d", area)
        .append("title")
        .text(([{ i }]) => Z[i]);

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call(g => g.select(".domain").remove());

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .text(yLabel));

    const line = svg.append("line").attr("y1", marginTop - 10).attr("y2", height - marginBottom).attr("stroke", "rgba(0,0,0,0.2)").style("pointer-events", "none");

    svg.on("mousemove", function (d) {
        let x = d.layerX;
        let y = d.layerY;
        line.attr("transform", `translate(${x} 0)`);
        y += 20;
        if (x > width / 2) x -= 100;

    })
    return Object.assign(svg.node(), { scales: { color } });
}