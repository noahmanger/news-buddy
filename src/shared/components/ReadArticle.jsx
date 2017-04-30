import React from 'react';
import sources from '../sources';

export default class App extends React.Component {
  formatDate() {
    const date = new Date(this.props.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  render() {
    return (
      <article className="column is-half is-offset-one-quarter">
        <button className="delete is-small is-pulled-right" onClick={this.props.closeArticle} />
        <p><span className="tag">{sources[this.props.source]}</span></p>
        <h2 className="title is-2">
          {this.props.title}
        </h2>
        <p className="subtitle">By {this.props.author} | Published on {this.formatDate()}</p>
        <div className="content" dangerouslySetInnerHTML={{ __html: this.props.content.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
      </article>
    );
  }
}
