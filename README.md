Breeze: Music recommendation based on weather


# Goals : 

- To provide music recommendation based on weather using spotify and openweather api


# approach:

Stitch together apis like IP-api, openweather, spotify using stepzen(@materializer & @sequence) to fetch relevant data


ip-api to determine the user's location(approximate)

Functionalities:
This allows the app to bypass annoying pop-up about using location data. Since ip-api gives an approx latitude and longitude, we can use that to fetch weather

openweather api to fetch weather information
The latitude and longitude are then passed onto openweather api to fetch information about the weather

spotify search api to search for music based on the description of weather provided by openweather api




# outcomes

a react app which fetch the all the relevant data using stepzen graphQL backend


# Functionalities
- Automatically fetch your location/weather and provides relevant music recommendation




