import React from 'react';
import ArticleList from './ArticleList.jsx';
import SourceToggle from './SourceToggle.jsx';

require('es6-promise').polyfill();
require('isomorphic-fetch');

function buildUrl(key, source) {
  let base = 'https://newsapi.org/v1/articles?';
  let params = {
    'apiKey': key,
    'source': source
  }

  let query = Object.keys(params).map(k => k + '=' + params[k]).join('&');
  return base + query;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.articles,
      source: this.props.source,
      url: buildUrl(this.props.apiKey, this.props.source)
    }
  }

  fetchNews(source) {
    const self = this;
    const url = buildUrl(this.props.apiKey, source);
    fetch(url).then(function(resp) {
      resp.json().then(function(data) {
        self.setState({articles: data.articles})
        window.history.pushState({}, '', window.location.origin + window.location.pathname + '?source=' + source);
      })
    });
  }

  switchSource(e) {
    e.preventDefault();
    let source = e.target.dataset.source;
    this.setState({
      source: source
    })

    this.fetchNews(source);
  }

  render() {
    return (
      <main className="columns">
        <SourceToggle switchSource={this.switchSource.bind(this)} selected={this.state.source}/>
        <ArticleList articles={this.state.articles} source={this.state.source} />
      </main>
    )
  }
}
