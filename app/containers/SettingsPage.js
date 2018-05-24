import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import * as actions from '../actions/dataByArtifact';

function mapStateToProps({
  api, isLoggedIn, dataByArtifact
}) {
  return {
    api,
    isLoggedIn,
    dataByArtifact,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
