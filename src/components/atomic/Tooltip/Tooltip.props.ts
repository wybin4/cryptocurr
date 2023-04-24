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
	volumeUsd24Hr: string;
}

export type TooltipModel = XOR<graphTooltip, percentTooltip>;

export interface TooltipProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tooltip: TooltipModel;
}