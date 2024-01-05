import React from 'react'
import "../index.css"

function Message({ message, user, classs }) {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                {`${user} : ${message}`}
            </div>
        )
    }
    else {
        return (
            <>
                <div className={`messageBox ${classs}`}>
                    {`You : ${message}`}
                </div>
            </>
        )
    }

}

export default Message