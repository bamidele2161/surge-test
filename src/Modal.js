import React, {useState, useEffect} from 'react'
import { FaEnvelopeOpenText } from "react-icons/fa";
import Loading from './Loader';

const Modal = ({handleSubmit}) => {

    const [isLoading, setIsLoading] =useState(true);

    useEffect(() => {
        const load = setTimeout(() => setIsLoading(false), 1000); //display the loader component for 1 second before displaying the verification message
        return() => {
            clearTimeout(load)
        }
    }, [])
  return (
    <div className="modal-container">
        <div onClick={handleSubmit} className="overlay">
            <div className="modal-content" >
                {
                    isLoading ? (<Loading />) // using the loader component, it loads when the state is true
                    : 
                    (
                        <div>
                            <FaEnvelopeOpenText className="modal-icon" />
                            <h1 className="modal-heading" >Verification Link Sent!</h1>
                            <p className="modal-message">An email has just been sent to your inbox, kindly check and click the link to proceed with your registration</p>
                            <button className="modal-btn">Click to verify email</button>
                        </div>
                    ) // displays when the state is false
                }
            </div>
        </div>
    </div>
  )
}

export default Modal