import React from 'react';
import ArticleList from './ArticleList.jsx';
import SourceToggle from './SourceToggle.jsx';
import ReadArticle from './ReadArticle.jsx';

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
      url: buildUrl(this.props.apiKey, this.props.source),
      hasSavedArticles: false
    }
  }

  componentDidMount() {
    // See if there's any saved articles for the source
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
    if (savedArticles && savedArticles[this.state.source]) {
      this.setState({
        hasSavedArticles: true
      })
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
    let hasSavedArticles = false;
    let localArticles = JSON.parse(localStorage.getItem('savedArticles'));
    if (localArticles && localArticles[source]) {
      hasSavedArticles = true
    }

    this.setState({
      source: source,
      hasSavedArticles: hasSavedArticles
    })

    this.fetchNews(source);
  }

  download() {
    /* Call /download to get the title and text of each article */
    const self = this;
    let sourceArticles = [];
    let savedArticles = {};
    let count = 0;
    // Check if there's already saved articles
    if (localStorage.getItem('savedArticles')) {
      savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
    }

    this.state.articles.map((article) => {
      let url = window.location.origin + '/download?url=' + article.url;
      fetch(url).then((resp) => {
        console.log('saving...');
        self.setState({isSavingArticles: true});
        resp.json().then(function(data) {
          let savedArticle = {
            title: data.body.title,
            content: data.body.content,
            url: article.url,
            date: article.publishedAt,
            author: article.author
          }
          sourceArticles.push(savedArticle);
          savedArticles[self.state.source] = sourceArticles;
          // Save to localStorage and set state
          localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
          count++;
          self.setState({
            hasSavedArticles: true,
            savedArticleCount: count,
            isSavingArticles: count < self.state.articles.length ? true : false
          });
        });
      });
    });
  }

  emptyStorage() {
    localStorage.removeItem('savedArticles');
    this.setState({hasSavedArticles: false});
  }

  readArticle(e) {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles'))[this.state.source];
    const url = e.target.dataset.url;
    const savedArticle = savedArticles.find((article) => {
      return article.url === url;
    });

    this.setState({reading: savedArticle});
  }

  closeArticle() {
    this.setState({reading: false});
  }

  render() {
    let body =
      <div className="container is-fluid">
        <div className="columns">
          <SourceToggle switchSource={this.switchSource.bind(this)} selected={this.state.source}/>
          <ArticleList
            articles={this.state.articles}
            source={this.state.source}
            download={this.download.bind(this)}
            empty={this.emptyStorage.bind(this)}
            readArticle={this.readArticle.bind(this)}
            hasSavedArticles={this.state.hasSavedArticles}
            isSavingArticles={this.state.isSavingArticles}
            savedArticleCount={this.state.savedArticleCount}
            />
        </div>

      </div>

    if (this.state.reading) {
      body =
        <div className="columns article-container">
          <ReadArticle
            title={this.state.reading.title}
            content={this.state.reading.content}
            source={this.state.source}
            author={this.state.reading.author}
            date={this.state.reading.date}
            closeArticle={this.closeArticle.bind(this)}/>
        </div>
    }

    return (
      <main>
        {body}
      </main>
    )
  }
}
