import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import * as actions from '../actions/dataByArtifact';

function mapStateToProps({ isLoggedIn, api, dataByArtifact }) {
  return {
    isLoggedIn,
    // api,
    // dataByArtifact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
