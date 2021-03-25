import express from 'express';
import React from 'react';
import App from '../shared/App';

import { JohnLewisApi } from './api/johnLewis';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

let assets: any;

const BASE_URI = 'https://api.johnlewis.com/';
const API_KEY = process.env.API_KEY!;
const johnLewisApi = new JohnLewisApi(BASE_URI, API_KEY);

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/api/category/:category/size/:size/page/:page', async (req: express.Request, res: express.Response) => {
    try {
      const result = await johnLewisApi.productSearch(req.params.category, req.params.size, req.params.page);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    } catch (networkError) {
      res.setHeader('Content-Type', 'html/text');
      res.status(networkError.status);
      res.send(networkError.message);
    }
  })
  .get('/api/product/:id', async (req: express.Request, res: express.Response) => {
    try { 
      const result = await johnLewisApi.productDetail(req.params.id);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    } catch (networkError) {
      res.setHeader('Content-Type', 'html/text');
      res.status(networkError.status);
      res.send(networkError.message);
    }
  })
  .get('/*', (req: express.Request, res: express.Response) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );
    res.send(
      `<!doctype html>
      <html lang="en-gb">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>John Lewis</title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700&display=swap" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="/assets/css/app.css" />
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
      </head>
      <body>
        <div id="root">${markup}</div>
      </body>
  </html>`
    );
  });

export default server;