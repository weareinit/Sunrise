import React from 'reactn';
import Modal from './Modal'

export const modalTypes = {
    LANDING: 'landing-modal',
    USER_INFO: 'userinfo-modal',
};

class ModalRoot extends React.Component{

    selectModal(modalType){
        
        let resultModal = null;
        let actions;
        switch(modalType){
            case modalTypes.LANDING:
                const { codeScanned, shellID } = this.global;
                actions = [
                    {
                        name: "User Info",
                        action: () => this.setGlobal({currentModal: modalTypes.USER_INFO})
                    }
                ]
                resultModal = (
                    <Modal actions={actions}>
                        <h1>Hello Worlds!</h1>
                        <p>{ codeScanned.toString() }</p>
                        <p>{ shellID }</p>
                    </Modal>
                );    
            break;
            case modalTypes.USER_INFO:
                actions = [
                    {
                        name: "Cancel",
                        action: () => this.setGlobal({currentModal: modalTypes.LANDING})
                    }
                ]
                resultModal = (
                    <Modal actions={actions}>
                        <h1>User Info</h1>
                    </Modal>
                );
            break;
            default:
                resultModal = (<Modal></Modal>);
            break;
        }
        return resultModal;
    }

    render(){
        return (this.selectModal(this.props.activeModal))
    }
}

export default ModalRoot;
