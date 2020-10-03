import React from 'react';
import classes from './Alert.module.css';

export const ALERT_TYPES = {
  WARNING: 'alert-warning',
  PRIMARY: 'alert-primary',
  SECONDARY: 'alert-secondary',
  SUCCESS: 'alert-success',
  DANGER: 'alert-danger',
  INFO: 'alert-info',
  LIGHT: 'alert-light',
  DARK: 'alert-dark',
}


const Alert = (props) => {

    return (
      <div className={classes.alertContainer}>
        <div className={`alert ${ALERT_TYPES[props.messageType]} alert-dismissible fade ${props.display ? 'show' : 'd-none'} ${classes.alert}`} role="alert">
          {props.message}
          <button type="button" className="close m-auto" aria-label="Close" onClick={props.handleCloseAlert}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
}

export default Alert;
