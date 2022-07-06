import { gql } from "@apollo/client";







export const FETCH_WEATHER = gql`
	query MyQuery {
		ipApi_location_Auto(lang: "en") {
			city
			continent
			country
			ip
			lat
			lon
			proxy
			district
			message
			mobile
			weather(units: metric) {
				lat
				lon
				current {
					clouds
					dew_point
					dt
					feels_like
					humidity
					pressure
					sunrise
					sunset
					temp
					uvi
					visibility
					weather {
						description
						icon
						id
						main
						weather_mood_music {
							album
							artists
							disc_number
							duration_ms
							explicit
							external_ids
							external_urls
							href
							id
							is_local
							name
							popularity
							preview_url
							track_number
							type
							uri
						}
						weather_mood_image {
							results
						}
					}
				}
			}
		}
	}
`;



