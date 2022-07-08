import Style from "./App.module.scss";
import { useEffect, useState } from "react";
import { FETCH_WEATHER } from "./queries";

import { useQuery } from "@apollo/client";


function App() {
	// const [imgNum, setImgNum] = useState(0);

	const PAGE_SIZE = 12;

	const [page, setPage] = useState(0);

	const [weather, setWeather] = useState("");

	const { loading, error, data } = useQuery(FETCH_WEATHER, {
		variables: {
			limit: PAGE_SIZE,
			offset: page * PAGE_SIZE,
		},
	});

	

	useEffect(() => {
		if (loading) {
			return;
		} else {
			setWeather(data.ipApi_location_Auto.weather.current.weather[0].main);
		}
	}, [loading]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;



	



	return (
		<div className={`${Style.container} ${Style[weather]}`}>
			<div className={Style.App}>
				{/* {console.log(data.ipApi_location_Auto.weather.current.weather[0].weather_mood_image.results[0].color)} */}
				<div className={Style.weatherInfo}>
					<div className={Style["head-container"]}>
						<img
							src={` https://openweathermap.org/img/wn/${data.ipApi_location_Auto.weather.current.weather[0].icon}@2x.png`}
							alt=""
						/>
						<div className={Style.head}>
							{/* <div className={Style.location}> */}
							<h1>
								{data.ipApi_location_Auto.city},{" "}
								{data.ipApi_location_Auto.country}
							</h1>
							{/* </div> */}
							{/* <div className={Style.temp}> */}
							<p>
								Feels like {data.ipApi_location_Auto.weather.current.feels_like}
								°C,{" "}
								{
									data.ipApi_location_Auto.weather.current.weather[0]
										.description
								}
								{/* . Gentle Breeze */}
							</p>

							{/* </div> */}
						</div>
					</div>
					{/* <div className={Style.info}>
						<p>
							Humidity:
							{data.ipApi_location_Auto.weather.current.humidity}
						</p>
						<p>
							Temperature:
							{data.ipApi_location_Auto.weather.current.temp}°C
						</p>
						<p>
							description:
							{data.ipApi_location_Auto.weather.current.weather[0].description}
						</p>
					</div> */}
				</div>

				<div className={Style.tabs}>
					<div className={`${Style.active} ${Style.tab}`}>Based on weather</div>
					<div className={Style.tab}>Recommended</div>
					<div className={Style.tab}>
						Popular in {data.ipApi_location_Auto.city}
					</div>
				</div>

				<div className={Style["track-container"]}>
					{data.ipApi_location_Auto.weather.current.weather[0].weather_mood_music.map(
						(track) => (
							<div className={Style.track}>
								<div className={Style.trackTop}>
									<img src={track.images[1].url} alt="" />
									{/* {console.log(track.images[0].url)} */}
								</div>
								<div className={Style.trackBottom}>
									<div className={Style.head}>
										<div className={Style.left}>
											<h2 className={Style.album}>{track.album}</h2>
											<div className={Style.album}>{track.artists}</div>
										</div>
										<audio controls>
											<source src={track.preview_url} />
										</audio>
										<div className={Style.right}>
											<button className={Style.spotifyLink}>
												<a
													href={track.external_urls}
													target="_blank"
													rel="noopener noreferrer"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														viewBox="0 0 24 24"
														fill="currentColor"
														strokeWidth="2"
														// class="ai ai-SpotifyFill"
													>
														<path d="M11.995 0C5.381 0 0 5.382 0 11.996 0 18.616 5.381 24 11.995 24 18.615 24 24 18.615 24 11.996 24 5.382 18.615 0 11.995 0zM5.908 16.404a14.548 14.548 0 0 1 4.238-.638c2.414 0 4.797.612 6.892 1.77.125.068.238.292.29.572.05.28.03.567-.052.716a.61.61 0 0 1-.834.24A13.107 13.107 0 0 0 6.277 18.03a.61.61 0 0 1-.771-.402c-.107-.35.114-1.13.402-1.224zm-.523-4.42a18.154 18.154 0 0 1 4.76-.635c2.894 0 5.767.7 8.31 2.026.179.09.31.244.37.432a.747.747 0 0 1-.052.578c-.227.444-.493.743-.66.743a.769.769 0 0 1-.35-.086 16.33 16.33 0 0 0-7.617-1.854 16.34 16.34 0 0 0-4.366.585.749.749 0 0 1-.92-.525c-.112-.422.145-1.16.525-1.264zM5.25 9.098a.88.88 0 0 1-1.073-.641c-.123-.498.188-1.076.64-1.19a22.365 22.365 0 0 1 5.328-.649c3.45 0 6.756.776 9.824 2.307a.888.888 0 0 1 .4 1.19c-.143.288-.453.598-.795.598a.924.924 0 0 1-.388-.087 20.026 20.026 0 0 0-9.041-2.126c-1.635 0-3.282.201-4.895.598z" />
													</svg>
													<div>Listen on Spotify</div>
												</a>
											</button>
										</div>
									</div>
								</div>
							</div>
						)
					)}
				</div>
				<div className={Style.pagination}>
					<button disabled={!page} onClick={() => setPage((prev) => prev - 1)}>
						Previous
					</button>
					<span>Page {page + 1}</span>
					<button onClick={() => setPage((prev) => prev + 1)}>Next</button>
				</div>
			</div>
		</div>
	);
}

export default App;
