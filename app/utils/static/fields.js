const strictFilters = ['=', '!='];
const commonFilters = [...strictFilters, '>', '<', '>=', '<='];
const stringFilters = ['contains', '!contains'];
const fields = {
  FormattedID: {
    displayName: 'ID',
    path: 'FormattedID',
    filter: {
      operators: commonFilters,
      values: null,
    },
  },
  Name: {
    displayName: 'Name',
    path: 'Name',
    filter: {
      operators: [...strictFilters, ...stringFilters],
      values: null,
    },
  },
  Project: {
    displayName: 'Project',
    path: 'Project.Name',
    filter: {
      operators: strictFilters,
      values: null,
    },
  },
  Owner: {
    displayName: 'Owner',
    path: 'Owner._refObjectName',
    queryPath: 'Owner.Name',
    filter: {
      operators: [...strictFilters, ...stringFilters],
      values: null,
      type: 'User',
    },
  },
  ScheduleState: {
    displayName: 'Schedule',
    path: 'ScheduleState',
    filter: {
      operators: strictFilters,
      values: ['Defined', 'In-Progress', 'Completed', 'Accepted'],
    },
  },
  State: {
    displayName: 'State',
    path: 'State',
    filter: {
      operators: strictFilters,
      values: ['Submitted', 'Open', 'Fixed', 'Close'],
    },
  },
  Description: {
    displayName: 'Description',
    path: 'Description',
    filter: {
      operators: stringFilters,
      values: null,
    },
  },
  Requirement: {
    displayName: 'Requirement',
    path: 'Requirement.Name',
    filter: {
      operators: stringFilters,
      values: null,
    },
  },
  Severity: {
    displayName: 'Severity',
    path: 'Severity',
    filter: {
      operators: strictFilters,
      values: ['', 'Crash/Data Loss', 'Major Problem', 'Minor Problem', 'Cosmetic'],
    },
  },
  SubmittedBy: {
    displayName: 'Submitted By',
    path: 'SubmittedBy._refObjectName',
    queryPath: 'SubmittedBy.Name',
    filter: {
      operators: [...strictFilters, ...stringFilters],
      values: null,
    },
  },
  Priority: {
    displayName: 'Priority',
    path: 'Priority',
    filter: {
      operators: strictFilters,
      values: ['', 'Resolve Immediately', 'High Attention', 'Normal', 'Low'],
    },
  },
  Iteration: {
    displayName: 'Iteration',
    path: 'Iteration',
    filter: {
      operators: strictFilters,
      values: null,
    },
  },
  Release: {
    displayName: 'Release',
    path: 'Release',
    filter: {
      operators: [...strictFilters, ...stringFilters],
      values: null,
    },
  },
};

export default fields;
