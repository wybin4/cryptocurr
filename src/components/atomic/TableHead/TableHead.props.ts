import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { TypeAlign } from '../TableData/TableData.props';
import { RowModel } from '../TableRow/TableRow.props';
import { SortEnum } from '../../complex/RateTable/RateTable.props';


export interface TableHeadProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
	horizontalAlign: TypeAlign;
	tooltipText?: string;
	children: ReactNode;
	sortField?: keyof RowModel;
	sortDirection?: SortEnum;
}