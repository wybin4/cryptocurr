import { CurrencyPartProps } from './CurrencyPart.props';
import cn from 'classnames';
import styles from './CurrencyPart.module.css';
import { getCommas, getFixedSymbols, min4Digits } from '../../../helpers/convert';
import { Strip } from '../Strip/Strip';
import { InfoIcon } from '../InfoIcon/InfoIcon';


export const CurrencyPart = ({ horizontalAlign, propName, propValue, propSymbol, propPercent, propStrip, tooltipText, additionalInfo, className, ...props }: CurrencyPartProps): JSX.Element => {

	return (
		<div
			className={cn(className, styles.partDiv)}
			key={props.key}
			{...props}
		>
			<div className={styles.mainPart}>
				<div className={styles.namePart}>
					<div className={styles.nameTipDiv}>
						<div className={styles.name}>{propName}</div>
						{tooltipText && <InfoIcon tooltipText={tooltipText} className={styles.tip} />}
					</div>
					<div className={styles.value}>
						{horizontalAlign === 'start' && <span>{propSymbol}</span>}
						<span>{getFixedSymbols(propValue, 0)}</span>
						{horizontalAlign === 'end' && <span>{propSymbol}</span>}
					</div>
				</div>
				{propPercent && <div className={styles.percent}>{propPercent}%</div>}
				{propStrip && <Strip cursor='auto' strip={propStrip} className={styles.strip} />}
			</div>
			{additionalInfo &&
				<div className={styles.addInfoDiv}>
					{additionalInfo.map(info =>
						<>
							<div className={styles.addInfoName}>
								{info.addName}
								{info.addTooltipText && <InfoIcon tooltipText={info.addTooltipText} className={styles.addInfoTip} />}
							</div>
							<div className={styles.addInfoValue}>
								{!isNaN(parseFloat(info.addValue)) && <>{info.addSymbol}{getCommas(min4Digits(parseFloat(info.addValue)))}</>}
								{isNaN(parseFloat(info.addValue)) && <>--</>}
							</div>
						</>
					)}
				</div>
			}
		</div>
	);
};