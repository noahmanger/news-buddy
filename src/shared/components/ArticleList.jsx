import React from 'react';
import Article from './Article.jsx';
import sources from '../sources.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let articles = 'Nothing to show';
    if (this.props.articles.length > 0) {
      articles = this.props.articles.map((article, index)=>{
        return <Article data={article} key={index} />
      })
    }

    return (
      <div className="column is-three-quarters">
        <h2 className="title is-2 is-spaced">News from {sources[this.props.source]}</h2>
        {articles}
      </div>
    )
  }
}
