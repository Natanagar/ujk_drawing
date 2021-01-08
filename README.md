# UJK-Drawing

This educational project which was created for courses of programming languages in UJK
the second year of Bachelor graduation

## Technologies

Frontend-side: React-Typescript-Canvas
CSS: styled-components
UI-kit: AntD

Backend-side: Express, Mongoose, Pino, Passport.js,

The Database : MongoDB;

### `installation`

MongoDb is needed to be pre-installed and running;
Check information here [check information about your OS](https://docs.mongodb.com/manual/installation/)

Nodejs is needed to be pre-installed
Check information here [please, check information about your OS](https://nodejs.org/en/download/)

Running the app in the development mode.\

1. Use `git clone` this repo. Copy link from the front of the page.
2. Go to the directory with the app (`cd my_directory` in the terminal(macOs)/bash(Win)).
3. `npm i`
4. `npm run dev`

### `enviroment variables`

in the root of the app you need to create via `touch .env` file with the next:

1. PORT=8080 (default port for the server)
2. REACT_APP_API=`http://localhost:8080/` (default access to the api)
3. REACT_APP_ACCESS_KEY="accessToken" - name of the access token
4. REACT_APP_REFRESH_KEY="refreshToken" - name of the refresh token
5. REACT_APP_COOKIE_DOMAIN=localhost - access to the cookie

### `Representation`

Open [http://localhost:3006](http://localhost:3006) to view it in the browser.

The server will be started in [http://localhost:8080](http://localhost:8080)
You don't need to open this page. The local server works as a proxy-server.
In the terminal you'll see the message about running server.

## More information about patterns and technologies

This educational project is created as mvc (model-view-controller) and mvp (minimal valuable product)
Frontend-side: Creating pictures based on Canvas. Saving pictures to the LocalStorage.
Custom and base validation of forms is based on AntD.
Token to the authorization send via headers (Authorization without prefix Bearer)
and in custom case via queries parameters.

Backend-size: JWT authorization is in the short version. There is only one token (no access and refresh token)
but it can be replaced to the standard (jwt-authorization with custom algorithms).

The algorithm of checking token is represented in Passport.js strategy.

Database: collection : jwt-users

## Pull-requests

This is educational project and there is no pull-request to this repo.
