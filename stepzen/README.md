# Discover-music: Stepzen backend

## Introduction

This is a stepzen backend made for [Discover music app](https://github.com/8mn/discover-music)

## Getting Started

You'll need to create a [StepZen account](https://stepzen.com/signup) first.

Once you've got that set up, [git clone](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone) this repository onto your machine and open the working directory:



```bash
git clone https://github.com/8mn/discover-music-graphql.git
cd discover-music-graphql
```



## Adding environment variables

- You will need Spotify `client_id` and `client_secret` which you can get from [Spotify's dashboard](https://developer.spotify.com/dashboard/)
- Rename the `sample.config.yaml` to `config.yaml` and insert the spotify credentials like so:

```
configurationset:
  - configuration:
      name: spotify_config
      client_id: YOUR_SPOTIFY_CLIENT_ID
      client_secret: YOUR_SPOTIFY_CLIENT_SECRET
      buffer: A BASE-64 ENCODED ID:SECRET HASH
```
## Run StepZen

Open your terminal and [install the StepZen CLI](https://stepzen.com/docs/quick-start). You need to login here using the command: `stepzen login`.

Start the GraphQL API by running `stepzen start`. After you've followed the prompts (you can accept the suggested endpoint name or add your own), a proxy of the GraphiQL playground becomes available at `http://localhost/5001/api/YOUR_ENDPOINT`, which you can use to explore the GraphQL API. Also, the endpoint at which your GraphQL API is deployed gets logged in the terminal.

## Contact

If you have any questions, Contact me 
- My Email: `hey@mnsh.me`
- Twitter: [@oimanish](https://twitter.com/oimanish)