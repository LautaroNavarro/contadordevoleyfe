import React, {PureComponent} from 'react';
import './Spinner.css';

class Spinner extends PureComponent {

    render () {
        return (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        );
    }
}

export default Spinner;
