import { useEffect, useState } from 'react';
import { TableRow } from '../../atomic/TableRow/TableRow';
import { RateTableProps } from './RateTable.props';
import axios from 'axios';
import { RowModel } from '../../atomic/TableRow/TableRow.props';
import { TableHead } from '../../atomic/TableHead/TableHead';
import cn from 'classnames';
import styles from './RateTable.module.css';

export const RateTable = ({ className, ...props }: RateTableProps): JSX.Element => {

	/*useEffect(() => {
		const fetchData = () => {
			axios.get('API LINK')
				.then(res => {
					setResults(res.data.result)
				});
		};

		fetchData(); // <-- invoke on mount too!
		const timerId = setInterval(fetchData, 5000);

		return () => clearInterval(timerId); // <-- return cleanup function
	}, []);
*/
	const whatIsCap = `Общая рыночная стоимость циркулирующего предложения криптовалюты. Это аналог капитализации в свободном обращении на фондовом рынке. Рыночная капитализация = текущая цена х циркулирующее предложение.`;
	const whatIsVolume = `Количество проданной криптовалюты за последние 24 часа`;
	const whatIsSupply = `Количество монет, которое циркулирует на рынке и находится в публичном обращении. Это аналог текущих акций на фондовом рынке.`;
	const [data, setData] = useState<RowModel[]>();


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
				setData(json.data);
				resolve(json);
			}
		});
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<table
			className={cn(className, styles.table)}
			{...props}
		>
			<thead>
				<tr>
					<TableHead horizontalAlign={'start'}>Номер</TableHead>
					<TableHead horizontalAlign={'start'}>Название</TableHead>
					<TableHead horizontalAlign={'end'}>Цена</TableHead>
					<TableHead horizontalAlign={'end'}>24ч %</TableHead>
					<TableHead horizontalAlign={'end'} tooltipText={whatIsCap}>Рыночная капитализация</TableHead>
					<TableHead horizontalAlign={'end'} tooltipText={whatIsVolume}>Объём</TableHead>
					<TableHead horizontalAlign={'end'} tooltipText={whatIsSupply}>Циркулирующее предложение</TableHead>
					<th>Последние 7 дней</th>
				</tr>
			</thead>
			<tbody>
				{data && data.map(d => <TableRow data={d} />)}
			</tbody>
		</table>
	);
};