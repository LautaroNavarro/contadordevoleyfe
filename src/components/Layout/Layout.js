import React, { Component } from 'react';
import './Layout.css';
import { Link, Redirect } from 'react-router-dom';
import GeneralContext from './../Context/GeneralContext';
import Alert from './../../components/Alert/Alert';


class Layout extends Component {

    defaultAlertStatus = {
        alert: {
            message: '',
            messageType: '',
            display: false,
        }
    }

    state = {
        redirect: false,
        redirectUrl: '/',
        ...this.defaultAlertStatus,
    }

    handleCloseAlert = () => {
        this.setState({
            ...this.defaultAlertStatus,
        });
    }

    handleRaiseAlert = (message, messageType) => {
        this.setState({
            alert: {
              message,
              messageType,
              display: true,
            }
        });
    }

    setRedirect = (redirectUrl) => {
      this.setState({
        redirectUrl,
        redirect: true,
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirectUrl} />
      }
    }

    render () {
        return (
            <GeneralContext.Provider value={
                {
                    raiseAlert: this.handleRaiseAlert,
                    setRedirect: this.setRedirect,
                }
            }>
            { this.renderRedirect() }
            <div>
                <nav className='navbar navbar-light bg-light'>
                  <Link className='navbar-brand' to='/'>
                    <img alt="volleyball icon" src='/favicon.png' width='30' height='30' className='d-inline-block align-top mr-2' />
                    <span className="text-dark"> Contador de voley</span>
                  </Link>
                </nav>
                <div className='container mainContainer'>
                    <Alert
                        message={this.state.alert.message}
                        display={this.state.alert.display}
                        messageType={this.state.alert.messageType}
                        handleCloseAlert={() => {this.handleCloseAlert()}}
                    />
                    {this.props.children}
                </div>
                <footer className='bg-light mt-2'>
                    <div className='footer-copyright text-center py-3 text-dark'>© 2020 Copyright: <a href='https://contadordevoley.com/'>contadordevoley.com</a>
                    </div>
                </footer>
            </div>
            </GeneralContext.Provider>
        );
    }
}

export default Layout;