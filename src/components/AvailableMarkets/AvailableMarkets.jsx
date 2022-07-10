import Style from "./AvailableMarkets.module.scss"


const AvailableMarkets = ({market, availableMarkets, setMarket}) => {


    	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return (
		<div
			className={Style.marketsContainer}
			// style={{
			// 	height: collapsed ? "50vh" : "0",
			// }}
		>
			<span className={Style.heading}>
				<span className={Style["heading-text"]}>Available Countries</span>
				<button >
					show
				</button>
			</span>
			<dir className={Style.markets}>
				{availableMarkets.markets.map((m) => (
					<div
						key={m}
						className={Style.market}
						onClick={() => setMarket(m)}
						style={{
							backgroundColor: market === m ? "#69fc4b" : "",
							color: market === m ? "#000" : "",
						}}
					>
						{regionNames.of(m)}
					</div>
				))}
			</dir>
		</div>
	);
}

export default AvailableMarkets