import { ChartModel, ChartProps } from './Chart.props';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './Chart.module.css';
import { Tooltip } from '../Tooltip/Tooltip';

export const Chart = ({ data, name, ...props }: ChartProps): JSX.Element => {

	const svgRef = useRef(null);
	const tooltipRef = useRef(null);
	const [tooltipData, setTooltipData] = useState<ChartModel>();
	const [tooltipXY, setTooltipXY] = useState<{ x: number; y: number }>();

	useEffect(() => {

		let xAccessor = (d: ChartModel) => d.time;
		let yAccessor = (d: ChartModel) => d.priceUsd;

		let dimensions = {
			width: 1000,
			height: 500,
			margins: 50,
			containerWidth: 0,
			containerHeight: 0
		};

		dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
		dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

		const svg = d3
			.select(svgRef.current)
			.classed("line-chart-svg", true)
			.attr("width", dimensions.width)
			.attr("height", dimensions.height);

		const everything = svg.selectAll("*");
		everything.remove();

		const container = svg
			.append("g")
			.classed("container", true)
			.attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

		const tooltip = d3.select(tooltipRef.current);
		const tooltipDot = container
			.append("circle")
			.classed("tool-tip-dot", true)
			.attr("r", 5)
			.attr("fill", "#fc8781")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.style("opacity", 0)
			.style("pointer-events", "none");

		const yScale = d3.scaleLinear()
			.domain([d3.min(data, d => +d.priceUsd)!, d3.max(data, d => +d.priceUsd)!])
			.range([dimensions.containerHeight, 0])
			.nice();
		const xScale = d3.scaleTime()
			.domain(d3.extent(data.filter(d => d.time !== undefined), d => d.time) as [Date, Date])
			.range([0, dimensions.containerWidth]);

		const lineGenerator = d3.line<ChartModel>()
			.x(d => xScale(new Date(d.time)))
			.y(d => yScale(+d.priceUsd));

		container
			.append("path")
			.datum(data)
			.attr("d", lineGenerator)
			.attr("fill", "none")
			.attr("stroke", "#30475e")
			.attr("stroke-width", 2);

		const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

		container.append("g").classed("yAxis", true).call(yAxis);

		const xAxis = d3.axisBottom(xScale);

		container
			.append("g")
			.classed("xAxis", true)
			.style("transform", `translateY(${dimensions.containerHeight}px)`)
			.call(xAxis);

		container
			.append("rect")
			.classed("mouse-tracker", true)
			.attr("width", dimensions.containerWidth)
			.attr("height", dimensions.containerHeight)
			.style("opacity", 0)
			.on("touchmouse mousemove", function (event) {
				const mousePos = d3.pointer(event, this);

				const date = xScale.invert(mousePos[0]);

				const dateBisector = d3.bisector(xAccessor).center;

				const bisectionIndex = dateBisector(data, date);
				const hoveredIndexData = data[Math.max(0, bisectionIndex)];

				tooltipDot
					.style("opacity", 1)
					.attr("cx", xScale(xAccessor(hoveredIndexData)))
					.attr("cy", yScale(yAccessor(hoveredIndexData)))
					.raise();

				setTooltipData(hoveredIndexData);
				setTooltipXY({ x: xScale(hoveredIndexData.time), y: yScale(hoveredIndexData.priceUsd - 1500) });
			})
			.on("mouseleave", function () {
				tooltipDot.style("opacity", 0);
				tooltip.style("display", "none");
			});
	}, [data]);

	return (
		<div>
			<svg ref={svgRef} />
			{tooltipData && tooltipXY && (
				<Tooltip
					ref={tooltipRef}
					tooltip={{
						priceUsd: String(tooltipData.priceUsd),
						time: String(tooltipData.time),
						circulatingSupply: String(tooltipData.circulatingSupply),
						date: String(tooltipData.date)
					}}
					x={tooltipXY.x}
					y={tooltipXY.y} />
			)}
		</div>
	);
};