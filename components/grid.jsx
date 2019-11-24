/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dataLoader from '../browser/dataLoader';

const mapStateToProps = ({ repos, isLoading }) => {
  return { isLoading, repos };
};

@dataLoader(['fetchPopularRepos'])
class Grid extends Component {
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

Grid.defaultProps = {
  repos: []
};

Grid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  repos: PropTypes.shape({
    name: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired,
    stargazers_count: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired
  })
};

export default connect(mapStateToProps)(Grid);
