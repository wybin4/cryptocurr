import React from 'react';
import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';


export const Tag = ({ fontSize = 'standard', padding = 'standard', cursor = 'auto', borderRadius = 'standard', textColor = 'black', backgroundColor = 'light-grey', className, children, ...props }: TagProps): JSX.Element => {
	return (
		<span
			style={{ cursor: cursor }}
			className={cn(className, styles.tag, {
				[styles.blackText]: textColor === 'black',
				[styles.whiteText]: textColor === 'white',
				[styles.DGText]: textColor === 'dark-grey',
				[styles.backGreen]: backgroundColor === 'green',
				[styles.backRed]: backgroundColor === 'red',
				[styles.backLG]: backgroundColor === 'light-grey',
				[styles.backDG]: backgroundColor === 'dark-grey',
				[styles.backBlue]: backgroundColor === 'blue',
				[styles.borderBig]: borderRadius === 'big',
				[styles.borderStandard]: borderRadius === 'standard',
				[styles.paddingBig]: padding === 'big',
				[styles.paddingStandard]: padding === 'standard',
				[styles.fontBig]: fontSize === 'big',
				[styles.fontgStandard]: fontSize === 'standard',
			})}
		>
			{children}
		</span>
	);
};