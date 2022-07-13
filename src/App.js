import Style from "./App.module.scss";
import { useEffect, useState } from "react";
import {
	GET_RECOMMENDATION,
	GET_WEATHER_FROM_IP,
	GET_AVAILABLE_GENRES,
	GET_AVAILABLE_MARKETS,
	GET_SEARCH,
} from "./queries";

import { useLazyQuery, useQuery } from "@apollo/client";
import RecommendedTracks from "./components/RecommendedTracks/RecommendedTracks";

import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Loading from "./components/Loading/Loading";

function App() {
	const [recommended, setRecommended] = useState(false);

	const [seedArtists, setSeedArtists] = useState("6eUKZXaKkcviH0Ku9w2n3V");
	const [seedTracks, setSeedTracks] = useState("");
	const [seedGenres, setSeedGenres] = useState("acoustic");
	const [market, setMarket] = useState();

	const [allMarkets, setAllMarkets] = useState();

	const [sidebarOpen, setSidebarOpen] = useState(true);

	const [artistName, setArtistName] = useState("");
	const [trackName, setTrackName] = useState("");

	const [search, setSearch] = useState("");

	const [searchContainer, setSearchContainer] = useState(false);
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

	const availableMarketsQuery = useQuery(GET_AVAILABLE_MARKETS);

	const [searchQuery, searchState] = useLazyQuery(GET_SEARCH, {
		variables: {
			q: search,
		},
	});

	useEffect(() => {
		if (loading || availableMarketsQuery.loading) {
			return;
		} else {
			// setWeather(data.ipApi_location_Auto.weather.current.weather[0].main);
			setRecommended(true);
			// console.log(
			// 	availableMarketsQuery
			// );
			setAllMarkets(
				availableMarketsQuery.data.spotify_Available_Markets_Sequence.markets
			);
			if (
				availableMarketsQuery.data.spotify_Available_Markets_Sequence.markets.includes(
					data.ipApi_location_Auto.countryCode
				)
			) {
				setMarket(data.ipApi_location_Auto.countryCode);
			} else {
				setMarket("US");
			}

			// console.log(data.ipApi_location_Auto.countryCode);
		}
	}, [loading, availableMarketsQuery.loading]);

	useEffect(() => {
		if (window.innerWidth < 1025) {
			setSidebarOpen(false);
		}
	}, []);

	

	if (loading || availableGenres.loading || availableMarketsQuery.loading) {
		return <Loading />;
	}

	if (error || availableGenres.error || availableMarketsQuery.error) {
		return <pre>{JSON.stringify(error , null, 2)}</pre>;
	}

	const handleClick = () => {
		getRecommendation.refetch();
	};

	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });



	return (
		<div className={`${Style.container} ${Style["Clearg"]}`}>
			{/* {console.log(availableGenres.data)} */}
			{/* {console.log(searchState.data)} */}
			<div className={Style.App}>
				<div
					className={Style.presets}
					style={{
						transform: sidebarOpen ? "translateX(0)" : "translateX(89%)",
					}}
					id="sidebar"
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
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										// class="ai ai-TextAlignLeft"
									>
										<path d="M3 6h18M3 12h10M3 18h15" />
									</svg>
								)}
							</label>
						</div>
						<div className={Style.stripText}></div>
					</div>
					<div className={Style.content}>
						<form
							className={Style.inputBox}
							onSubmit={(e) => {
								e.preventDefault()
								setSearchContainer(true);
								searchQuery();
							}}
						>
							<input
								type="text"
								placeholder="search for an artist or track"
								onChange={(e) => setSearch(e.target.value)}
								value={search}
							/>
							{/* {!searchState.called && ( */}
							<button type="submit" className={Style.searchButton}>
								search
							</button>
							{/* )} */}
						</form>
						<div
							className={Style.searchContainer}
							style={{
								display: searchContainer ? "block" : "none",
							}}
						>
							{searchState.loading ? (
								<Loading />
							) : (
								searchState.data?.spotify_Search_Sequence.map((a) => (
									<div className={Style.searchResults}>
										{/* {console.log(a)} */}
										<div className={Style.addArtist}>
											<span>{a.artists}</span>
											<button
												onClick={() => {
													setArtistName(a.artists);
													setSeedArtists(a.artistID);
													setSearchContainer(false);
													if (window.innerWidth < 1025) {
														setSidebarOpen(false);
													}
													setSearch("");
												}}
											>
												add
											</button>
										</div>
										<div className={Style.addTrack}>
											<span>{a.name}</span>
											<button
												onClick={() => {
													setTrackName(a.name);
													setSeedTracks(a.id);
													setSearchContainer(false);
													setSearch("");
													if (window.innerWidth < 1025) {
														setSidebarOpen(false);
													}
												}}
											>
												add
											</button>
										</div>
									</div>
								))
							)}
						</div>
						<h4 className={Style["sidebar-heading"]}>current seeds</h4>
						<div className={Style.seeds}>
							<div className={Style.seedBoxLeft}>
								<div className={`${Style.seed} ${Style.seedTrack}`}>
									<h4 className={Style.label}>track</h4>
									<div className={Style.seedText}>
										{trackName ? trackName : "Select track name on album cover"}
									</div>
								</div>
								<div className={`${Style.seed} ${Style.seedGenre}`}>
									<h4 className={Style.label}>Genre</h4>
									<div className={Style.seedText}>
										{seedGenres ? seedGenres : " "}
									</div>
								</div>
							</div>
							<div>
								<div className={`${Style.seed} ${Style.seedArtist}`}>
									<h4 className={Style.label}>Artist</h4>
									<div className={Style.seedText}>
										{artistName
											? artistName
											: "Select Artist name on album cover"}
									</div>
								</div>
								<div className={`${Style.seed} ${Style.seedCountry}`}>
									<h4 className={Style.label}>Country</h4>
									<div className={Style.seedText}>
										{market ? regionNames.of(market) : " "}
									</div>
								</div>
							</div>
						</div>

						<Filters
							selected={seedGenres}
							setFilter={setSeedGenres}

							data={
								availableGenres.data.spotify_Available_genres_sequence.genres
							}
							type={"genre"}
							loading={availableGenres.loading}
							error={availableGenres.error}
							setSidebarOpen={setSidebarOpen}
						/>
						{allMarkets ? (
							<Filters
								selected={market}
								setFilter={setMarket}
								data={allMarkets}
								type={"country"}
								setSidebarOpen={setSidebarOpen}
							/>
						) : (
							""
						)}
						<div className={Style.sig}>
							<span>
								Discover music: made by{" "}
								<a
									href="http://www.mnsh.me"
									target="_blank"
									rel="noopener noreferrer"
								>
									Manish
								</a>
							</span>
						</div>
					</div>
				</div>
				<div
					className={Style["main-container"]}
					style={{
						width: sidebarOpen ? "calc(100% - 25rem)" : "100%",
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
								setSeedTracks={setSeedTracks}
								setArtistName={setArtistName}
								setTrackName={setTrackName}
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
