
# Discover music
Music discovery made simple. Powered by Spotify

# Live demo
[Demo](https://discover-music.vercel.app/)

# Screenshot
![Desktop - 1](https://user-images.githubusercontent.com/64839201/178653682-3052d0b3-8ade-4711-a189-3fbc762f90f1.png)




# Getting started
For starting the app in your machine, open the terminal and follow these commands:

git clone the repo
```
git clone https://github.com/8mn/discover-music.git
```

cd into working directory
```
cd discover-music
```

Install dependencies
```
npm install
```

For starting react app:
```
npm run start
```
open http://localhost:3000 in browser to access the app


# Goals :

- To make an interface for discovering music based on user selected seeds(like tracks, genre, country, artist)

# Approach:

- Use spotify's /recommendation end point and stepzen backend to utilize spotify's rest endpoint. I used stepzen directives like @rest and @sequence to convert spotify's rest api into graphQl endpoints 

- one of the recommendation seed(country) is determined using ip address of the user. It is done using ip-api


# Functionalities:
- spotify search api to search for music.
- Tweak you recommendations to find similar music based on country, artist, genre or track

# Outcomes

- react web app to tweak and find music.

# What's next for Discover music
- Adding more variable to discover music like tempo, acoustics, danceability etc.
- Adding your favorite music to playlist
- Recommendation presets based on mood, weather

# Links

- [Demo](https://discover-music.vercel.app/)
- [GraphQL endpoint(stepzen)](https://github.com/8mn/discover-music-graphql)
- [Frontend](https://github.com/8mn/breeze)


# Contact

If you have any questions/suggestion, Contact me 
- My Email: `hey@mnsh.me`
- Twitter: [@oimanish](https://twitter.com/oimanish)


