# Project initialisation

## Here the scripts to configure the project using react typescript and webpack

```text
npm i react react-dom
npm i express
npm i -D @types/react @types/react-dom
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin copy-webpack-plugin
npm i -D ts-loader
npm i -D typescript
npm i -D css-loader
npm i -D style-loader
npm install react-bootstrap bootstrap
npm install jquery popper.js
```

## Heroku

```text
heroku login
heroku create notebook-online --region eu

verify that remote have been added
git remote -v

git push heroku main

heroku run bash -a notebook-online

heroku logs --tail

heroku plugins:install heroku-builds
heroku builds
heroku builds:cancel -a notebook-online
```
