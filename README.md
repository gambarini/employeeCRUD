# employeeCRUD

- Golang with GAE datastore back-end REST API
- Angular 2, typescript front-end web app.

You will need Google Cloud SDK installed to run the server.

### To Run
- npm install, from the static folder to get angular 2 dependencies.
 ```
 /static$ npm install
 ```
- npm run build, from static folder to compile typescript files to js.
```
/static$ npm run build
```
- dev_appserver.py app.yaml, from base folder to start dev server.
```
/$ dev_appserver.py app.yaml
```

Just access the localhost domain created by the dev server, usualy localhost:8080. It should load the CRUD page.
