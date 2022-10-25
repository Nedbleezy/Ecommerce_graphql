import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithRouter from '../../utils/WithRouter';

class Overlay extends Component {
  render() {
    return <div>Overlay</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ReduxStore: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (data) => dispatch(),
  };
};

const overlay = WithRouter(Overlay);

export default connect(mapStateToProps, mapDispatchToProps)(overlay);
