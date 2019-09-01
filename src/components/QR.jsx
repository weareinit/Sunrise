import React from 'reactn';
import QrReader from 'react-qr-reader'

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
            let isAuthToken = false;
            let authToken;
            try{
                authToken = JSON.parse(atob(data));

                isAuthToken = true;
            } catch(e)
            {
                console.log(e);
            }

            //Store the auth token in the state and localStorage
            if(isAuthToken){
                try
                {
                    this.setGlobal({ authToken });
                    window.localStorage.setItem("authToken", JSON.stringify(authToken));
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