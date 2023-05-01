import { TableHeadProps } from './TableHead.props';
import cn from 'classnames';
import styles from './TableHead.module.css';
import { SortEnum } from '../../complex/RateTable/RateTable.props';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { InfoIcon } from '../InfoIcon/InfoIcon';


export const TableHead = ({ sortField, sortDirection = SortEnum.None, tooltipText = undefined, horizontalAlign = 'start', children, className, ...props }: TableHeadProps): JSX.Element => {


	return (
		<th
			className={cn(className, styles.th, {
				[styles.thStart]: horizontalAlign === 'start',
				[styles.thEnd]: horizontalAlign === 'end',
			})}
			role="columnheader"
			{...props}
		>
			{horizontalAlign === 'end' && (<>
				{sortField && sortDirection !== SortEnum.Ascending && (<ArrowIcon className={cn(styles.arrowUp, styles.arrowEnd)} />)}
				{sortField && sortDirection !== SortEnum.Descending && (<ArrowIcon className={cn(styles.arrowDown, styles.arrowEnd)} />)}
			</>)}
			{children}
			{tooltipText &&
				<InfoIcon
					tooltipText={tooltipText}
					className={styles.infoTip}
				/>
			}
			{horizontalAlign === 'start' && (<>
				{sortField && sortDirection !== SortEnum.Ascending && (<ArrowIcon className={cn(styles.arrowUp, styles.arrowStart)} />)}
				{sortField && sortDirection !== SortEnum.Descending && (<ArrowIcon className={cn(styles.arrowDown, styles.arrowStart)} />)}
			</>)}
		</th>
	);
};