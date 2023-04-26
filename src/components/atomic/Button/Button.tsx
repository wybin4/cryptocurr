import React from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';


export const Button = ({ color = 'blue', className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(className, styles.button, {
				[styles.blue]: color === 'blue'
			})}
			{...props}
		>
			{children}
		</button>
	);
};