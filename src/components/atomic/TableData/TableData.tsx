import { ReactNode } from 'react';
import styles from './TableData.module.css';
import { TableDataProps } from './TableData.props';
import cn from 'classnames';
import { SybmolPosition, convertAndFix } from '../../../helpers/convert';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { Strip } from '../Strip/Strip';

export const TableData = ({ strip, arrowType, commaSeparate = true, symbol, symbolPosition, fixed = 2, greyText, greyTextFontSize = 'standard', greyTextPosition = 'right', children, className, ...props }: TableDataProps): JSX.Element => {
	const checkChildren = (children: ReactNode, symbol?: string, symbolPosition?: SybmolPosition, fixed?: number, commaSeparate?: boolean) => {
		if (!children) {
			return children;
		}
		let val = children.toString();
		if (isNaN(parseFloat(val))) {
			return children;
		}
		if (commaSeparate) {
			val = parseFloat(val).toLocaleString('en', {
				minimumFractionDigits: fixed,
				maximumFractionDigits: fixed
			})
		}
		if (!symbol) {
			return val;
		}
		return convertAndFix(val, symbol, symbolPosition);
	};

	return (
		<td
			className={cn(className, styles.td)}
			{...props}
		>
			{greyText && <span className={cn(styles.greyText, {
				[styles.largeText]: greyTextFontSize === 'large',
				[styles.standardText]: greyTextFontSize === 'standard',
				[styles.littleText]: greyTextFontSize === 'little',
				[styles.rightText]: greyTextPosition === 'right',
				[styles.bottomText]: greyTextPosition === 'bottom',
			})}>{greyText}</span>}
			{arrowType && <ArrowIcon className={cn(styles.arrow, {
				[styles.arrowTop]: arrowType === 'top',
				[styles.arrowBottom]: arrowType === 'bottom'
			})} />}
			<span className={cn(styles.mainText, {
				[styles.mainTextGreen]: arrowType === 'top',
				[styles.mainTextRed]: arrowType === 'bottom'
			})}>
				{children && checkChildren(children, symbol, symbolPosition, fixed, commaSeparate)}
				{(strip && strip.max !== 0) &&
					<Strip
						className={styles.strip}
						strip={strip}
						onMouseEnter={() => console.log(strip.fill, strip.max)}
					/>}
			</span>
		</td >
	);
};