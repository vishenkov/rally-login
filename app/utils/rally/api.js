// import getError from './errors';
import rally from 'rally';
import staticFields from '../static/fields';
import filters from './filters';

const queryUtils = rally.util.query;

export default (restApi) => ({
  ...filters(restApi),
  async checkAuth() {
    try {
      await restApi.query({
        type: 'defect',
        start: 1,
        pageSize: 1,
        limit: 1,
        fetch: ['FormattedID', 'Name'],
      });
      return true;
    } catch (err) {
      console.error(err);
      const msg = err.message.indexOf('<html>') > 0
        ? 'The username or password you entered is incorrect.'
        : err.message;
      throw new Error(msg);
    }
  },

  async defects(meta) {
    console.log('got defect meta:', meta);
    const { currentPage = 1, limit = 25, fields = [] } = meta;
    const fetch = fields.map(({ name }) => name);
    // console.log('fetch', fetch);
    let query;
    if (meta.filters.length) {
      const [first, ...rest] = meta.filters;
      const getPath = (field) => (field.queryPath
        ? field.queryPath
        : field.path);
      const firstQuery = queryUtils
        .where(getPath(staticFields[first.field]), first.operator, first.value);
      query = rest.reduce((acc, { field, operator, value }) =>
        acc.and(getPath(staticFields[field]), operator, value), firstQuery);
    }

    let order;
    if (meta['sort']) {
      order = `${fetch[meta.sort.index]} ${meta.sort.direction}`;
    }
    console.log('query', query, 'order', order, 'fetch', fetch);

    try {
      const res = await restApi.query({
        type: 'defect',
        start: (currentPage * limit) + 1,
        pageSize: limit,
        limit,
        fetch,
        // fetch: ['FormattedID', 'Name', 'Project', 'State', 'ScheduleState', 'Description', 'Owner'],
        query,
        order,
      });

      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async userstories(meta) {
    console.log('got defect meta:', meta);
    const { currentPage = 1, limit = 25, fields = [] } = meta;
    const fetch = fields.map(({ name }) => name);
    // console.log('fetch', fetch);
    let query;
    if (meta.filters.length) {
      const [first, ...rest] = meta.filters;
      const getPath = (field) => (field.queryPath
        ? field.queryPath
        : field.path);
      const firstQuery = queryUtils
        .where(getPath(staticFields[first.field]), first.operator, first.value);
      query = rest.reduce((acc, { field, operator, value }) =>
        acc.and(getPath(staticFields[field]), operator, value), firstQuery);
    }

    let order;
    if (meta['sort']) {
      order = `${fetch[meta.sort.index]} ${meta.sort.direction}`;
    }
    console.log('query', query, 'order', order, 'fetch', fetch);

    try {
      const res = await restApi.query({
        type: 'hierarchicalrequirement',
        start: (currentPage * limit) + 1,
        pageSize: limit,
        limit,
        fetch,
        // fetch: ['FormattedID', 'Name', 'Project', 'State', 'ScheduleState', 'Description', 'Owner'],
        query,
        order,
      });

      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
});
