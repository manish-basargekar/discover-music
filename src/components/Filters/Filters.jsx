import Style from "./Filters.module.scss";

const Filters = ({
	selected,
	data,
	setFilter,
	type,
	loading,
	error,
	setSidebarOpen,
}) => {
	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}

	const handleClick = (m) => {
		setFilter(m);
		if (window.innerWidth < 1025) {
			setSidebarOpen(false);
		}
	};

	return (
		<div className={Style.filtersContainer}>
			<span className={Style.heading}>
				<h4 className={Style["heading-text"]}> {type}</h4>
			</span>
			<dir className={Style.filters}>
				{data.map((m) => (
					<div
						key={m}
						className={`${Style.filter} ${Style.filterTag} ${
							selected === m ? Style.marketSelected : " "
						} ${Style[type]}`}
						onClick={() => handleClick(m)}
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
