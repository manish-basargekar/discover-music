
import React from "react";

import Style from "./AvailableGenres.module.scss";

function AvailableGenres({ setSeedGenres, seedGenre, data, loading, error }) {


	// const activeGenreClassname = 


	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;


	return (
		<>
			<div className={Style.container}>
				<div className="selected">
					{seedGenre ? seedGenre : ""}
				</div>
				<div className={Style.heading}>
					<span>genres</span>
				</div>
				<div className={Style["genre-container"]}>
					{
						data.spotify_Available_genres_sequence.genres.map((genre) => {
							return (
								<div
									className={Style.genre}
									onClick={() => setSeedGenres(genre)}
									key={genre}
									style={{
										backgroundColor: seedGenre === genre ? "#69fc4b" : "",
										color: seedGenre === genre ? "#000" : "",
									}}
								>
									{genre}
								</div>
							);
						})
						// console.log(data.spotify_Available_genres_sequence.genres)
					}
				</div>
			</div>
		</>
	);
}

export default AvailableGenres;
