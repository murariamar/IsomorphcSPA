import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResource } from '../actions/resourceActions';

const mapDispatchToProps = dispatch => ({
  fetchResource: (resource, args) => dispatch(fetchResource(resource, args))
});

const dataLoader = resource => {
  return WrappedComponent => {
    @connect(
      null,
      mapDispatchToProps
    )
    class Datafetcher extends Component {
      constructor(props) {
        super(props);
      }
      componentDidMount() {
        this.props.fetchResource(resource, this.props.match.params);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    // return connect(
    //   null,
    //   mapDispatchToProps
    // )(Datafetcher);
    return Datafetcher;
  };
};

export default dataLoader;
