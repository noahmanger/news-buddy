import React from 'react';
import sources from '../sources.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate(rawDate) {
    const date = new Date(rawDate);
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }

  render() {
    return (
      <article className="column is-half is-offset-one-quarter">
        <button className="delete is-small is-pulled-right" onClick={this.props.closeArticle}></button>
        <p><span className="tag">{sources[this.props.source]}</span></p>
        <h2 className="title is-2">
            {this.props.title}
        </h2>
        <p className="subtitle">By {this.props.author} | Published on {this.formatDate(this.props.date)}</p>
        <div className="content" dangerouslySetInnerHTML={{__html: this.props.content.replace(/(?:\r\n|\r|\n)/g, '<br />')}}></div>
      </article>
    )
  }
}
