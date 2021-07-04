# A convenient notebook to keep your note available everywhere

## Quick start

Notes:

```text
- Configure a mongdb locally (e.g. docker container) or remotely (e.g mongo ATLAS)

- Set the MONGO_DB_URL environment variable on your system pointing to the configured mongodb
```

To launch the application locally you can use:

```text
./launcher.sh
```

Another way to launch the app locally is to performs the following steps:

```text
npm install             Download the project dependencies

Open the terminal
npm run build:dev       Create the dev build on /dist folder and watch for changes

Open another terminal
cd dist
live-server             Serve the static files at http://localhost:8080

Open another terminal
cd dist
node server/server.js   Start the server
```

### Deploy on prod

The app is hosted on heroku cloud platform, in order to deploy it is necessary to create a build for prod running the command **`npm run build:prod`** . The command will generate the build on /dist folder.
Once the build is created we can deploy the project on heroku. To do this we have to run **`git push heroku main`**. Once the app has been deployed, we can access it at the url <https://notebook-online.herokuapp.com>

Other heroku convenent commands are listed on [commands.md](commands.md) file
