import Style from "./RecommendedTracks.module.scss";

function RecommendedTracks({ data, loading, error, setSeedArtists }) {
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
					<div className={Style["album-card"]} key={a.id}>
						<div
							style={{
								overflow: "hidden",
							}}
						>
							<img
								src={a.album.images[0].url}
								alt=""
								className={Style.albumArt}
							/>
						</div>
						<div className={Style["album-card-overlay"]}>
							<div>
								<h3>{a.album.name} by </h3>
								{a.artists.map((artist) => {
									return (
										<span key={artist.id}>
											{artist.name}{" "}
											{artist.id === a.artists[a.artists.length - 1].id
												? ""
												: ", "}
										</span>
									);
								})}
							</div>
							<div className={Style["btn-container"]}>
								<button onClick={() => handleClick(a)}>More like this</button>
								<button>
									{" "}
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
										// class="ai ai-Info"
									>
										<circle cx="12" cy="12" r="10" />
										<path d="M12 7h.01" />
										<path d="M10 11h2v5" />
										<path d="M10 16h4" />
									</svg>
									More info
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecommendedTracks;
