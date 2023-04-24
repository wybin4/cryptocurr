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