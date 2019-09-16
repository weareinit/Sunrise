import React from 'reactn';
import Modal from './Modal'
import axios from 'axios'
import { getWave, ENDPOINTS } from '../utils'
import { store } from 'react-notifications-component'

export const modalTypes = {
    LANDING: 'landing-modal',
    USER_INFO: 'user-info-modal',
    EVENT_CHECKIN: 'event-checkin-modal',

};

class ModalRoot extends React.Component {

    constructor(){
        super()
        this.checkInUser = this.checkInUser.bind(this)
    }

    checkInUser(shellID) {
        const { authToken } = this.global
        axios.put(ENDPOINTS.CHECK_IN, {
            shellID 
        }, 
        {
            headers: {
                Authorization: `Bearer ${authToken.token}`
            }
        }).then(res => {
            store.addNotification({
                title: "Checked In",
                message: "Successfully checked in hacker!",
                type: "success",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            this.setGlobal({ codeScanned: false, currentModal: modalTypes.LANDING })
        }).catch(err => {
            store.addNotification({
                title: "Error",
                message: `Check In Failed: ${err}`,
                type: "danger",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        })
    }

    selectModal(modalType) {

        let resultModal = null;
        let actions;
        const { shellID, user } = this.global;
        switch (modalType) {
            case modalTypes.LANDING:
                actions = [
                    {
                        name: "Event Check-In",
                        action: () => this.setGlobal({ currentModal: modalTypes.EVENT_CHECKIN })
                    }
                ]
                resultModal = (
                    <Modal actions={actions}>
                        <h1>Welcome to ShellHacks!</h1>
                        <p>Scan ShellID™ to start...</p>
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
                        action: () => this.checkInUser(shellID)
                    }
                ]
                resultModal = (
                    <Modal actions={actions}>
                        <h1>User Info</h1>
                        <h2>Wave {getWave(user.avatarID)}</h2>
                        <h2>First Name</h2>
                        <p>{user.firstName}</p>
                        <h2>Last Name</h2>
                        <p>{user.lastName}</p>
                        <h2>School</h2>
                        <p>{user.schoolName}</p>
                        <h2>Date of Birth</h2>
                        <p>{user.dob}</p>
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
