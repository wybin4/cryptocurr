import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SparklineDataModel {
	priceUsd: number;
	time: string;
}
export type TypeColor = 'red' | 'green';

export interface SparklineProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: SparklineDataModel[];
	width: number;
	height: number;
	color: TypeColor;
}