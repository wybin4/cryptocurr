import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RowModel {
	changePercent24Hr: string;
	explorer: string;
	id: string;
	marketCapUsd: string;
	maxSupply?: string;
	name: string;
	priceUsd: string;
	rank: string;
	supply: string;
	symbol: string;
	volumeUsd24Hr: string;
	vwap24Hr: string;
}

export interface TableRowProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
	data: RowModel;
}