import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dataLoader from '../browser/dataLoader';

const mapStateToProps = ({ repos, isLoading }) => {
  return { isLoading, repos };
};

@dataLoader(['fetchPopularRepos'])
class Grid extends Component {
  static propTypes = {
    repos: PropTypes.object
  };

  render() {
    const { isLoading, repos } = this.props;

    if (isLoading === true || !repos || !repos.map) {
      return <p>LOADING</p>;
    }

    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{ margin: 30 }}>
            <ul>
              <li>
                <a href={html_url}>{name}</a>
              </li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(mapStateToProps)(Grid);
