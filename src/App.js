import Style from "./App.module.scss";
import { useEffect, useState } from "react";
import {
	GET_RECOMMENDATION,
	GET_WEATHER_FROM_IP,
	GET_AVAILABLE_GENRES,
} from "./queries";

import { useQuery } from "@apollo/client";
import RecommendedTracks from "./components/RecommendedTracks/RecommendedTracks";

import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";

function App() {
	// const [page, setPage] = useState(0);

	const availableMarkets = {
		markets: [
			"AD",
			"AE",
			"AG",
			"AL",
			"AM",
			"AO",
			"AR",
			"AT",
			"AU",
			"AZ",
			"BA",
			"BB",
			"BD",
			"BE",
			"BF",
			"BG",
			"BH",
			"BI",
			"BJ",
			"BN",
			"BO",
			"BR",
			"BS",
			"BT",
			"BW",
			"BY",
			"BZ",
			"CA",
			"CD",
			"CG",
			"CH",
			"CI",
			"CL",
			"CM",
			"CO",
			"CR",
			"CV",
			"CW",
			"CY",
			"CZ",
			"DE",
			"DJ",
			"DK",
			"DM",
			"DO",
			"DZ",
			"EC",
			"EE",
			"EG",
			"ES",
			"FI",
			"FJ",
			"FM",
			"FR",
			"GA",
			"GB",
			"GD",
			"GE",
			"GH",
			"GM",
			"GN",
			"GQ",
			"GR",
			"GT",
			"GW",
			"GY",
			"HK",
			"HN",
			"HR",
			"HT",
			"HU",
			"ID",
			"IE",
			"IL",
			"IN",
			"IQ",
			"IS",
			"IT",
			"JM",
			"JO",
			"JP",
			"KE",
			"KG",
			"KH",
			"KI",
			"KM",
			"KN",
			"KR",
			"KW",
			"KZ",
			"LA",
			"LB",
			"LC",
			"LI",
			"LK",
			"LR",
			"LS",
			"LT",
			"LU",
			"LV",
			"LY",
			"MA",
			"MC",
			"MD",
			"ME",
			"MG",
			"MH",
			"MK",
			"ML",
			"MN",
			"MO",
			"MR",
			"MT",
			"MU",
			"MV",
			"MW",
			"MX",
			"MY",
			"MZ",
			"NA",
			"NE",
			"NG",
			"NI",
			"NL",
			"NO",
			"NP",
			"NR",
			"NZ",
			"OM",
			"PA",
			"PE",
			"PG",
			"PH",
			"PK",
			"PL",
			"PS",
			"PT",
			"PW",
			"PY",
			"QA",
			"RO",
			"RS",
			"RW",
			"SA",
			"SB",
			"SC",
			"SE",
			"SG",
			"SI",
			"SK",
			"SL",
			"SM",
			"SN",
			"SR",
			"ST",
			"SV",
			"SZ",
			"TD",
			"TG",
			"TH",
			"TJ",
			"TL",
			"TN",
			"TO",
			"TR",
			"TT",
			"TV",
			"TW",
			"TZ",
			"UA",
			"UG",
			"US",
			"UY",
			"UZ",
			"VC",
			"VE",
			"VN",
			"VU",
			"WS",
			"XK",
			"ZA",
			"ZM",
			"ZW",
		],
	};

	const [weather, setWeather] = useState("");

	const [recommended, setRecommended] = useState(false);

	const [seedArtists, setSeedArtists] = useState("6eUKZXaKkcviH0Ku9w2n3V");
	const [seedTracks, setSeedTracks] = useState("");
	const [seedGenres, setSeedGenres] = useState("");
	const [market, setMarket] = useState();

	const [sidebarOpen, setSidebarOpen] = useState(true);

	const { loading, error, data } = useQuery(GET_WEATHER_FROM_IP);

	const getRecommendation = useQuery(GET_RECOMMENDATION, {
		skip: !recommended,
		variables: {
			seed_artists: seedArtists,
			seed_tracks: seedTracks,
			seed_genres: seedGenres,
			market: market,
		},
	});

	const availableGenres = useQuery(GET_AVAILABLE_GENRES);

	// if (loading) return <div>Loading...</div>;
	// if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

	useEffect(() => {
		if (loading) {
			return;
		} else {
			setWeather(data.ipApi_location_Auto.weather.current.weather[0].main);
			setRecommended(true);

			if (
				availableMarkets.markets.includes(data.ipApi_location_Auto.countryCode)
			) {
				setMarket(data.ipApi_location_Auto.countryCode);
			} else {
				setMarket("US");
			}

			console.log(data.ipApi_location_Auto.countryCode);
		}
	}, [loading]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}

	const handleClick = () => {
		getRecommendation.refetch();
	};

	return (
		<div className={`${Style.container} ${Style[weather]}`}>
			<div className={Style.App}>
				<div
					className={Style.presets}
					style={{
						transform: sidebarOpen ? "translateX(0)" : "translateX(87%)",
					}}
				>
					<div className={Style.strip}>
						<div className={Style.toggle}>
							<label onClick={() => setSidebarOpen(!sidebarOpen)}>
								{sidebarOpen ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										// class="ai ai-Cross"
									>
										<path d="M20 20L4 4m16 0L4 20" />
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="ai ai-TextAlignLeft"
									>
										<path d="M3 6h18M3 12h10M3 18h15" />
									</svg>
								)}
							</label>
						</div>
						<div className={Style.stripText}></div>
					</div>
					<div className={Style.content}>
						{/* <div className={Style.inputBox}>
							<input type="text" placeholder="search for an artist or track" />
							<button>search</button>
						</div> */}

						<Filters
							selected={seedGenres}
							setFilter={setSeedGenres}
							data={
								availableGenres.data.spotify_Available_genres_sequence.genres
							}
							type={"genre"}
						/>
						<Filters
							selected={market}
							setFilter={setMarket}
							data={availableMarkets.markets}
							type={"market"}
						/>
					</div>
				</div>
				<div
					className={Style["middle-container"]}
					style={{
						width: sidebarOpen ? "calc(100% - 20rem)" : "100%",
						// margin: sidebarOpen? "0 auto" : "0",
					}}
				>
					<div>
						<Header handleClick={handleClick} />

						{recommended ? (
							<RecommendedTracks
								data={getRecommendation.data}
								loading={getRecommendation.loading}
								error={getRecommendation.error}
								setSeedArtists={setSeedArtists}
							/>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
