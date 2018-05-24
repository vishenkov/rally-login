import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as actions from '../actions/api';

function mapStateToProps({
  isFetching, api, isLoggedIn, response
}) {
  return {
    isFetching,
    api,
    isLoggedIn,
    response,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
