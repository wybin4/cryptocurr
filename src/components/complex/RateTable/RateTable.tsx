import { useEffect, useReducer, useState } from 'react';
import { TableRow } from '../../atomic/TableRow/TableRow';
import { RateTableProps, SortEnum } from './RateTable.props';
import axios from 'axios';
import { TableHead } from '../../atomic/TableHead/TableHead';
import cn from 'classnames';
import styles from './RateTable.module.css';
import { sortInitialState, sortReducer } from './sort.reducer';
import { RowModel } from '../../atomic/TableRow/TableRow.props';

export const RateTable = ({ className, ...props }: RateTableProps): JSX.Element => {
	const whatIsCap = `Общая рыночная стоимость циркулирующего предложения криптовалюты. Это аналог капитализации в свободном обращении на фондовом рынке. Рыночная капитализация = текущая цена х циркулирующее предложение.`;
	const whatIsVolume = `Количество проданной криптовалюты за последние 24 часа`;
	const whatIsSupply = `Количество монет, которое циркулирует на рынке и находится в публичном обращении. Это аналог текущих акций на фондовом рынке.`;
	//const [data, setData] = useState<RowModel[]>();
	const [state, dispatch] = useReducer(sortReducer, sortInitialState);
	const [sortField, setSortField] = useState<keyof RowModel | undefined>(undefined);

	const getData = async () => {
		let response = null;
		new Promise(async (resolve, reject) => {
			try {
				response = await axios.get('https://api.coincap.io/v2/assets');
			} catch (ex) {
				response = null;
				console.log(ex);
				reject(ex);
			}
			if (response) {
				const json = response.data;
				console.log(json.data)
				dispatch({ type: 'SET_DATA', payload: json.data });
				resolve(json);
			}
		});
	};

	useEffect(() => {
		getData();
	}, []);

	function getOppositeSort(sort: SortEnum): SortEnum {
		return sort === SortEnum.Ascending ? SortEnum.Descending : SortEnum.Ascending;
	}
	const handleSortChange = (fieldName: keyof RowModel) => {
		if (fieldName === sortField) {
			dispatch({ type: getOppositeSort(state.sortDirection), field: fieldName });
		} else {
			setSortField(fieldName);
			dispatch({ type: SortEnum.Ascending, field: fieldName });
		}
	};
	return (
		<table
			className={cn(className, styles.table)}
			{...props}
		>
			<thead>
				<tr>
					<TableHead horizontalAlign={'start'}
						sortField={sortField === 'rank' ? 'rank' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('rank')}
					>
						Номер
					</TableHead>
					<TableHead horizontalAlign={'start'}
						sortField={sortField === 'name' ? 'name' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('name')}
					>
						Название
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						sortField={sortField === 'priceUsd' ? 'priceUsd' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('priceUsd')}
					>
						Цена
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						sortField={sortField === 'changePercent24Hr' ? 'changePercent24Hr' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('changePercent24Hr')}
					>
						24ч %
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						tooltipText={whatIsCap}
						sortField={sortField === 'marketCapUsd' ? 'marketCapUsd' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('marketCapUsd')}
					>
						Рыночная капитализация
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						tooltipText={whatIsVolume}
						sortField={sortField === 'volumeUsd24Hr' ? 'volumeUsd24Hr' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('volumeUsd24Hr')}
					>
						Объём
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						tooltipText={whatIsSupply}
						sortField={sortField === 'supply' ? 'supply' : undefined}
						sortDirection={state.sortDirection}
						onClick={() => handleSortChange('supply')}
					>
						Циркулирующее предложение
					</TableHead>
					<th>Последние 7 дней</th>
				</tr>
			</thead>
			<tbody>
				{state.data && state.data.map(d => <TableRow data={d} />)}
			</tbody>
		</table >
	);
};