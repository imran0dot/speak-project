import React, { useState } from "react";
import SpeechRecognition, {  useSpeechRecognition, } from "react-speech-recognition";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

function SpeechRecognitionModule(props) {
  const greeting = 'Hello I am Friday -- Speak your command!';


  const commands = [
    {
      command: ["Go to *", "Open *", "show me my *"],
      //callback: (redirectPage) => console.log(redirectPage)
      callback: (redirectPage) => setRedirectUrl(redirectPage)
    },
    {
      command: ["Change my *"],
      callback: (fieldName) => console.log(fieldName)
    }
  ]

  const {
    transcript,
    listening
  } = useSpeechRecognition({commands});

  const [redirectUrl, setRedirectUrl] = useState("");

        const pages = ["home", "landing", "new blog post", "mindfulness"];
        const urls = {
           home: "/",
           landing: "/landing", 
           "new blog post": "/blog/new",
           mindfulness: "/mindfulness",
        };

        if(!SpeechRecognition.browserSupportSpeechRecognition){
          //return null;
        }

        console.log("redirectUrl", redirectUrl)

        let redirect = "";
        if(redirectUrl) {
          if(pages.includes(redirectUrl)) {
            redirect = <Redirect to={urls[redirectUrl]} />  
          } else {
            redirect = <p>could not find page: {redirectUrl}</p>
          }
        }

  return (
      <div className="Functional">
        {props.transcript(transcript, listening)}

        <h1>{greeting}</h1>
        {listening ? 'on' : 'off'}
        <p id="transcript">Transcript: {transcript}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        {redirectUrl}
        {redirect}
      </div>
  )
}

export default SpeechRecognitionModule;