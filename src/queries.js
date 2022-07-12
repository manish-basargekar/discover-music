import { gql } from "@apollo/client";

export const GET_AVAILABLE_GENRES = gql`
	query MyQuery {
		spotify_Available_genres_sequence {
			genres
		}
	}
`;

export const GET_AVAILABLE_MARKETS = gql`
	query MyQuery {
		spotify_Available_Markets_Sequence {
			markets
		}
	}
`;

export const GET_WEATHER_FROM_IP = gql`
	query MyQuery {
		ipApi_location_Auto {
			countryCode
		}
	}
`;

export const GET_SEARCH = gql`
	query MyQuery($q : String!) {
		spotify_Search_Sequence(q: $q, limit: 10, offset: 10) {
			artistID
			artists
			id
			name
		}
	}
`;

export const GET_RECOMMENDATION = gql`
	query MyQuery(
		$seed_artists: String!
		$seed_tracks: String!
		$seed_genres: String!
		$market: String!
	) {
		spotify_Recommendation_Sequence(
			seed_artists: $seed_artists
			seed_genres: $seed_genres
			seed_tracks: $seed_tracks
			market: $market
		) {
			tracks
		}
	}
`;
