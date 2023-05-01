export const getPositionDiv = (e: React.MouseEvent<HTMLDivElement>, offsetX: number, offsetY: number) => {
	const element = e.target as HTMLElement;
	const rect = element.getBoundingClientRect();
	return { x: rect.left + window.scrollX + offsetX, y: rect.top + window.scrollY + offsetY };
};

export const getPositionSvg = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, offsetX: number, offsetY: number) => {
	const element = e.target as HTMLElement;
	const rect = element.getBoundingClientRect();
	return { x: rect.left + window.scrollX + offsetX, y: rect.top + window.scrollY + offsetY };
};
