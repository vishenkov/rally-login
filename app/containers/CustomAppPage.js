import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomApp from '../components/CustomApp';
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomApp);
