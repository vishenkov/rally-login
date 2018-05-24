import _ from 'lodash';

export default fields => ({
  fields,
  getFields() {
    return Object.keys(this.fields);
  },

  getValue(name, row) {
    return _.get(row, this.fields[name].path, null);
  },

  getDisplayName(name) {
    return this.fields[name].displayName;
  },

  getQueryPath(name) {
    return this.fields[name].queryPath
      ? this.fields[name].queryPath
      : this.fields[name].path;
  },

  getFilterOperators(name) {
    return this.fields[name].filter.operators;
  },

  getFilterValues(name) {
    return this.fields[name].filter.values;
  },
});
