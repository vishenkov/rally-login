import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignOut from '../components/SignOut';
import * as actions from '../actions/api';

function mapStateToProps({ api, isLoggedIn }) {
  return {
    api,
    isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
