import { useQuery } from "@apollo/client";
import { GET_RECOMMENDATION } from "../../queries";
import Style from "./RecommendedTracks.module.scss"

function RecommendedTracks({ recommended }) {
	const { loading, error, data } = useQuery(GET_RECOMMENDATION, {
		skip: !recommended,
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

	return (
		<div>
			<div className={Style["track-container"]}>
				{console.log(
					data.spotify_Recommendation_Sequence.tracks
				)}
				{data.spotify_Recommendation_Sequence.tracks.map((a) => (
					<div className={Style["album-card"]}>
						<img src={a.album.images[0].url} alt="" />
					</div>
				))}
			</div>
		</div>
	);
}

export default RecommendedTracks;
