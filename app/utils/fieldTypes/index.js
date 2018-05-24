import {
  FormattedID,
  Name,
  Project,
  Owner,
  ScheduleState,
  State,
  Description,
  Requirement,
  Severity,
  SubmittedBy,
  Priority,
  Iteration,
  Release
} from '../static/fields';
import fieldTypes from './fieldTypes';

const artifactTypes = {
  defects: {
    FormattedID,
    Name,
    Project,
    Owner,
    ScheduleState,
    State,
    Description,
    Requirement,
    Severity,
    SubmittedBy,
    Priority,
  },
  userstories: {
    FormattedID,
    Name,
    Project,
    Owner,
    ScheduleState,
    Description,
    Requirement,
    Severity,
    SubmittedBy,
    Priority,
    Iteration,
    Release,
  }
};

export default artifact => fieldTypes(artifactTypes[artifact]);
