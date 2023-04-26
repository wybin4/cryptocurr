import React from 'react';
import { ImageProps } from './Image.props';
import cn from 'classnames';
import styles from './Image.module.css';

export const Image = ({ type, src, alt, className, ...props }: ImageProps): JSX.Element => {
	return (
		<img loading='lazy' className={cn(className, {
			[styles.tableImg]: type === 'table',
			[styles.pageImg]: type === 'page'
		})} {...props} src={src} alt={alt} />
	);
};