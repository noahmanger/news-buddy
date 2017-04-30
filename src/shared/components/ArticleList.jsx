import React from 'react';
import Article from './Article.jsx';
import sources from '../sources.js';

export default class App extends React.Component {
  render() {
    let articles = 'Nothing to show';
    if (this.props.articles.length > 0) {
      articles = this.props.articles.map((article, index) => (
        <Article
          data={article}
          key={index}
          isSaved={this.props.hasSavedArticles}
          readArticle={this.props.readArticle}
        />
        ));
    }

    let clearButton =
      (<button className="button is-secondary" disabled>
        <span className="icon"><i className="fa fa-trash" /></span>
        <span>Clear downloads</span>
      </button>);

    let saveButton =
      (<button className="button is-primary" onClick={this.props.download}>
        <span className="icon"><i className="fa fa-download" /></span>
        <span>Save articles</span>
      </button>);

    if (this.props.hasSavedArticles && !this.props.isSavingArticles) {
      clearButton =
        (<button className="button is-secondary" onClick={this.props.empty}>
          <span className="icon"><i className="fa fa-trash" /></span>
          <span>Clear downloads</span>
        </button>);

      saveButton =
        (<button className="button is-primary">
          <span className="icon"><i className="fa fa-download" /></span>
          <span>{this.props.articles.length} articles saved</span>
        </button>);
    }

    if (this.props.isSavingArticles) {
      saveButton =
        (<button className="button is-primary is-loading">
          <span className="icon"><i className="fa fa-download" /></span>
          <span>Save articles</span>
        </button>);
    }

    return (
      <div className="column is-three-quarters">
        <div className="level">
          <div className="level-left">
            <h2 className="title is-2 is-spaced level-item">
              News from {sources[this.props.source]}
            </h2>
          </div>
          <div className="level-right field is-grouped">
            <div className="control">
              {saveButton}
            </div>
            <div className="control">
              {clearButton}
            </div>
          </div>
        </div>
        <p>
          {this.props.isSavingArticles &&
            <progress
              className="progress is-full-width is-primary"
              value={this.props.savedArticleCount} max="10"
            /> }
        </p>
        {articles}
      </div>
    );
  }
}
