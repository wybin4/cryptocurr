import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface InfoIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	tooltipText: string;
}