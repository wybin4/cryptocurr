import { DetailedHTMLProps, TableHTMLAttributes } from 'react';

export enum SortEnum {
	Ascending = 'ASCENDING',
	Descending = 'DESCENDING',
}

export interface RateTableProps extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> { }