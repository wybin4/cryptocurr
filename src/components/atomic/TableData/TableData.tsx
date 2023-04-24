import { ReactNode, useContext } from 'react';
import styles from './TableData.module.css';
import { TableDataProps } from './TableData.props';
import cn from 'classnames';
import { SybmolPosition, convertAndFix } from '../../../helpers/convert';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { Strip } from '../Strip/Strip';
import { Image } from '../Image/Image';
import { TooltipContext } from '../Tooltip/Tooltip';
import { TooltipModel } from '../Tooltip/Tooltip.props';
import { StripModel } from '../Strip/Strip.props';

export const TableData = ({ horizontalAlign, image, imageAlt, mainTextWeight = 'medium', strip, arrowType, commaSeparate = true, symbol, symbolPosition, fixed = 2, greyText, greyTextFontSize = 'standard', greyTextPosition = 'right', greyTextSymbol = '', children, className, ...props }: TableDataProps): JSX.Element => {
	const { showTooltip, hideTooltip } = useContext(TooltipContext);

	const handleTableDataMouseEnter = (e: React.MouseEvent<HTMLDivElement>, strip: StripModel, symbol: string) => {
		const tooltip: TooltipModel = { strip: strip, symbol: symbol };
		const element = e.target as HTMLElement;
		const rect = element.getBoundingClientRect();
		const position = { x: rect.left + window.scrollX - 100, y: rect.top + window.scrollY + 30 };
		showTooltip(tooltip, position);
	};

	const onMouseLeave = () => {
		hideTooltip();
	};

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
	const getGreyText = (greyTextFontSize: string, greyText: string | number, greyTextPosition: string) => {
		return (
			<>
				<span className={cn(styles.greyText, {
					[styles.largeText]: greyTextFontSize === 'large',
					[styles.standardText]: greyTextFontSize === 'standard',
					[styles.littleText]: greyTextFontSize === 'little',
					[styles.rightText]: greyTextPosition === 'right',
					[styles.bottomText]: greyTextPosition === 'bottom',
				})}>{greyText.toLocaleString('en', {
					minimumFractionDigits: fixed,
					maximumFractionDigits: fixed
				})}{greyTextSymbol}</span>
			</>
		);
	}
	return (
		<td
			className={cn(className, styles.td, {
				[styles.alignStart]: horizontalAlign === 'start',
				[styles.alignEnd]: horizontalAlign === 'end',
				[styles.twoLines]: greyTextPosition === 'bottom'
			})}
			{...props}
		>
			{image && <Image type='table' src={image} alt={imageAlt ? imageAlt : 'crypto-img'} />}
			{arrowType && <ArrowIcon className={cn(styles.arrow, {
				[styles.arrowTop]: arrowType === 'top',
				[styles.arrowBottom]: arrowType === 'bottom'
			})} />}
			<span className={cn(styles.mainText, {
				[styles.mainTextGreen]: arrowType === 'top',
				[styles.mainTextRed]: arrowType === 'bottom'
			})}>
				<span className={cn({
					[styles.semi]: mainTextWeight === 'semi',
					[styles.medium]: mainTextWeight === 'medium'
				})}>{children && checkChildren(children, symbol, symbolPosition, fixed, commaSeparate)}</span>
				{(strip && strip.max !== 0) &&
					<Strip
						className={styles.strip}
						strip={strip}
						onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => handleTableDataMouseEnter(e, strip, symbol ? symbol : '')}
						onMouseLeave={onMouseLeave}
					/>}
			</span>
			{/* {greyTextPosition === 'bottom' && greyText && <div className={styles.greyTextBottom}>{getGreyText(greyTextFontSize, greyText, greyTextPosition)}</div>}
			{greyTextPosition === 'right' && greyText && <span>{getGreyText(greyTextFontSize, greyText, greyTextPosition)}</span>} */}
			<span className={cn({
				[styles.bottomGreyText]: greyTextPosition === 'bottom'
			})}>
				{greyText && getGreyText(greyTextFontSize, greyText, greyTextPosition)}
			</span>
		</td >
	);
};