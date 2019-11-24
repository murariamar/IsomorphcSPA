import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchResource } from '../actions/resourceActions';

const mapDispatchToProps = dispatch => ({
  dataFetch: (resource, args) => dispatch(fetchResource(resource, args))
});

const dataLoader = resource => {
  return WrappedComponent => {
    @connect(
      null,
      mapDispatchToProps
    )
    class Datafetcher extends Component {
      componentDidMount() {
        const {
          dataFetch,
          match: { params }
        } = this.props;
        dataFetch(resource, params);
      }

      componentDidUpdate(prevProps) {
        const {
          dataFetch,
          match: { params }
        } = this.props;
        const { language } = params;
        if (language !== prevProps.match.params.language) {
          dataFetch(resource, params);
        }
      }

      static prototypes = {
        dataFetch: PropTypes.func.isRequired,
        match: PropTypes.shape({
          params: PropTypes.shape({
            language: PropTypes.string.isRequired
          }).isRequired
        }).isRequired
      };

      render() {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <WrappedComponent {...this.props} />;
      }
    }
    return Datafetcher;
  };
};

export default dataLoader;
