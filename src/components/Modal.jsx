import React from 'reactn';

class Modal extends React.Component{
    render(){
        return (
            <div className="modal">
                <h1>Hello Worlds!</h1>
                <p>{ this.global.codeScanned.toString() }</p>
                <p>{ this.global.data }</p>
            </div>
        )
    }
}

export default Modal;