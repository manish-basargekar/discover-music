import Style from "./Filters.module.scss";

const Filters = ({
	selected,
	data,
	setFilter,
	type,
}) => {
	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

	return (
		<div className={Style.marketsContainer}>
			<span className={Style.heading}>
				<h4 className={Style["heading-text"]}> {type}</h4>
			</span>
			<dir className={Style.markets}>
				{data.map((m) => (
					<div
						key={m}
						className={`${Style.filter} ${Style.filterTag} ${
							selected === m ? Style.marketSelected : " "
						} ${Style[type]}`}
						onClick={() => setFilter(m)}
					>
						{type === "market" ? regionNames.of(m) : m}

						{/* {regionNames.of(m)} */}
					</div>
				))}
			</dir>
		</div>
	);
};

export default Filters;
