# A convenient notebook to keep your note available everywhere

## Quick start

The quickest way to run the app on locally is to performs the following steps:

```text
npm install             Download the project dependencies

Open the terminal
npm run start:dev       Create the dev build on /dist folder and watch for changes

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
