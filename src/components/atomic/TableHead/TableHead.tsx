import { TableHeadProps } from './TableHead.props';
import cn from 'classnames';
import styles from './TableHead.module.css';

export const TableHead = ({ horizontalAlign = 'start', children, className, ...props }: TableHeadProps): JSX.Element => {
	return (
		<th
			className={cn(className, styles.th, {
				[styles.thStart]: horizontalAlign === 'start',
				[styles.thEnd]: horizontalAlign === 'end',
			})}
			role="columnheader"
			{...props}
		>
			{children}
		</th>
	);
};