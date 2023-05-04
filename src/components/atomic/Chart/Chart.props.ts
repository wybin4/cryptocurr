import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type IntervalType = 'y1' | 'm1' | 'm3' | 'w1' | 'd1';

export interface ChartModel {
	priceUsd: number;
	date: string;
	time: Date;
	circulatingSupply: number;
}

export interface ChartProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	name: string;
	svgRef: React.RefObject<SVGSVGElement>;
	data: ChartModel[];
}