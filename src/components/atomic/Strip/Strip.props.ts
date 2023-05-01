import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface StripModel {
	fill: number;
	max: number;
}

export interface StripProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	cursor?: 'pointer' | 'auto';
	width?: string;
	strip: StripModel;
}