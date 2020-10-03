import React, {PureComponent} from 'react';
import './Modal.css';

class TransparentPermanentModal extends PureComponent {

    render () {
        return (
          <div className='customModal rounded-lg'>
              {this.props.children}
          </div>
        );
    }
}

export default TransparentPermanentModal;