import React from 'react';
import sources from '../sources.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const self = this;
    const items = Object.keys(sources).map((key, index) => {
      return <li key={index}>
        <a
          href={"?source=" + key}
          className={self.props.selected === key ? 'is-active' : ''}
          onClick={this.props.switchSource}
          data-source={key}>{sources[key]}
        </a>
      </li>
    })
    return (
      <aside className="menu column is-narrow">
        <h3 className="menu-label">Source</h3>
        <ul className="menu-list">
          {items}
        </ul>
      </aside>
    )
  }
}
