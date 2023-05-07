import { InfoIconProps } from './InfoIcon.props';
// import cn from 'classnames';
import styles from './InfoIcon.module.css';
import { ReactComponent as Info } from './info.svg';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '../Tooltip/Tooltip';
import { getPositionSvg } from '../../../helpers/tooltipPosition';
import { createPortal } from 'react-dom';

export function TooltipPortal({ children }: { children: React.ReactNode }) {
	const tooltipPortalDiv = document.getElementById('tooltipPortal');
	if (!tooltipPortalDiv) {
		return null;
	}
	return createPortal(children, tooltipPortalDiv);
}

export const InfoIcon = ({ handleTooltip, tooltipText, className, ...props }: InfoIconProps): JSX.Element => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		const position = getPositionSvg(e, -200, 30);
		setTooltipPosition({ x: position.x, y: position.y });
		setShowTooltip(true);
		if (handleTooltip) {
			handleTooltip(true);
			if (window.innerWidth <= 500) {
				document.body.style.overflow = 'hidden';
				const underTooltip = document.getElementById('underTooltip');
				if (underTooltip !== null) {
					underTooltip.style.pointerEvents = 'none';
				}
			}
		}
	};

	const handleMouseLeave = () => {
		if (window.innerWidth > 500) {
			setShowTooltip(false);
		}
	};
	const handleChildClick = () => {
		if (handleTooltip) {
			handleTooltip(false);
			document.body.style.overflow = 'auto';
			const underTooltip = document.getElementById('underTooltip');
			if (underTooltip !== null) {
				underTooltip.style.pointerEvents = 'auto';
			}
		}
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
				<TooltipPortal>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Tooltip x={tooltipPosition.x} y={tooltipPosition.y} tooltip={{ text: tooltipText }} className={styles.infoIconTip} handleCloseClick={handleChildClick} />
					</motion.div>
				</TooltipPortal>
			)}
		</span>
	);
};