import Style from "./App.module.scss";
import { useEffect, useState } from "react";
import {
	FETCH_WEATHER,
	GET_RECOMMENDATION,
	GET_WEATHER_FROM_IP,
	GET_AVAILABLE_GENRES,
} from "./queries";

import { useQuery } from "@apollo/client";
import RecommendedTracks from "./components/RecommendedTracks/RecommendedTracks";
import AvailableGenres from "./components/AvailableGenres/AvailableGenres";

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

	const [seedArtists, setSeedArtists] = useState(
		"4NHQUGzhtTLFvgF5SZesLK,01pKrlgPJhm5dB4lneYAqS"
	);
	const [seedTracks, setSeedTracks] = useState("");
	const [seedGenres, setSeedGenres] = useState("chill");
	const [market, setMarket] = useState();

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

	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

	return (
		<div className={`${Style.container} ${Style[weather]}`}>
			<div className={Style.App}>
				<div className={Style.presets}>
					<div className={Style.inputBox}>
						<input type="text" placeholder="search for an artist or track" />
						<button>search</button>
					</div>
					{/* <div className={Style.inputBox}>
						<input type="text" placeholder="search for tracks" />
						<button>search</button>
					</div> */}

					<div className={Style.marketsContainer}>
						<div className={Style.selectedContainer}>
							Current:
							<span className={Style.selected}>
								{market ? regionNames.of(market) : ""}
							</span>
						</div>
						<span className={Style.heading}>Available Countries</span>
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
				</div>
				<div className={Style["middle-container"]}>
					<div className={Style.header}>
						<div className={Style.logo}>Spotify explorer</div>
						<button onClick={handleClick}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								// class="ai ai-ArrowCycle"
							>
								<path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16" />
								<path d="M2 12C2 6 6.39 2 11.806 2 16.209 2 19.76 4.335 21 8" />
								<path d="M7 17l-4-1-1 4" />
								<path d="M17 7l4 1 1-4" />
							</svg>
							<span>Refresh</span>
						</button>
					</div>

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
				<AvailableGenres
					setSeedGenres={setSeedGenres}
					seedGenre={seedGenres}
					data={availableGenres.data}
					loading={availableGenres.loading}
					error={availableGenres.error}
				/>
			</div>
		</div>
	);
}

export default App;
