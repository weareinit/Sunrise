import React from 'reactn';
import QrReader from 'react-qr-reader'
import axios from 'axios';
import { modalTypes } from './ModalRoot';
import { store } from 'react-notifications-component';
import { ENDPOINTS } from '../utils';

class QR extends React.Component {
    constructor(){
        super()
        this.resetScanner = this.resetScanner.bind(this)
        this.hackerCheckIn = this.hackerCheckIn.bind(this)
        this.generalCheckIn = this.generalCheckIn.bind(this)
    }

    resetScanner(){
        setTimeout(() => {
            this.setGlobal({ codeScanned: false })
        }, 1000)
    }

    hackerCheckIn = () => {
        const { shellID, authToken } = this.global;
        if (!authToken) {
            store.addNotification({
                title: "Error",
                message: "Please authenticate before scanning IDs",
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
            this.resetScanner();
            return;
            // throw new Error("Not Authenticated");
        }

        axios.post(ENDPOINTS.HACKER_DATA,
            { shellID },
            {
                headers: {
                    Authorization: `Bearer ${authToken.token}`
                }
            })
            .then((res) => {
                const { data } = res.data;

                if (data.checkIn) {
                    store.addNotification({
                        title: "Check In Error",
                        message: "User is already checked in",
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
                    throw new Error("User is already checked in.")
                } else if (data.applicationStatus !== "confirmed") {
                    store.addNotification({
                        title: "Check In Error",
                        message: `User is not confirmed! Status is: ${data.applicationStatus}`,
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
                    throw new Error("User is not confirmed.")
                }

                this.setGlobal({ user: data, currentModal: modalTypes.USER_INFO })
            })
            .catch((e) => {
                console.log(e);
                this.resetScanner();
            })
    }

    generalCheckIn = () => {
        if(this.global.currentEventID == ""){
            store.addNotification({
                title: "Error",
                message: `Select an event!`,
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
            this.resetScanner();
        } else {
            const { shellID, currentEventID: eventID, authToken } = this.global;
            axios.put(ENDPOINTS.EVENT_CHECK_IN, {
                shellID,
                eventID
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken.token}`
                }
            })
            .then(res => {
                store.addNotification({
                    message: `Successfully checked in ShellID: ${shellID}!`,
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
            })
            .catch((err) => {
                let info = err.response.data.error || err;
                store.addNotification({
                    title: "Error from Server",
                    message: `${info}`,
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
            .finally(this.resetScanner)
        }
    }

    handleScan = data => {

        /* We shouldn't read QR codes while the user is in the process of
        checking people in/redeeming items
         */
        if (data != null && !this.global.codeScanned) {
            this.setGlobal({ codeScanned: true })

            // The auth QR code is Base64 encoded, which is how we know 
            // it's the auth QR code
            let isBase64 = false;
            let authJson;
            try {
                authJson = JSON.parse(atob(data));

                isBase64 = true;
            } catch (e) {
                console.log(e);
            }

            //Store the auth token in the state and localStorage
            if (isBase64) {
                try {
                    if (typeof authJson.password == "undefined")
                        throw new Error("Auth json is incorrect.");

                    store.addNotification({
                        title: "Authenticating...",
                        message: "Authenticating with API",
                        type: "info",
                        insert: "bottom",
                        container: "bottom-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });

                    axios.post(ENDPOINTS.TOKEN, authJson)
                        .then(res => {
                            const authToken = res.data.data;
                            this.setGlobal({ authToken });
                            window.localStorage.setItem("authToken", JSON.stringify(authToken));
                            store.addNotification({
                                title: "Authenticated",
                                message: "Successfully authenticated with API!",
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
                        })
                        .finally(this.resetScanner)
                        .catch(err => {
                            store.addNotification({
                                title: "Error",
                                message: `Authentication failed: ${err}`,
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
                catch (e) {
                    console.log(e);
                }
            // Or check if the shell ID exists
            } else {
                this.setGlobal({ shellID: data });
                if (this.global.currentModal == modalTypes.EVENT_CHECKIN) {
                    this.generalCheckIn();
                } else {
                    this.hackerCheckIn();
                }
            }
        }
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", zIndex: 2, left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: "10em" }}>{(this.global.codeScanned) ? "🛑" : "👌🏼"}</span>
                <QrReader
                    showViewFinder={true}
                    facingMode="environment"
                    className="reader"
                    resolution={800}
                    onScan={this.handleScan}
                />
            </div>
        );
    }
}

export default QR;