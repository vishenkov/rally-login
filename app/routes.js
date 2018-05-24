/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
// import LayoutPage from './containers/LayoutPage';
// import Layout from './components/Layout';
import Defects from './components/Defects';
import UserStories from './components/UserStories';
import MainPage from './containers/MainPage';
import SignOutPage from './containers/SignOutPage';
import SettingsPage from './containers/SettingsPage';
// import DefectsPage from './containers/DefectsPage';
import CustomAppPage from './containers/CustomAppPage';


export default () => (
  <App>
    <Switch>
      <Route exact path="/main" component={MainPage} />
      <Route exact path="/defects" component={Defects} />
      <Route exact path="/userstories" component={UserStories} />
      <Route exact path="/settings" component={SettingsPage} />
      <Route exact path="/signout" component={SignOutPage} />
      <Route exact path="/custom" component={CustomAppPage} />
      <Route exact path="/:page" component={MainPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);
