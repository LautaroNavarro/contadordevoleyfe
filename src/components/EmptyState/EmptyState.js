import React, { Component } from 'react';
import GeneralContext from './../../components/Context/GeneralContext';
import './EmptyState.css';


class EmptyState extends Component {

    static contextType = GeneralContext;

    render () {
        const {setRedirect} = this.context;
        return (
            <div>
                <div className="text-center row align-middle emptyStateContainer pt-5">
                    <div className="col-12 m-auto">
                        <div className="row">
                            <div className="col-12 m-auto">
                                <img className="emptyState m-auto" alt="Empty state" src='/emptystate.png'/>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-12 text-center">
                                <h2 className="emptyStateFontColor">No pudimos encontrar el partido que buscas</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 m-auto">
                                <a href="/#" onClick={() => {setRedirect('/')}}>Ingresa otro codigo</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmptyState;
