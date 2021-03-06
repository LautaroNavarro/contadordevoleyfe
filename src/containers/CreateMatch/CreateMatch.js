import React, { Component } from 'react';
import './CreateMatch.css';
import GeneralContext from './../../components/Context/GeneralContext';
import axios from 'axios';
import './CreateMatch.css'
import TransparentPermanentModal from './../../components/Modal/TransparentPermanentModal';
import Spinner from './../../components/Spinner/Spinner';


class CreateMatch extends Component {

    static contextType = GeneralContext;

    state = {
        'loading': false,
        'sets_number': '5',
        'set_points_number': 25,
        'points_difference': 2,
        'tie_break_points': 15,
        'online_match': false,
        'teams': {
            'team_one': {
                'name': '',
                'color': '#ff0000',
            },
            'team_two': {
                'name': '',
                'color': '#0000ff',
            }
        }
    }

    validateForm = (e) => {
        if (this.state.teams.team_one.name !== "" && this.state.teams.team_two.name !== "") {
            return true;
        }
        return false;
    }

    async handleSubmit() {
        if (this.validateForm()){
            let stateCopy = {...this.state};
            stateCopy.sets_number = parseInt(stateCopy.sets_number)
            delete stateCopy.loading;
            delete stateCopy.online_match;
            if (this.state.online_match) {
                this.setState({'loading': true});
                let response;
                try {
                    response = await axios.post('/matches/', stateCopy);
                } catch (error) {
                    this.setState({'loading': false});
                    const {raiseAlert} = this.context;
                    raiseAlert('Ocurrio un error al crear el partido', 'DANGER');
                    return null
                }
                sessionStorage.setItem('token', response.data.match.token);
                const {setRedirect} = this.context;
                setRedirect(`/matches/${response.data.match.id}`);
            } else {
                let data = encodeURI(JSON.stringify(stateCopy));
                const {setRedirect} = this.context;
                setRedirect(`/local/match/?data=${data}`);
            }
        } else {
            const {raiseAlert} = this.context;
            raiseAlert('El nombre de los equipos es requerido', 'DANGER');
        }
    }

    handleChangeTeamOneName = (e) => {
        let stateCopy = {...this.state};
        stateCopy.teams.team_one.name = e.target.value;
        this.setState(stateCopy);
    }

    handleChangeTeamOneColor = (e) => {
        let stateCopy = {...this.state};
        stateCopy.teams.team_one.color = e.target.value;
        this.setState(stateCopy);
    }

    handleChangeTeamTwoName = (e) => {
        let stateCopy = {...this.state};
        stateCopy.teams.team_two.name = e.target.value;
        this.setState(stateCopy);
    }

    handleChangeTeamTwoColor = (e) => {
        let stateCopy = {...this.state};
        stateCopy.teams.team_two.color = e.target.value;
        this.setState(stateCopy);
    }

    handleChangeSetsNumberInput = (e) => {
        this.setState({'sets_number': e.target.value});
    }

    handleChangeSetPointsNumberInput = (e) => {
        this.setState({'set_points_number': parseInt(e.target.value)});
    }

    handleChangePointsDifferenceInput = (e) => {
        this.setState({'points_difference': parseInt(e.target.value)});
    }

    handleChangeTieBreakPointsInput = (e) => {
        this.setState({'tie_break_points': parseInt(e.target.value)});
    }

    handleChangeOnlineMatchInput = (e) => {
        this.setState({'online_match': e.target.checked});
    }

    render () {
        let modal = "";
        if (this.state.loading) {
            modal=(
                <TransparentPermanentModal>
                    <div className="text-center row"style={{"minHeight": "70vh"}}>
                        <div className="m-auto">
                            <Spinner />
                        </div>
                    </div>
                </TransparentPermanentModal>
            );
        }
        return (
            <div>
                <div className='text-center'>
                    {modal}
                    <h1 className='pt-3 pb-3 text-dark'>Crear nuevo partido</h1>
                        <form>
                            <div className='d-flex flex-row m-auto'>
                                <div className='flex-fill'>
                                    <div className='container pt-3'>
                                        <div className='form-group'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Equipo A'
                                                value={this.state.teams.team_one.name}
                                                onChange={ (e) => {this.handleChangeTeamOneName(e)} }
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='color'
                                                className='form-control'
                                                value={ this.state.teams.team_one.color }
                                                onChange={ (e) => {this.handleChangeTeamOneColor(e)} }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-fill'>
                                    <div className='container pt-3'>
                                        <div className='form-group'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Equipo B'
                                                value={this.state.teams.team_two.name}
                                                onChange={ (e) => {this.handleChangeTeamTwoName(e)} }
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='color'
                                                className='form-control'
                                                value={ this.state.teams.team_two.color }
                                                onChange={ (e) => {this.handleChangeTeamTwoColor(e)} }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='form-group container' >
                                  <label htmlFor='sets'>Al mejor de</label>
                                  <select className='form-control' value={ this.state.sets_number } onChange={ (e) => {this.handleChangeSetsNumberInput(e)} }>
                                    <option value='1'>1</option>
                                    <option value='3'>3</option>
                                    <option value='5'>5</option>
                                  </select>
                                </div>
                            </div>
                            <div>
                                <div className='form-group container'>
                                    <button className='btn-block btn btn-outline-secondary ' type='button' data-toggle='collapse' data-target=' #advancedOptions' aria-controls='advancedOptions' >Opciones avanzadas</button>
                                    <div className='collapse pt-3' id='advancedOptions'>
                                        <div className='form-group'>
                                            <label htmlFor='sets'>Puntos de set</label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                value={this.state.set_points_number}
                                                onChange={ (e) => {this.handleChangeSetPointsNumberInput(e)} }
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='sets'>Puntos de tie break</label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                value={this.state.tie_break_points}
                                                onChange={ (e) => {this.handleChangeTieBreakPointsInput(e)} }
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='sets'>Diferencia de dos puntos</label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                value={this.state.points_difference}
                                                onChange={ (e) => {this.handleChangePointsDifferenceInput(e)} }
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='sets'>Partido en linea</label>
                                            <input
                                                type='checkbox'
                                                className='form-control'
                                                checked={this.state.online_match}
                                                onChange={ (e) => {this.handleChangeOnlineMatchInput(e)} }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='container'>
                            <div
                                className='btn btn-block btn-dark mb-3 clickeable'
                                onClick={() => {this.handleSubmit()}}
                            >
                                Crear partido
                            </div>
                        </div>
                        </form>
                </div>
            </div>
        );
    }
}

export default CreateMatch;