import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	children: ReactNode;
	backgroundColor: 'blue' | 'green' | 'light-grey' | 'dark-grey' | 'red';
	textColor: 'white' | 'black' | 'dark-grey';
	borderRadius: 'big' | 'standard';
	cursor?: 'pointer' | 'auto';
	padding?: 'big' | 'standard';
	fontSize?: 'big' | 'standard';
}