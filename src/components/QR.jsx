import React from 'reactn';
import QrReader from 'react-qr-reader'
import axios from 'axios';
import { modalTypes } from './ModalRoot';

class QR extends React.Component
{
    handleScan = data => 
    {

        /* We shouldn't read QR codes while the user is in the process of
        checking people in/redeeming items
         */
        if(data != null && !this.global.codeScanned)
        {
            this.setGlobal({ codeScanned: true })

            // The auth QR code is Base64 encoded, which is how we know 
            // it's the auth QR code
            let isBase64 = false;
            let authJson;
            try{
                authJson = JSON.parse(atob(data));

                isBase64 = true;
            } catch(e)
            {
                console.log(e);
            }

            //Store the auth token in the state and localStorage
            if(isBase64){
                try
                {
                    if(typeof authJson.password == "undefined")
                        throw new Error("Auth json is incorrect.");
                    
                    axios.post("https://api.shellhacks.net/token",authJson)
                        .then(res => {
                            const authToken = res.data.data;
                            this.setGlobal({ authToken });
                            window.localStorage.setItem("authToken", JSON.stringify(authToken));
                        }).finally(() => {
                            setTimeout(() => {
                                this.setGlobal({codeScanned: false})
                            }, 1000)
                        })
                    
                }
                catch(e)
                {
                    console.log(e);
                }
            // Or check if the shell ID exists
            } else {
                this.setGlobal({ shellID: data });
                const { shellID, authToken } = this.global;
                axios.post("https://api.shellhacks.net/admin/readOne",
                    { shellID },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken.token}`
                        }
                    }
                )
                .then((res) => {
                    const { data } = res.data;
                    
                    if(!data.checkIn){
                        throw new Error("User is already checked in.")
                    }
                    
                    this.setGlobal({user: data, currentModal: modalTypes.USER_INFO})
                })
                .catch((e) => {
                    console.log(e)
                })
                .finally(() => {
                    setTimeout(() => {
                        this.setGlobal({codeScanned: false})
                    }, 1000)
                })
            }
        }
    }

    render()
    {
        return (
            <QrReader 
                showViewFinder={true}
                facingMode="environment"
                className="reader"
                resolution={800}
                onScan={this.handleScan}
            />
        );
    }
}

export default QR;