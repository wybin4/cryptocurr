import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type ButtonColorType = 'blue' | 'grey'

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	color: ButtonColorType;
}