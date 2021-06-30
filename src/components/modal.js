import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

export default function ModalBox(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(props.show);
    const [animationnu, setAnimationnu] = useState(props.animation);
    const [myId, setMyId] = useState(props.id);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person'] {
                    vorname,
                    nachname,
                    position
                  }
                  `
            )
            .then((data) => setPostData(data))
            .then((data) => console.log(data))
            .catch(console.error);
        console.log(postData);
        // document.querySelector("#test").addEventListener("click", showData);
    }, []);

    function showData() {
        console.log(postData);
    }

    function close() {
        setAnimationnu("slide-out-top");
        setShowModal(false);
    }

    return (
        <div>
            {showModal && (
                <div className={`${animationnu} container-fluid position-absolute h-100 modalBox`}>
                    <div className="">
                        <div className="closer" onClick={close}>
                            <i class="bi bi-x-circle"></i>
                        </div>
                        <h2>HALLO</h2>
                        <h2>
                            {props.vorname} {props.nachname}
                            {props.id}
                            {postData && console.log(postData[myId])}
                        </h2>
                    </div>
                    <div className="overlay"></div>
                </div>
            )}
        </div>
    );
}
