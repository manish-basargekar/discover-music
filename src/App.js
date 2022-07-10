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
import AvailableMarkets from "./components/AvailableMarkets/AvailableMarkets";
import Header from "./components/Header/Header";

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
			<button onClick={() => setSidebarOpen(!sidebarOpen)}>Open</button>
			<div className={Style.App}>
				<div
					className={Style.presets}
					style={{
						transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
					}}
				>
					<button onClick={() => setSidebarOpen(!sidebarOpen)}>close</button>
					<div className={Style.inputBox}>
						<input type="text" placeholder="search for an artist or track" />
						<button>search</button>
					</div>
					{/* <div className={Style.inputBox}>
						<input type="text" placeholder="search for tracks" />
						<button>search</button>
					</div> */}
					<AvailableGenres
						setSeedGenres={setSeedGenres}
						seedGenre={seedGenres}
						data={availableGenres.data}
						loading={availableGenres.loading}
						error={availableGenres.error}
					/>

					<AvailableMarkets
						market={market}
						setMarket={setMarket}
						availableMarkets={availableMarkets}
					/>
				</div>
				<div
					className={Style["middle-container"]}
					style={{
						width: sidebarOpen ? "calc(100% - 22rem)" : "100%",
					}}
				>
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
					<Header handleClick={handleClick} />
				</div>
			</div>
		</div>
	);
}

export default App;
