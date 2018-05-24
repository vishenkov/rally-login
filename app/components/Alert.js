import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';


class Alert extends React.Component {
  state = {
    open: true,
  };

  componentWillReceiveProps() {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
        autoHideDuration={3000}
        action={
          <Button color="secondary" size="small" onClick={this.handleClose}>
            Close
          </Button>}
      />
    );
  }
}

export default Alert;
