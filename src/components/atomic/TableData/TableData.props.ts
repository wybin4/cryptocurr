import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { SybmolPosition } from '../../../helpers/convert';
import { StripModel } from '../Strip/Strip.props';

export type ArrowType = 'top' | 'bottom';
export type FontTypes = 'little' | 'standard' | 'large';
export type TextPosition = 'right' | 'bottom';

export interface TableDataProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
	children: ReactNode;
	image?: string;
	greyText?: string | number;
	greyTextFontSize?: FontTypes;
	greyTextPosition?: TextPosition;
	symbol?: string;
	symbolPosition?: SybmolPosition;
	arrowType?: ArrowType;
	fixed?: number;
	commaSeparate?: boolean;
	strip?: StripModel;
}