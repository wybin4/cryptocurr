import { useEffect, useState } from 'react';
import { TableRow } from '../../atomic/TableRow/TableRow';
import { RateTableProps } from './RateTable.props';
import axios from 'axios';
import { RowModel } from '../../atomic/TableRow/TableRow.props';

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
			className={className}
			{...props}
		>
			<thead>
				<tr>
					<th>Номер</th>
					<th>Название</th>
					<th>Цена</th>
					<th>24ч %</th>
					<th>Рыночная капитализация</th>
					<th>Объём</th>
					<th>Циркулирующее предложение</th>
					<th>Последние 7 дней</th>
				</tr>
			</thead>
			<tbody>
				{data && data.map(d => <TableRow data={d} />)}
			</tbody>
		</table>
	);
};