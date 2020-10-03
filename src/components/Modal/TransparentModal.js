import React, {PureComponent} from 'react';
import './Modal.css';

class TransparentModal extends PureComponent {

    render () {
        return (
          <div className='customModal'>
              <span className='close' onClick={()=>this.props.handleClickClose()}>&times;</span>
              {this.props.children}
          </div>
        );
    }
}

export default TransparentModal;
