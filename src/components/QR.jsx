import React from 'reactn';
import QrReader from 'react-qr-reader'
import axios from 'axios';

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
                            console.log(res);
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
            // Or simply store the data in the global state
            } else {
                this.setGlobal({ data })
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