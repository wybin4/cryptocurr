import React from 'react';
import { TableRowProps } from './TableRow.props';
import styles from './TableRow.module.css';
import { TableData } from '../TableData/TableData';
import cn from 'classnames';
// import { Strip } from '../Strip/Strip';
// import { Tooltip } from '../Tooltip/Tooltip';

export const TableRow = ({ data, className, ...props }: TableRowProps): JSX.Element => {
	return (
		<tr
			key={data.id}
			className={cn(className, styles.tr)}
			{...props}
		>
			{/* <td>{data.rank}</td>
			<td>{<img src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`} alt={data.id} />}{data.name}</td>
			<td>{convertAndFix(data.priceUsd, '$', 'before')}</td>
			<td>{convertAndFix(data.changePercent24Hr)}</td>*/}
			<TableData fixed={0} horizontalAlign='start'>{data.rank}</TableData>
			<TableData
				fixed={0}
				mainTextWeight='semi'
				greyText={' ' + data.symbol}
				image={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`}
				imageAlt={data.id}
				horizontalAlign='start'
			>
				{data.name}
			</TableData>
			<TableData symbol='$' symbolPosition='before' horizontalAlign='end'>{data.priceUsd}</TableData>
			<TableData symbol='%' symbolPosition='after' horizontalAlign='end' arrowType={parseFloat(data.changePercent24Hr) < 0 ? 'bottom' : 'top'}>{data.changePercent24Hr}</TableData>
			<TableData symbol='$' symbolPosition='before' horizontalAlign='end' fixed={0}>{data.marketCapUsd}</TableData>
			<TableData
				symbol='$'
				symbolPosition='before'
				fixed={0}
				greyText={parseFloat(data.volumeUsd24Hr) / parseFloat(data.priceUsd)}
				greyTextSymbol={' ' + data.symbol}
				greyTextPosition='bottom'
				greyTextFontSize='little'
				horizontalAlign='end'
			>
				{data.volumeUsd24Hr}
			</TableData>
			<TableData
				symbol={' ' + data.symbol}
				symbolPosition='after'
				fixed={0}
				strip={{ max: data.maxSupply ? parseFloat(data.maxSupply) : 0, fill: parseFloat(data.supply) }}
				horizontalAlign='end'
			>
				{data.supply}
			</TableData>
			{/* <td>{data.maxSupply && <Strip strip={{ max: parseFloat(data.maxSupply), fill: parseFloat(data.supply) }} />}</td> */}
			{/* <td>{data.maxSupply && <Tooltip tooltip={{ strip: { max: parseFloat(data.maxSupply), fill: parseFloat(data.supply) }, symbol: data.symbol }} />}</td> */}
			{/* <td>{data.priceUsd && <Tooltip tooltip={{ priceUsd: data.priceUsd, volumeUsd24Hr: data.volumeUsd24Hr, date: '04/03/2023', time: '3:15:00 AM' }} />}</td> */}
			{/* <td>{convertAndFix(data.volumeUsd24Hr, '$', 'before')}</td>
			<td>{convertAndFix(data.supply, ' ' + data.symbol, 'after')}</td> */}
		</tr>
	);
};