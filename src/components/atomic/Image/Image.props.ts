import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type ImageType = 'table' | 'page';
export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
	type: ImageType;
}