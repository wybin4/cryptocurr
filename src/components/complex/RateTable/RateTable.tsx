import { useEffect, useReducer } from 'react';
import { TableRow } from '../../atomic/TableRow/TableRow';
import { RateTableProps, SortEnum } from './RateTable.props';
import axios from 'axios';
import { TableHead } from '../../atomic/TableHead/TableHead';
import cn from 'classnames';
import styles from './RateTable.module.css';
import { sortInitialState, sortReducer } from './sort.reducer';

export const RateTable = ({ className, ...props }: RateTableProps): JSX.Element => {
	const whatIsCap = `Общая рыночная стоимость циркулирующего предложения криптовалюты. Это аналог капитализации в свободном обращении на фондовом рынке. Рыночная капитализация = текущая цена х циркулирующее предложение.`;
	const whatIsVolume = `Количество проданной криптовалюты за последние 24 часа`;
	const whatIsSupply = `Количество монет, которое циркулирует на рынке и находится в публичном обращении. Это аналог текущих акций на фондовом рынке.`;
	//const [data, setData] = useState<RowModel[]>();
	const [state, dispatch] = useReducer(sortReducer, sortInitialState);

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

	return (
		<table
			className={cn(className, styles.table)}
			{...props}
		>
			<thead>
				<tr>
					<TableHead horizontalAlign={'start'}
						sortDirection={state.sortDirection}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'rank' })}
					>
						Номер
					</TableHead>
					<TableHead horizontalAlign={'start'}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'name' })}
					>
						Название
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'priceUsd' })}
					>
						Цена
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'changePercent24Hr' })}
					>
						24ч %
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						tooltipText={whatIsCap}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'marketCapUsd' })}
					>
						Рыночная капитализация
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						tooltipText={whatIsVolume}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'volumeUsd24Hr' })}
					>
						Объём
					</TableHead>
					<TableHead
						horizontalAlign={'end'}
						tooltipText={whatIsSupply}
						onClick={() => dispatch({ type: getOppositeSort(state.sortDirection), field: 'supply' })}
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