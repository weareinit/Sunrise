import React, { useGlobal } from 'reactn';

function InfoPanel(){
    // eslint-disable-next-line
    const [ codeScanned, setCodeScanned ] = useGlobal('codeScanned');
    const [ data, setData ] = useGlobal('data');
    return (
        <div className="content">
            <h1>Hello Worlds!</h1>
            <p>{ codeScanned.toString() }</p>
            <p>{ data }</p>
        </div>
    );
}

export default InfoPanel;