//Media & CSS
import '../App.css';
import '../media/font.otf';
import introVideo from '../media/introVideo.mp4';

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function Intro(props){    

    const [introArray, setIntroArray] = useState(
        [
        "Hi.",
        "I'm sure you're here for the same reason as many.",
        "Sick of seeing lions and apes that look like they were drawn by three year olds?",
        "Annoyed of seeing CryptoBros circle-jerking thier way to the 'top'?",
        "Just want a much better Twitter timeline?",
        "Whatever the reason, NFT Nuke has you covered.",      
        "So go ahead. Atomize those CryptoBros."
        ]
    );    

    //Start intro sequence
    useEffect(() => {
        if(props.startIntro === true){
            $('#videoWrapper').fadeIn();
            $('#video')[0].play();
        }
    });

    //Continue to text story
    const textIntro = () => {

        //Set video as complete
        props.videoComplete();

        //Loop through 'story' and display
        introArray.forEach((introSentenceAvailable, i) => {
            //Time calculation to show each sentence
            setTimeout(()=>{
            $('#fadingSentence').fadeOut(()=>{
                $('#fadingSentence').text(introSentenceAvailable)
                $('#fadingSentence').fadeIn();            
            });
            }, i * 4000);
        });

        setTimeout(() => {
            props.introComplete();
        }, introArray.length * 4000);
        
    }


    return(
        <>
            <div hidden className='introVideo' id='videoWrapper'>
                <video id='video' className='video' onEnded={textIntro} src={introVideo} id="video"></video>
            </div>
            <div hidden id='introWrapper' className='intro'>
                <p id="fadingSentence"></p>
            </div>
        </>
    )

}

export default Intro;