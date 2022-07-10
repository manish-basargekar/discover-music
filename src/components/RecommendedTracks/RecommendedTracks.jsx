import { useQuery } from "@apollo/client";
import { GET_RECOMMENDATION } from "../../queries";
import Style from "./RecommendedTracks.module.scss";

import { useState } from "react";

function RecommendedTracks({ recommended }) {
	const [seedArtists, setSeedArtists] = useState(
		"4NHQUGzhtTLFvgF5SZesLK,01pKrlgPJhm5dB4lneYAqS"
	);
	const [seedTracks, setSeedTracks] = useState("");
	const [seedGenres, setSeedGenres] = useState("classical,country");
	const [market, setMarket] = useState("IN");

	const { loading, error, data } = useQuery(GET_RECOMMENDATION, {
		skip: !recommended,
		variables: {
			seed_artists: seedArtists,
			seed_tracks: seedTracks,
			seed_genres: seedGenres,
			market: market,
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

	const handleClick = (a) => {
		console.log(a);
		setSeedArtists(a.artists[0].id);
	};

	return (
		<div>
			<div className={Style["track-container"]}>
				{console.log(data.spotify_Recommendation_Sequence.tracks)}
				{data.spotify_Recommendation_Sequence.tracks.map((a) => (
					<div
						className={Style["album-card"]}
						key={a.id}
						onClick={() => handleClick(a)}
					>
						<img src={a.album.images[0].url} alt="" />
						<div className={Style["album-card-overlay"]}>
							<button>Similar to this</button>
							<button>More info</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecommendedTracks;
