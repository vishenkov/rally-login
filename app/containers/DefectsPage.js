import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Defects from '../components/Defects';
import * as actions from '../actions/dataByArtifact';

function mapStateToProps({ api, dataByArtifact }) {
  return {
    api,
    dataByArtifact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Defects);
