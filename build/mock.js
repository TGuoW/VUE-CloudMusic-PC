const path          = require('path');
const fs            = require('fs');
const express       = require('express');
const app           = express();
const router        = express.Router();
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const Mock          = require('mockjs');

const mockRoot      = path.join(__dirname, '../src/mock');
const restRoot      = path.join(mockRoot, 'rest');

const routerConfig  = require(path.join(mockRoot, 'config/router'));
const serverConfig  = require(path.join(mockRoot, 'config/default'));

const JSON_CONTENT_TYPE  = 'application/json;charset=utf-8';
const PLAIN_CONTENT_TYPE = 'text/plain;charset=utf-8';
const PORT = serverConfig.PORT ? serverConfig.PORT : 5000;
const PROTOCOL = serverConfig.PROTOCOL ? serverConfig.PROTOCOL : 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

for (let api in routerConfig) {
  let method = '';
  let route = api.indexOf(' ') > 0
    ? (method = api.split(' ')[0], api.split(' ')[1])
    : api;
  
  router.route(route)
    .all((req, res) => {
      let mockFile = routerConfig[api];
      let url = req.url;
      let JsonFile;
      let sContent;

      if (url === '/favicon.icon') {
        res.end();
        return false;
      }

      JsonFile = path.resolve(path.join(restRoot, mockFile));
      fs.exists(JsonFile, isExist => {
        if (isExist) {
          sContent = fs.readFileSync(JsonFile, 'utf8');
          if (sContent) {
            res.set('Content-Type', JSON_CONTENT_TYPE)
              .send(JSON.stringify(Mock.mock(JSON.parse(sContent))));
          } else {
            res.status(500)
              .set('Content-Type', PLAIN_CONTENT_TYPE)
              .send('server error!');
          }
        } else {
          res.status(404)
            .set('Content-Type', PLAIN_CONTENT_TYPE)
            .send(`json file ${JsonFile} not exist!`);
        }
      });
    });
}

app.use(router);

app.listen(PORT, PROTOCOL);

module.exports = app;
