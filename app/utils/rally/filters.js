import rally from 'rally';

const queryUtils = rally.util.query;


export default restApi => async (filter, value) => {
  try {
    const res = await restApi.query({
      type: filter.type,
      start: 1,
      limit: Infinity,
      fetch: ['FormattedID', 'Name'],
      query: queryUtils.where('Name', 'contains', value),
    });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
