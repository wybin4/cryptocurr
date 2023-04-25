import { RowModel } from '../../atomic/TableRow/TableRow.props';
import { SortEnum } from './RateTable.props';

export type SortActions = { type: SortEnum.Ascending; field: keyof RowModel } | { type: SortEnum.Descending; field: keyof RowModel };

export interface SetDataAction {
	type: 'SET_DATA';
	payload: RowModel[];
}

export const sortInitialState = {
	data: [] as RowModel[],
	sortField: '',
	sortDirection: SortEnum.Ascending,
};

export function sortReducer(state: typeof sortInitialState, action: SortActions | SetDataAction) {
	switch (action.type) {
		case SortEnum.Ascending:
			return {
				...state,
				data: state.data.sort((a, b) => {
					const aFieldValue = typeof a[action.field] === 'number' ? a[action.field] : String(a[action.field]);
					const bFieldValue = typeof b[action.field] === 'number' ? b[action.field] : String(b[action.field]);
					if (typeof aFieldValue === "number" && typeof bFieldValue === "number") {
						return aFieldValue - bFieldValue;
					} else {
						return aFieldValue && bFieldValue ? aFieldValue.localeCompare(bFieldValue) : 0;
					}
				}),
				sortField: action.field,
				sortDirection: SortEnum.Ascending,
			};
		case SortEnum.Descending:
			return {
				...state,
				data: state.data.sort((a, b) => {
					const aFieldValue = typeof a[action.field] === 'number' ? a[action.field] : String(a[action.field]);
					const bFieldValue = typeof b[action.field] === 'number' ? b[action.field] : String(b[action.field]);
					if (typeof aFieldValue === "number" && typeof bFieldValue === "number") {
						return bFieldValue - aFieldValue;
					} else {
						return aFieldValue && bFieldValue ? bFieldValue.localeCompare(aFieldValue) : 0;
					}
				}),
				sortField: action.field,
				sortDirection: SortEnum.Descending,
			};
		case 'SET_DATA':
			return {
				...state,
				data: action.payload,
			};
		default:
			return state;
	}
}