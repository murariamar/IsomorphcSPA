import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dataLoader from '../browser/dataLoader';

const mapStateToProps = state => ({ repos: state });

@dataLoader('fetchPopularRepos')
class Grid extends Component {
  constructor(props) {
    super(props);
    // let repos;
    // if (__isBrowser__) {
    //   repos = window.__INITIAL_DATA__;
    //   delete window.__INITIAL_DATA__;
    // } else {
    //   repos = this.props.staticContext.data;
    // }
    //TODO: take this out as ths is going to be moved to central store
    this.state = {
      repos: props.repos,
      isLoading: !props.repos
    };
  }

  static propTypes = {
    repos: PropTypes.object
  };

  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    const language = this.props.match.params.id;
    if (language !== prevProps.match.params.id) {
      this.fetchRepos(language);
    }
  }

  fetchRepos = lang => {
    this.setState(() => ({ isLoading: true }));
    this.props.fetchInitialData(lang).then(repos => {
      this.setState(() => ({ repos, isLoading: false }));
    });
  };

  render() {
    const { isLoading, repos } = this.state;

    if (isLoading === true) {
      return <p>LOADING</p>;
    }

    console.log('repos.............', repos);
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
