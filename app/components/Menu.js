import React from 'react';
// import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import InboxIcon from 'material-ui-icons/MoveToInbox';
// import DraftsIcon from 'material-ui-icons/Drafts';
// import StarIcon from 'material-ui-icons/Star';
// import SendIcon from 'material-ui-icons/Send';
// import MailIcon from 'material-ui-icons/Mail';
// import DeleteIcon from 'material-ui-icons/Delete';
// import ReportIcon from 'material-ui-icons/Report';
import SettingsIcon from 'material-ui-icons/Settings';
import BugIcon from 'material-ui-icons/BugReport';
import HomeIcon from 'material-ui-icons/Home';
import AssignmentIcon from 'material-ui-icons/Assignment';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import WidgetIcon from 'material-ui-icons/Widgets';
import SignOutIcon from 'material-ui-icons/ExitToApp';
import ListItemLink from './ListItemLink';

export const mainMenu = (
  <div>
    <ListItemLink to="/main" primary="Main" icon={<HomeIcon />} />
    {/* <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Main" />
    </ListItem> */}
    <ListItemLink to="/defects" primary="Defects" icon={<BugIcon />} />
    {/* <ListItem button>
      <ListItemIcon>
        <BugIcon />
      </ListItemIcon>
      <ListItemText primary="Defects" />
    </ListItem> */}
    {/* <ListItemLink to="/tasks" primary="Tasks" icon={<AssignmentIcon />} /> */}
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItem> */}
    <ListItemLink to="/userstories" primary="User Stories" icon={<LibraryBooksIcon />} />
    {/* <ListItemLink to="/custom" primary="Custom App" icon={<WidgetIcon />} /> */}
    {/* <ListItem button>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="User Stories" />
    </ListItem> */}
  </div>
);

export const otherMenu = (
  <div>
    <ListItemLink to="/settings" primary="Settings" icon={<SettingsIcon />} />
    <ListItemLink to="/signout" primary="Sign Out" icon={<SignOutIcon />} />
    {/* <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem> */}
    {/* <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem> */}
  </div>
);
