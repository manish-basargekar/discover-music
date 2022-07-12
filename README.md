Breeze: Music recommendation based on weather

# Goals :

- To make a interface specifically for discovering music based on user selected seeds(like tracks, genre, country, artist)

# Approach:

- Use spotify's /recommendation end point and stepzen backend to utilize spotify's rest endpoint. I used stepzen directives like @rest and @sequence to convert spotify's rest api into graphQl endpoints 

- one of the recommendation seed(country) is determined using ip address of the user. It is done using ip-api


# Functionalities:

This allows the app to bypass annoying pop-up about using location data. 


- spotify search api to search for music.
- recommendation by genre
- recommendation by country
- recommendation by track and country

# Outcomes

a react app which fetch the all the relevant data using stepzen graphQL backend

# Functionalities

- Automatically fetch your location/weather and provides relevant music recommendation

# Links

- [Demo](https://github.com/8mn/discover-music)
- [GraphQL endpoint(stepzen)](https://github.com/8mn/breeze-graphql)
- [Frontend](https://github.com/8mn/breeze)
