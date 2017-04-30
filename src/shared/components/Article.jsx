import React from 'react';

export default class App extends React.Component {
  formatDate() {
    const date = new Date(this.props.data.publishedAt);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  render() {
    return (
      <article className="box media">
        <div className="media-left image is-64x64">
          <img alt="Preview" src={this.props.data.urlToImage} />
        </div>
        <div className="media-content">
          <h3 className="title is-4">
            <a href={this.props.data.url}>
              {this.props.data.title}
            </a>
          </h3>
          <p className="content">Published: {this.formatDate()}</p>
          <p className="content">{this.props.data.description}</p>
          {
            this.props.isSaved &&
            <button
              className="button is-small is-secondary"
              onClick={this.props.readArticle}
              data-url={this.props.data.url}
            >
              Read offline
            </button>
          }
        </div>
      </article>
    );
  }
}
