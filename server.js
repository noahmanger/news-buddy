import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import rp from 'request-promise-native';
import Express from 'express';
import unfluff from 'unfluff';

import base from './src/views/base';
import App from './src/shared/components/App.jsx';
import sources from './src/shared/sources';

const KEY = process.env.NEWS_API_KEY;
const server = Express();

server.use(Express.static(path.join(__dirname, 'static')));

server.get('/', (req, res) => {
  let source = Object.keys(sources)[0];
  if (req.query.source && sources[req.query.source]) {
    source = req.query.source;
  }
  const options = {
    uri: 'https://newsapi.org/v1/articles',
    qs: {
      apiKey: KEY,
      source,
    },
    json: true,
    headers: {
      'User-Agent': 'Request-Promise',
    },
  };
  rp(options).then((newsResponse) => {
    const initialState = {
      articles: newsResponse.articles,
      apiKey: KEY,
      source,
    };
    const app = renderToString(<App {...initialState} />);
    res.send(base({
      body: app,
      title: 'News buddy',
      initialState: JSON.stringify(initialState),
    }));
  });
});

server.get('/download', (req, res) => {
  const url = req.query.url;
  rp(url).then((resp) => {
    const article = unfluff(resp);
    const data = {
      content: article.text,
      title: article.title,
    };
    res.send({ body: data });
  });
});

server.listen(3000, () => {
  console.log('Listening on 3000');
});
