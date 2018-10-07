# spotties auth backend

This repostory hosts the back-end needed to safely authenticate requests with spotify for the [spotties app](https://hpbl.github.io/spotties).

This backend is currently hosted on Heroku, under the URL of https://vast-cliffs-56187.herokuapp.com/

The implementation is based on the authentication examples provided by spotify on https://github.com/spotify/web-api-auth-examples

## Features

- `GET /`: greets the world.

- `GET /client_credentials`: returns an authorization token so we can query Spotify non-private information (artists, playlists, songs, ... ).


## Contributors

Hilton Pintor ([@hpbl](https://github.com/hpbl))

Distributed under the TBD license. See ``LICENSE`` for more information.
