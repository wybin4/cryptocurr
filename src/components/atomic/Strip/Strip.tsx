import React from 'react';
import { StripProps } from './Strip.props';
import cn from 'classnames';
import styles from './Strip.module.css';

export const Strip = ({ width = '200px', strip, className, ...props }: StripProps): JSX.Element => {
	return (
		<div
			className={cn(className, styles.strip)}
			style={{ width: width }}
			{...props}
		>
			<span className={styles.fill} style={{ width: strip.fill / strip.max * 100 + '%' }}></span>
		</div>
	);
};