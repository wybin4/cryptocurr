import cn from 'classnames';
import styles from './CurrencyDetails.module.css';
import { CurrencyDetailsProps, CurrencyModel } from './CurrencyDetails.props';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from '../../atomic/Image/Image';
import { Tag } from '../../atomic/Tag/Tag';
import { ReactComponent as LinkIcon } from './svg/link.svg';
import { ReactComponent as UserIcon } from './svg/user.svg';
import { ReactComponent as ArrowLeftIcon } from './svg/arrowLeft.svg';
import { ReactComponent as ArrowIcon } from './svg/arrow.svg';
import { CurrencyPart } from '../../atomic/CurrencyPart/CurrencyPart';
import { whatIsCap, whatIsMaxSupply, whatIsSupply, whatIsVolume } from '../RateTable/RateTable';
import { min4Digits } from '../../../helpers/convert';
import { Strip } from '../../atomic/Strip/Strip';
import { Button } from '../../atomic/Button/Button';
import { Chart } from '../../atomic/Chart/Chart';
import { ChartModel, FrequencyType, IntervalType } from '../../atomic/Chart/Chart.props';

export const CurrencyDetails = ({ className, ...props }: CurrencyDetailsProps): JSX.Element => {
	const { name } = useParams<{ name: string }>();
	const [data, setData] = useState<CurrencyModel>();
	const [chartData, setChartData] = useState<ChartModel[]>();
	const [interval, setInterval] = useState<IntervalType>('d1');
	const [showTooltip, setShowTooltip] = useState(false);

	const [BTCData, setBTCData] = useState<CurrencyModel>();
	const [ETHData, setETHData] = useState<CurrencyModel>();
	const [minMax, setMinMax] = useState<{ minPrice: number, maxPrice: number }>();
	const [stats, setStats] = useState<boolean>(false);

	const handleDataFromTooltip = (state: boolean) => {
		setShowTooltip(state);
	};

	const getMinMax = async () => {
		const now = Date.now();
		const startOfDay = new Date(now).setHours(0, 0, 0, 0);
		const endOfDay = new Date(now).setHours(23, 59, 59, 999);
		const response = await axios.get(`https://api.coincap.io/v2/assets/${name}/history?interval=m1&start=${startOfDay}&end=${endOfDay}`);
		const data: CurrencyModel[] = response.data.data;
		const minPrice = Math.min(...data.map((item) => Number(item.priceUsd)));
		const maxPrice = Math.max(...data.map((item) => Number(item.priceUsd)));
		setMinMax({ minPrice: minPrice, maxPrice: maxPrice });
	};


	const getBTC = async () => {
		let response = null;
		try {
			response = await axios.get(
				`https://api.coincap.io/v2/assets/bitcoin`
			);
		} catch (ex) {
			response = null;
			console.log(ex);
		}
		if (response) {
			const json = response.data;
			console.log(json.data);
			setBTCData(json.data);
		}
	};

	const getETH = async () => {
		let response = null;
		try {
			response = await axios.get(
				`https://api.coincap.io/v2/assets/ethereum`
			);
		} catch (ex) {
			response = null;
			console.log(ex);
		}
		if (response) {
			const json = response.data;
			console.log(json.data);
			setETHData(json.data);
		}
	};

	const getData = async () => {
		let response = null;
		try {
			response = await axios.get(
				`https://api.coincap.io/v2/assets/${name}`
			);
		} catch (ex) {
			response = null;
			console.log(ex);
		}
		if (response) {
			const json = response.data;
			console.log(json.data);
			setData(json.data);
		}
	};

	useEffect(() => {
		getData();
		if (name !== 'bitcoin') {
			getBTC();
		} if (name !== 'ethereum') {
			getETH();
		}
		getMinMax();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchChartData();
	}, [interval])

	const INTERVAL_IN_MS: Record<IntervalType, number> = {
		d1: 24 * 60 * 60 * 1000,
		w1: 7 * 24 * 60 * 60 * 1000,
		m1: 30 * 24 * 60 * 60 * 1000,
		m3: 3 * 30 * 24 * 60 * 60 * 1000,
		y1: 365 * 24 * 60 * 60 * 1000,
	};

	const INTERVAL_NAMES: { key: IntervalType; value: string }[] = [
		{ key: 'd1', value: '1Д' },
		{ key: 'w1', value: '1Н' },
		{ key: 'm1', value: '1М' },
		{ key: 'm3', value: '3М' },
		{ key: 'y1', value: '1Г' },
	];

	const INTERVAL_FREQUENCY: Record<IntervalType, FrequencyType> = {
		d1: 'm5',
		w1: 'm30',
		m1: 'h1',
		m3: 'h1',
		y1: 'h6',
	};

	const fetchChartData = async () => {
		const now = Date.now();
		const start = now - INTERVAL_IN_MS[interval];
		const freq = INTERVAL_FREQUENCY[interval];
		const response = await axios.get(`https://api.coincap.io/v2/assets/${name}/history?interval=${freq}&start=${start}&end=${now}`);
		setChartData(response.data.data.map((point: ChartModel) => ({
			priceUsd: point.priceUsd,
			time: new Date(point.time),
			circulatingSupply: point.circulatingSupply,
			date: point.date
		})));
	};
	return (
		<>
			<div id='tooltipPortal'></div>
			{data &&
				<div
					id='underTooltip'
					className={cn(className, styles.currencyDetails, {
						[styles.bluredScreen]: showTooltip && window.innerWidth <= 500
					})}
					{...props}
				>
					<div className={styles.leftNav}>
						<a className={styles.backLink} href='/' rel="noreferrer">Криптовалюты</a>
						<ArrowLeftIcon className={styles.arrowBack} />
						<div>{data.name}</div>
					</div>
					<div className={styles.leftPart}>
						<div className={styles.leftHeader}>
							<Image
								className={styles.image}
								type='page'
								src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`}
								alt={data.id}
							/>
							<div className={styles.currName}>{data.name}</div>
							<Tag backgroundColor='light-grey' textColor='dark-grey' borderRadius='standard' className={styles.symbol}>{data.symbol}</Tag>
						</div>
						<div className={styles.leftSecondLine}>
							<Tag backgroundColor='dark-grey' textColor='white' borderRadius='standard' className={styles.rank}>Место #{data.rank}</Tag>
							<Tag backgroundColor='light-grey' textColor='dark-grey' borderRadius='standard' className={styles.coin}>Coin</Tag>
						</div>
						<div className={styles.links}>
							<Tag padding='big' backgroundColor='light-grey' textColor='black' borderRadius='big' cursor='pointer' className={styles.link}>
								<LinkIcon /> <a href={data.explorer} target='_blank' rel="noreferrer">{data.explorer}</a>
							</Tag>
							<Tag padding='big' backgroundColor='light-grey' textColor='black' borderRadius='big' cursor='pointer' className={styles.link}>
								<UserIcon /> <a href={`https://www.reddit.com/r/${data.id}/`} target='_blank' rel="noreferrer">Сообщество</a>
							</Tag>
						</div>
					</div>
					<div className={styles.rightHeader}>
						<div className={styles.rightName}>Цена {data.name} ({data.symbol})</div>
						<div className={styles.priceRow}>
							<div className={styles.rightPrice}>${parseFloat(data.priceUsd).toLocaleString('en', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}</div>
							<Tag
								className={styles.percentTag}
								backgroundColor={parseFloat(data.changePercent24Hr) > 0 ? 'green' : 'red'}
								padding='big'
								fontSize='big'
								textColor='white'
								borderRadius='big'
							>
								<ArrowIcon className={cn(styles.arrowPercent, {
									[styles.arrowUp]: parseFloat(data.changePercent24Hr) > 0,
									[styles.arrowDown]: parseFloat(data.changePercent24Hr) <= 0
								})} />
								{parseFloat(data.changePercent24Hr).toFixed(2)}%
							</Tag>
						</div>
						{BTCData && <div className={styles.rightCompare}>{min4Digits(parseFloat(data.priceUsd) / parseFloat(BTCData.priceUsd))} BTC</div>}
						{ETHData && <div className={styles.rightCompare}>{min4Digits(parseFloat(data.priceUsd) / parseFloat(ETHData.priceUsd))} ETH</div>}
						{minMax && <div className={styles.minMaxDiv}>
							<span className={styles.minMaxText}>Минимум:</span>
							<span className={styles.minMaxValue}>${minMax.minPrice.toLocaleString('en', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}</span>
							<Strip
								className={styles.minMaxStrip}
								cursor='auto'
								strip={{ max: minMax.maxPrice - minMax.minPrice, fill: parseFloat(data.priceUsd) - minMax.minPrice }}
							/>
							<span className={styles.minMaxText}>Максимум:</span>
							<span className={styles.minMaxValue}>${minMax.maxPrice.toLocaleString('en', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}</span>
						</div>}
					</div>
					<Button
						color='grey'
						className={styles.showButton}
						onClick={() => setStats(!stats)}
					>
						{!stats && <>Показать статистику</>}
						{stats && <>Скрыть статистику</>}
					</Button>
					<div className={cn(styles.rightAdd, {
						[styles.statsNone]: stats === false,
						[styles.statsBlock]: stats === true,
					})}>
						<div className={styles.statsDiv}>
							<CurrencyPart
								key="marketCapUsd"
								className={styles.statsPart}
								propName='Рыночная капитализация'
								propValue={data.marketCapUsd}
								propSymbol='$'
								horizontalAlign='start'
								handleTooltip={handleDataFromTooltip}
								tooltipText={whatIsCap}
								additionalInfo={[{ addName: 'Объём за 24ч / Рыночная капитализация', addValue: (parseFloat(data.volumeUsd24Hr) / parseFloat(data.marketCapUsd)).toString() }]}
							/>
							<CurrencyPart
								key="volumeUsd24Hr"
								className={styles.statsPart}
								propName='Объём за 24ч'
								propValue={data.volumeUsd24Hr}
								propSymbol='$'
								horizontalAlign='start'
								handleTooltip={handleDataFromTooltip}
								tooltipText={whatIsVolume}
							/>
							{data.maxSupply &&
								<CurrencyPart
									key="circulationSupplyMax"
									className={styles.statsPart}
									propName='Циркулирующее предложение'
									propValue={data.supply}
									propSymbol={' ' + data.symbol}
									horizontalAlign='end'
									handleTooltip={handleDataFromTooltip}
									tooltipText={whatIsSupply}
									propStrip={{ max: parseFloat(data.maxSupply), fill: parseFloat(data.supply) }}
									additionalInfo={[{ addName: 'Максимальное предложение', addValue: data.maxSupply, addTooltipText: whatIsMaxSupply },
									{ addName: 'Общее предложение', addValue: data.supply, addTooltipText: whatIsSupply }]}
								/>
							}
							{!parseFloat(data.maxSupply) &&
								<CurrencyPart
									key="circulationSupply"
									className={styles.statsPart}
									propName='Циркулирующее предложение'
									propValue={data.supply}
									propSymbol={' ' + data.symbol}
									horizontalAlign='end'
									handleTooltip={handleDataFromTooltip}
									tooltipText={whatIsSupply}
									additionalInfo={[{ addName: 'Максимальное предложение', addValue: '--', addTooltipText: whatIsMaxSupply },
									{ addName: 'Общее предложение', addValue: data.supply, addTooltipText: whatIsSupply }]}
								/>
							}
						</div>
					</div>
					<div className={styles.buttonDiv}>
						{INTERVAL_NAMES.map(({ key, value }) => (
							<Button
								className={cn({
									[styles.buttonActive]: key === interval
								})}
								onClick={() => setInterval(key)}
								color={'grey'}
							>
								{value}
							</Button>
						))}
					</div>
					<div className={styles.chartDiv}>
						{name && chartData && <Chart data={chartData}
							name={name}
						/>}
					</div>
				</div >
			}
		</>
	);
};