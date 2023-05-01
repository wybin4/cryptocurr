export type SybmolPosition = 'before' | 'after';

export const convertAndFix = (val: string, symb?: string, pos?: SybmolPosition): string => {
	if (symb && pos) {
		switch (pos) {
			case 'after':
				return val + symb;
			case 'before':
				return symb + val;
		}
	}
	return val;
}

export const getFixedSymbols = (num: string, symb: number) => {
	return parseFloat(num).toLocaleString('en', {
		minimumFractionDigits: symb,
		maximumFractionDigits: symb
	});
}

export function min4Digits(num: number): string {
	const maxDigits = 4;
	const numDigits = Math.ceil(Math.log10(Math.abs(num)));
	const maxDigitsAfterDecimal = Math.max(0, maxDigits - numDigits);
	return num.toFixed(maxDigitsAfterDecimal);
}

export function getCommas(num: string): string {
	return parseFloat(num) > 1 ? parseFloat(num).toLocaleString('en') : num;
}