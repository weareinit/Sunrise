import React from 'reactn';

class Modal extends React.Component{
    render(){
        const { codeScanned, data } = this.global;
        return (
            <div className="modal">
                <h1>Hello Worlds!</h1>
                <p>{ codeScanned.toString() }</p>
                <p>{ data }</p>
            </div>
        )
    }
}

export default Modal;