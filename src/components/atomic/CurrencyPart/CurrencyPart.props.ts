import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StripModel } from '../Strip/Strip.props';
import { TypeAlign } from '../TableData/TableData.props';

export interface additionalInformationCurrencyPart {
	addName: string;
	addValue: string;
	addSymbol?: string;
	addTooltipText?: string;
};

export interface CurrencyPartProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	propName: string;
	propValue: string;
	propSymbol?: string;
	horizontalAlign?: TypeAlign;
	propPercent?: string;
	propStrip?: StripModel;
	handleTooltip?: (state: boolean) => void;
	tooltipText?: string;
	additionalInfo?: additionalInformationCurrencyPart[];
}