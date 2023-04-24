import { TooltipProps } from './Tooltip.props';
import cn from 'classnames';
import styles from './Tooltip.module.css';
import { Strip } from '../Strip/Strip';

export const Tooltip = ({ tooltip, className, ...props }: TooltipProps): JSX.Element => {
	return (
		<div
			className={cn(className, styles.tooltip)}
			{...props}
		>
			{tooltip.strip && <>
				<div className={cn(styles.toolBold, styles.percentText)}>Процент</div>
				<div className={styles.percent}>{(tooltip.strip.fill / tooltip.strip.max * 100).toFixed(2)}%</div>
				<Strip className={styles.strip} strip={{ max: tooltip.strip.max, fill: tooltip.strip.fill }} width='300px' />
				<div className={styles.supplyText}>Циркулирующее предложение</div>
				<div className={cn(styles.toolGrey, styles.supply)}>{tooltip.strip.fill.toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})} {tooltip.symbol}</div>
				<div className={styles.maxSupplyText}>Максимальное предложение</div>
				<div className={cn(styles.toolGrey, styles.maxSupply)}>{tooltip.strip.max.toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})} {tooltip.symbol}</div>
			</>}
			{tooltip.priceUsd && <>
				<div className={cn(styles.toolBold, styles.dateText)}>{tooltip.date}</div>
				<div className={cn(styles.toolGrey, styles.timeText)}>{tooltip.time}</div>
				<div className={cn(styles.toolGrey, styles.priceText)}>Цена</div>
				<div className={cn(styles.toolBold, styles.price)}>${parseFloat(tooltip.priceUsd).toLocaleString('en', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}</div>
				<div className={cn(styles.toolGrey, styles.volText)}>Объем 24ч</div>
				<div className={cn(styles.toolBold, styles.vol)}>${parseFloat(tooltip.volumeUsd24Hr).toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})}</div>
			</>}
		</div>
	);
};