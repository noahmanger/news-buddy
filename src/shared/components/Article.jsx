import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate(rawDate) {
    const date = new Date(rawDate);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }

  render() {
    return (
      <article className="box media">
        <div className="media-left image is-64x64">
          <img src={this.props.data.urlToImage} />
        </div>
        <div className="media-content">
          <h3 className="title is-4">
            <a href={this.props.data.url}>
              {this.props.data.title}
            </a>
          </h3>
          <p className="subtitle is-6">Published: {this.formatDate(this.props.data.publishedAt)}</p>
          <p className="content">{this.props.data.description}</p>
        </div>
      </article>
    )
  }
}
