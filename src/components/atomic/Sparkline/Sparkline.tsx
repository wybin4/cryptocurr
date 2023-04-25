import { SparklineDataModel, SparklineProps } from './Sparkline.props';
import cn from 'classnames';
import styles from './Sparkline.module.css';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const Sparkline = ({ data, height, width, color, className, ...props }: SparklineProps): JSX.Element => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!svgRef.current) return;

		const margin = { top: 5, right: 5, bottom: 5, left: 5 };
		const svg = d3.select(svgRef.current);

		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => new Date(d.time)) as [Date, Date])
			.range([margin.left, width - margin.right]);

		const y = d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => +d.priceUsd) as [number, number])
			.range([height - margin.bottom, margin.top]);

		const line = d3
			.line<SparklineDataModel>()
			.x((d) => x(new Date(d.time)))
			.y((d) => y(+d.priceUsd));

		svg.selectAll('path')
			.data([data])
			.join('path')
			.attr('fill', 'none')
			.attr('stroke', color === 'red' ? 'var(--red)' : 'var(--green)')
			.attr('stroke-width', 2)
			.attr('d', line);
	}, [data, height, width, color]);

	return (
		<svg ref={svgRef} width={width} height={height}>
			<g></g>
		</svg>
	);
};