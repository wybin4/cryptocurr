import { InfoIconProps } from './InfoIcon.props';
// import cn from 'classnames';
// import styles from './InfoIcon.module.css';
import { ReactComponent as Info } from './info.svg';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '../Tooltip/Tooltip';
import { getPositionSvg } from '../../../helpers/tooltipPosition';

export const InfoIcon = ({ tooltipText, className, ...props }: InfoIconProps): JSX.Element => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		const position = getPositionSvg(e, -200, 30);
		setTooltipPosition({ x: position.x, y: position.y });
		setShowTooltip(true);
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};

	return (
		<span
			className={className}
			{...props}
		>
			<Info
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
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
		</span>
	);
};