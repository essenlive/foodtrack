import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
    
    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => { };
    }, dependencies);
    return ref;
}

export function timePlot(data, svg, {
    x = ([x]) => x, // given d in data, returns the (quantitative) value x
    y = ([, y]) => y, // given d in data, returns the (categorical) value y
    y2 = ([, y]) => y, // given d in data, returns the (categorical) value y
    z = () => z, // given d in data, returns the (categorical) value z
    r = 8, // (fixed) radius of dots, in pixels
    yFormat, // a format specifier for the x-axis
    marginTop = 50, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 10, // bottom margin, in pixels
    marginLeft = 30, // left margin, in pixels
    width, // outer width, in pixels
    height = 700, // outer height, in pixels, defaults to heuristic
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
    strokeWidth, // stroke width of rule connecting dots
    strokeLinecap, // stroke line cap of rule connecting dots
    strokeOpacity, // stroke opacity of rule connecting dots
    duration: initialDuration = 250, // duration of transition, if any
    delay: initialDelay = (_, i) => i * 10, // delay of transition, if any
} = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Y2 = d3.map(data, y2);
    const Z = d3.map(data, z);
    // Compute default domains, and unique them as needed.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = d3.extent(Y);
    if (zDomain === undefined) zDomain = Z;
    xDomain = new d3.InternSet(xDomain);
    zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in the y- and z-domains.
    const I = d3.range(Y.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));
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

    svg.selectAll('*').remove()
    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", height - marginTop - marginBottom)
            .attr("stroke-opacity", 0.1))

    const g = svg.append("g")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll()
        .data(d3.group(I, i => X[i]))
        .join("g")
        .attr("transform", ([x]) => `translate(${xScale(x)},0)`);

    g.selectAll("line")
        .data(([, I]) => I)
        .join("line")
        .attr("stroke", stroke)
        .attr("stroke-width", 3)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-opacity", 0.8)
        .attr("stroke", i => color(Z[i]))
        .attr("y1", i => yScale(Y[i]))
        .attr("y2", i => yScale(Y2[i]));

    g.append("line")
        .attr("stroke", "currentColor")
        .attr("stroke-width", 2)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-opacity", 0.1)
        .attr("y1", ([, I]) => yScale(d3.min(I, i => Y[i])))
        .attr("y2", ([, I]) => yScale(d3.max(I, i => Y[i])));


    g.selectAll("circle")
        .data(([el, I]) => I)
        .join("circle")
        .attr("cy", i => yScale(Y[i]))
        .attr("fill", i => color(Z[i]))
        .attr("r", r);

    g.append("text")
        .attr("dy", "-1em")
        .attr("y", ([, I]) => yScale(d3.min(I, i => Y[i])) - 6)
        // .attr("transform", ([, I]) => "rotate(-90)")
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