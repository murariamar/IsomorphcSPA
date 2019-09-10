import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResource } from '../actions/resourceActions';

const mapDispatchToProps = dispatch => ({
  fetchResource: resource => dispatch(fetchResource(resource))
});

const dataLoader = (WrappedComponent, resource) => {
  // @connect(
  //   null,
  //   mapDispatchToProps
  // )
  class Datafetcher extends Component {
    componentDidMount() {
      this.props.fetchResource(resource);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return connect(
    null,
    mapDispatchToProps
  )(Datafetcher);
};

export default resource => target => dataLoader(target, resource);
