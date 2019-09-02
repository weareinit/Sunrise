import React from 'react';

function Modal({children, actions}){
    return (
        <div className="modal">
            
            <div className="modal-content">
                {children}
            </div>
            {
                (actions) ? (
                    <div className="actions">
                        {actions.map((action) => 
                           <button onClick={action.action}>{action.name}</button> 
                        )}
                    </div>
                ) : (null)
            }
        </div>
    );
}

export default Modal;