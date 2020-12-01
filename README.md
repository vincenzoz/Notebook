# A convenient notebook to keep your note available everywhere

## Quick start

```text
npm install
npm run build:dev
npm run start:dev
```

## App running at url

```text
http://localhost:8080/
```

## Webpack

Webpack configuration is splitted for 'dev' and 'prod'. The two different files are on /config folder

The prod configuration generate the client and server boundles and simply copy the index.html static file from 'src' to 'dist' folder.
This step is necessary to avoid the server part to be included on the html

```html
<body>
    <div id="root"></div>
    <script src="app.bundle.js"></script>
</body>
```
