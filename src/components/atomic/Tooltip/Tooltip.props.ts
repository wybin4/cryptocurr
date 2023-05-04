import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StripModel } from '../Strip/Strip.props';
import { XOR } from '../../../helpers/xor';

export interface percentTooltip {
	strip: StripModel;
	symbol: string;
};

export interface graphTooltip {
	date: string;
	time: string;
	priceUsd: string;
	circulatingSupply: string;
}

export interface infoTooltip {
	text: string;
}

export type TooltipModel = XOR<infoTooltip, XOR<graphTooltip, percentTooltip>>;

export interface TooltipProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tooltip: TooltipModel;
	x: number;
	y: number;
}