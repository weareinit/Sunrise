import React from 'reactn';
import Modal from './Modal'

export const modalTypes = {
    LANDING: 'landing-modal',
    USER_INFO: 'userinfo-modal',
    APP_SETTINGS: 'appsettings-modal',

};

class ModalRoot extends React.Component {

    checkInUser() {
        console.log("testing check in")
    }

    selectModal(modalType) {

        let resultModal = null;
        let actions;
        const { codeScanned, shellID, user } = this.global;
        switch (modalType) {
            case modalTypes.LANDING:
                actions = [
                    {
                        name: "User Info",
                        action: () => this.setGlobal({ currentModal: modalTypes.USER_INFO })
                    }
                ]
                resultModal = (
                    <Modal >
                        <h1>Welcome to ShellHacks!</h1>
                        <p>Scan ShellID™ to start...</p>
                        <p>{codeScanned.toString()} {shellID}</p>
                    </Modal>
                );
                break;
            case modalTypes.USER_INFO:
                actions = [
                    {
                        name: "Cancel",
                        action: () => this.setGlobal({ currentModal: modalTypes.LANDING })
                    },
                    {
                        name: "Check In",
                        action: this.checkInUser
                    }
                ]
                resultModal = (
                    <Modal actions={actions}>
                        <h1>User Info</h1>
                        <ul>
                            <li>
                                firstName: {user.firstName}
                            </li>
                            <li>
                                lastName: {user.lastName}
                            </li>
                            <li>
                                schoolName: {user.schoolName}
                            </li>
                            <li>
                                dob: {user.dob}
                            </li>
                            <li>
                                avatarID: {user.avatarID}
                            </li>
                        </ul>
                    </Modal>
                );
                break;
            default:
                resultModal = (<Modal></Modal>);
                break;
        }
        return resultModal;
    }

    render() {
        return (this.selectModal(this.props.activeModal))
    }
}

export default ModalRoot;
