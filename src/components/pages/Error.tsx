import React from 'react'
import "../styles/Error.css";

interface ErrorProps {
    setErr: any,
    message: string
}

const Error = ({ setErr, message }: ErrorProps) => {
    setTimeout(() => {
        setErr(false);
    }, 2500)
    return (
        <div className='error'>
            {message}
        </div>
    )
}

export default Error
