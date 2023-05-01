import { useEffect, useReducer, useState } from 'react';
import { TableRow } from '../../atomic/TableRow/TableRow';
import { RateTableProps, SortEnum } from './RateTable.props';
import axios from 'axios';
import { TableHead } from '../../atomic/TableHead/TableHead';
import cn from 'classnames';
import styles from './RateTable.module.css';
import { sortInitialState, sortReducer } from './sort.reducer';
import { RowModel } from '../../atomic/TableRow/TableRow.props';
import { Button } from '../../atomic/Button/Button';

export const whatIsCap = `Общая рыночная стоимость циркулирующего предложения криптовалюты. Это аналог капитализации в свободном обращении на фондовом рынке. Рыночная капитализация = текущая цена х циркулирующее предложение.`;
export const whatIsVolume = `Количество проданной криптовалюты за последние 24 часа`;
export const whatIsSupply = `Количество монет, которое циркулирует на рынке и находится в публичном обращении. Это аналог текущих акций на фондовом рынке.`;
export const whatIsMaxSupply = `Это максимальное количество монет, которое когда-либо будет существовать у криптовалюты. Когда количество монет достигнет максимального предложения, то у криптовалюты больше не будет выпущено ни одной монеты, так как они уже достигнут максимального предложения, то есть в обороте будут все монеты.`;
export const whatIsFDMC = `Рыночная капитализация, если в обращении находилось максимальное предложение. FDMC = цена x максимальное предложение. Если максимальное предложение равно нулю, FDMC = цена x общее предложение.`;

export const RateTable = ({ className, ...props }: RateTableProps): JSX.Element => {
	//const [data, setData] = useState<RowModel[]>();
	const [state, dispatch] = useReducer(sortReducer, sortInitialState);
	const [sortField, setSortField] = useState<keyof RowModel | undefined>(undefined);

	const [offset, setOffset] = useState(0);
	const limit = 20;

	const handleLoadMore = () => {
		setOffset((prevOffset) => prevOffset + limit);
		getData(offset + limit, limit, state.data);
	};

	const getData = async (offset: number, limit: number, prevData: RowModel[]) => {
		let response = null;
		try {
			response = await axios.get(
				`https://api.coincap.io/v2/assets?offset=${offset}&limit=${limit}`
			);
		} catch (ex) {
			response = null;
			console.log(ex);
		}
		if (response) {
			const json = response.data;
			const newData = [...prevData, ...json.data];
			console.log(newData);
			dispatch({ type: "SET_DATA", payload: newData });
		}
	};

	useEffect(() => {
		getData(offset === 0 ? offset : offset + limit, limit, []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<>
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
			<Button className={styles.loadButton} onClick={handleLoadMore} color='blue'>Загрузить еще</Button>
		</>
	);
};