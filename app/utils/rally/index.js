import rally from 'rally';
import api from './api';

// const queryUtils = rally.util.query;

export default (user, pass) => {
  const restApi = rally({
    user,
    pass,
    apiVersion: 'v2.0',
    server: 'https://rally1.rallydev.com',
    requestOptions: {
      headers: {
        'X-RallyIntegrationName': 'My cool node.js program',
        'X-RallyIntegrationVendor': 'My company',
        'X-RallyIntegrationVersion': '1.0'
      }
    }
  });

  return api(restApi);

  // return restApi.query({
  //   type: 'defect',
  //   start: 1,
  //   pageSize: 200,
  //   limit: 10,
  //   order: 'Rank', // how to sort the results
  //   fetch: ['FormattedID', 'Name', 'ScheduleState', 'Project', 'Children', 'Description', 'Workspace', 'State', 'Owner'],
  //   // query: queryUtils.where('DirectChildrenCount', '>', 0),
  // });
};
