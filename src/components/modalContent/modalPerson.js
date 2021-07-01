import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../../client";

export default function ModalBox(props) {
    const [postData, setPostData] = useState(null);
    const [showModalnu, setShowModalnu] = useState(props.show);
    const [animationnu, setAnimationnu] = useState(props.animation);
    const [myId, setMyId] = useState(props.id);
    const [hasImg, sethasImg] = useState(null);

    const imageStyle = {};

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person'] {
                    vorname,
                    nachname,
                    position,
                    poster {
                        asset->{
                        url
                  }
                }
            }
                  `
            )
            .then((data) => setPostData(data))
            // .then((data) => console.log(data))
            .catch(console.error);
        console.log(postData);

        // document.querySelector("#test").addEventListener("click", showData);
    }, []);

    function showData() {
        console.log(postData);
    }

    function close() {
        setAnimationnu("slide-out-top");
        setTimeout(() => {
            props.changeState(false);
        }, 400);
        // setShowModalnu(false);
    }

    return (
        <div>
            {postData && (
                <div>
                    <div className="d-flex justify-content-center" id="portrait">
                        <img src={postData[props.id].poster.asset.url} alt="" />
                    
                
                    </div>
                    {postData[props.id].vorname} {postData[props.id].nachname}
                </div>
            )}
        </div>
    );
}
