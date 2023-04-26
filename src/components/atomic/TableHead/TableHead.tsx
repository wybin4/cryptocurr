import { TableHeadProps } from './TableHead.props';
import cn from 'classnames';
import styles from './TableHead.module.css';
import { useState } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import { ReactComponent as InfoIcon } from './info.svg';
import { motion } from 'framer-motion';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { SortEnum } from '../../complex/RateTable/RateTable.props';


export const TableHead = ({ sortDirection, tooltipText = undefined, horizontalAlign = 'start', children, className, ...props }: TableHeadProps): JSX.Element => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		const element = e.target as HTMLElement;
		const rect = element.getBoundingClientRect();
		const position = { x: rect.left + window.scrollX - 200, y: rect.top + window.scrollY + 30 };
		setTooltipPosition({ x: position.x, y: position.y });
		setShowTooltip(true);
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};
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
			{tooltipText &&
				<InfoIcon
					onMouseEnter={(e) => handleMouseEnter(e)}
					onMouseLeave={handleMouseLeave}
					className={styles.infoTip}
				/>
			}
			{showTooltip && tooltipText && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<Tooltip x={tooltipPosition.x} y={tooltipPosition.y} tooltip={{ text: tooltipText }} />
				</motion.div>
			)}
			{sortDirection !== SortEnum.None && sortDirection !== undefined && (<ArrowIcon />)}
		</th>
	);
};