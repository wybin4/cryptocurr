import { TooltipModel, TooltipProps } from './Tooltip.props';
import cn from 'classnames';
import styles from './Tooltip.module.css';
import { Strip } from '../Strip/Strip';
import { ForwardedRef, ReactNode, createContext, forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getTimeString } from '../../../helpers/time';
import { Button } from '../Button/Button';

interface ITooltipContext {
	showTooltip: (tooltip: TooltipModel, position: { x: number; y: number }) => void;
	hideTooltip: () => void;
}

export const TooltipContext = createContext<ITooltipContext>({
	showTooltip: () => { },
	hideTooltip: () => { },
});
interface IProps {
	children: ReactNode;
}
// Создаем компонент провайдера контекста
export const TooltipProvider = ({ children }: IProps): JSX.Element => {
	const [tooltip, setTooltip] = useState<TooltipModel | null>(null);
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	// Определяем функции для показа/скрытия тултипа
	const showTooltip = (tooltip: TooltipModel, position: { x: number; y: number }) => {
		setTooltip(tooltip);
		setPosition(position);
	};
	const hideTooltip = () => {
		setTooltip(null);
	};

	// Возвращаем провайдер контекста
	return (
		<TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
			{tooltip && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					<Tooltip tooltip={tooltip} x={position.x} y={position.y} />
				</motion.div>
			)}
			{children}
		</TooltipContext.Provider>
	);
};

export const Tooltip = forwardRef(({ handleCloseClick, x, y, tooltip, className, ...props }: TooltipProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const handleClick = () => {
		if (handleCloseClick) {
			handleCloseClick();
		}
	};

	return (
		<div
			className={cn(className, {
				[styles.tooltip]: tooltip.text === undefined,
				[styles.infoTooltip]: tooltip.text !== undefined
			})}
			style={{ top: y, left: x }}
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
				<div className={cn(styles.toolBold, styles.dateText)}>{new Date(tooltip.date).toJSON().slice(0, 10).split('-').reverse().join('/')}</div>
				<div className={cn(styles.toolGrey, styles.timeText)}>{getTimeString(tooltip.time)}</div>
				<div className={cn(styles.toolGrey, styles.priceText)}>Цена</div>
				<div className={cn(styles.toolBold, styles.price)}>${parseFloat(tooltip.priceUsd).toLocaleString('en', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}</div>
				<div className={cn(styles.toolGrey, styles.volText)}>Циркулирующее предложение</div>
				<div className={cn(styles.toolBold, styles.vol)}>{parseFloat(tooltip.circulatingSupply).toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})}</div>
			</>}
			{tooltip.text && <>
				<div className={styles.infoText}>{tooltip.text}</div>
			</>}
			{window.innerWidth <= 500 && <Button color='grey' className={styles.closeButton} onClick={handleClick}>Закрыть</Button>}
		</div>
	);
});