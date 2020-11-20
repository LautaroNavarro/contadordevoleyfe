import React, { Component } from 'react';
import './MatchControlView.css';
import GeneralContext from './../../components/Context/GeneralContext';
import axios from 'axios';
import PermanentModal from './../../components/Modal/PermanentModal';
import MatchSummary from './../../components/MatchSummary/MatchSummary';
import TransparentPermanentModal from './../../components/Modal/TransparentPermanentModal';
import Spinner from './../../components/Spinner/Spinner';
import EmptyState from './../../components/EmptyState/EmptyState';
import socketIOClient from "socket.io-client";


class MatchControlView extends Component {

    static contextType = GeneralContext;

    state = {
        'disabled_buttons': false,
        'loading': true,
        'id': null,
        'sets_number': 5,
        'status': null,
        'set_points_number': null,
        'points_difference': null,
        'tie_break_points': null,
        'sets': [],
        'teams': {
            'team_one': {
                'name': '',
                'color': '#ff0000',
            },
            'team_two': {
                'name': '',
                'color': '#0000ff',
            }
        },
        'winner_team': null,
    }

    async callEvent(action) {
        if (this.state.game_status !== 'FINISHED' && !this.state.disabled_buttons) {
            this.setState({disabled_buttons: true});
            this.socket.emit('update', {
                'id': this.props.match.params.id,
                'token': sessionStorage.getItem('token'),
                'action': action,
            });
        }
    }

    async subscribeMatch (socket) {
        socket.emit('watch', {'match_id': this.props.match.params.id});
        socket.on(
            'match_update',
            (data) => {
                ((that) => {
                    console.log('Data recibida: ' + data.id);
                    that.setState({loading: false, disabled_buttons: false});
                    that.setState(data);
                })(this);
            }
        );
    }

    componentDidMount () {
        let socket = socketIOClient('http://e50297f42ee6.ngrok.io');
        this.socket = socket;
        if (!sessionStorage.getItem('token')) {
            const {setRedirect} = this.context;
            setRedirect('/');
        } else {
            this.subscribeMatch(socket);
        }
    }

    getCurrentSet() {
        return this.state.sets[this.state.sets.length - 1];
    }

    getRenderedSets (team) {
        let renderedWon = this.state.teams[team].sets;
        let renderedWonCount = 0;

        let render = [];
        for (let i = 0; i < Math.floor(((this.state.sets_number / 2) + 1)); i++) {
            if (renderedWonCount < renderedWon) {
                render.push(
                    <div className='flex pr-1' key={`${team}-${i}`}>
                        <div className='rounded-circle bg-dark border border-dark circles'></div>
                    </div>
                );
            } else {
                render.push(
                    <div className='flex pr-1' key={`${team}-${i}`}>
                        <div className='rounded-circle border border-dark circles'></div>
                    </div>
                );
            }
            renderedWonCount += 1;
        }
        return render;
    }

    render (){
        let modal = '';
        if (this.state.loading) {
            modal=(
                <TransparentPermanentModal>
                    <div className='text-center row'style={{'minHeight': '70vh'}}>
                        <div className='m-auto'>
                            <Spinner />
                        </div>
                    </div>
                </TransparentPermanentModal>
            );
        }
        return (
            <div>
                {
                    this.state.winner_team ? <PermanentModal>
                                                <MatchSummary
                                                    match={this.state}
                                                />
                                            </PermanentModal> : ''
                }
                {modal}
                {this.state.id ?
                <div className='text-center'>
                    <h2 className='pt-3 text-dark'>{`${this.state.teams.team_one.name} VS ${this.state.teams.team_two.name}`}</h2>
                    <h5 className='text-dark'>
                        {`CÓDIGO: ${this.state.id}`}
                        <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24' className='clickeable'>
                            <path d='M0 0h24v24H0V0z' fill='none'/>
                            <path d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'/>
                        </svg>
                    </h5>


                    <div className='d-flex flex-row m-auto'>
                        <div className='container'>
                            <div className='d-flex flex-row pb-1'>
                                {
                                    this.getRenderedSets('team_one')
                                }
                            </div>
                            <div className='flex-fill rounded' style={ {'backgroundColor': this.state.teams.team_one.color } }>
                                    <h1 className='mainTeamNumber'>{this.state.sets.length !== 0 && this.getCurrentSet() !== undefined ? this.getCurrentSet().team_one : 0}</h1>
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='flex-fill pr-1'>
                                    <div
                                        className={this.state.disabled_buttons ? 'btn btn-block btn-secondary clickeable disabled' : 'btn btn-block btn-secondary clickeable'}
                                        onClick={ () => {this.callEvent('substract_team_one')}}
                                    >-</div>
                                </div>
                                <div className='flex-fill pl-1'>
                                    <div
                                        className={this.state.disabled_buttons ? 'btn btn-block btn-dark clickeable disabled' : 'btn btn-block btn-dark clickeable'}
                                        onClick={ () => {this.callEvent('add_team_one')}}
                                    >+</div>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='d-flex flex-row pb-1'>
                                {
                                    this.getRenderedSets('team_two')
                                }
                            </div>
                            <div className='flex-fill rounded' style={ {'backgroundColor': this.state.teams.team_two.color } }>
                                    <h1 className='mainTeamNumber'>{this.state.sets.length !== 0 && this.getCurrentSet() !== undefined ? this.getCurrentSet().team_two : 0}</h1>
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='flex-fill pr-1'>
                                    <div
                                        className={this.state.disabled_buttons ? 'btn btn-block btn-secondary clickeable disabled' : 'btn btn-block btn-secondary clickeable'}
                                        onClick={ () => {this.callEvent('substract_team_two')}}
                                    >-</div>
                                </div>
                                <div className='flex-fill pl-1'>
                                    <div
                                        className={this.state.disabled_buttons ? 'btn btn-block btn-dark clickeable disabled' : 'btn btn-block btn-dark clickeable'}
                                        onClick={ () => {this.callEvent('add_team_two')}}
                                    >+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : ''}
            {!this.state.id && !this.state.loading ? <EmptyState/> : ''}
            </div>
        );
    }
}

export default MatchControlView;