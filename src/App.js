import './App.css';
import './media/font.otf'
import './media/banner.png';
import logo from './media/logo.svg'
import introVideo from './media/introVideo.mp4';
import button from './media/button.svg'
import React from 'react';
import config from './config.json';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function App() {

  //State

  const[devMode] = useState(false);

  const [introArray, setIntroArray] = useState(
    [
      /*"Hi.",
      "I'm sure you're here for the same reason as many.",
      "Sick of seeing lions and apes that look like they were drawn by three year olds?",
      "Annoyed of seeing CryptoBros circle-jerking thier way to the 'top'?",
      "Just want a much better Twitter timeline?",
      "Whatever the reason, NFT Nuke has you covered.",      
      "So go ahead. Atomize those CryptoBros."*/
    ]
  );

  const[slogans] = useState([
    "Yes we right clicked for our background.",
    "Let's hope OpenSea has a drought.",
    "If NFT's are so great, why are the apes so bored?",
    "Non Functional Tossers.",
    "Are the mutated apes really necessary?",
    "'Join my crypto program I promise it's not a pyramid scheme!'",
    "'Please don't right click'",
    "#ethBurnsForests",
    "#ThomasPearson",
    "Right click, or you're a right tit.",
    "'I been hacked. All my apes gone. Please help me.'"
  ]);

  //Start video
  const start = () => {
    $('.enter').fadeOut(()=>{
      $('.enterWrapper').remove();      
      $('.apeCape').css('opacity', '0.8');
      $('#videoWrapper').fadeIn();
      document.getElementById('video').play();
    });
  }

  //Skip video
  const skipIntro = () => {    
    $('.skip').fadeOut();
    $('.enter').fadeOut(()=>{
      $('.enterWrapper').remove();
      intro();
    });
  }

  //Render intro
  const intro = () => {    
    //Hide the video
    $('#videoWrapper').fadeOut();
    $('#videoWrapper').remove();

    //Fade in paragraphs, menu and footer
    $('#introWrapper').fadeIn();
    $('.apeCape').css('opacity', '0.5');
    $('.menu').fadeIn();    
    $('.footer').fadeIn();
    
    //Grab and show a random slogan
    let randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    $('#slogan').text(randomSlogan);

    //Loop through 'story' and display
    introArray.forEach((introSentenceAvailable, i) => {
        //Time calculation to show each sentence
        setTimeout(()=>{
          $('#fadingSentence').fadeOut(()=>{
            $('#fadingSentence').text(introSentenceAvailable)
            $('#fadingSentence').fadeIn();            
          });
        }, i * 4000);
    })
    
    setTimeout(() => {
      enableButton();
    }, introArray.length * 4000)
  

  }

  const enableButton = () => {
    //Remove story elements    
    $('#introWrapper').fadeOut();
    $('#introWrapper').remove();

    //Show button
    $('#buttonWrapper').fadeIn();
    

    console.log("Button now available..");

  }

  const nuke = () => {
    console.log("boom");

    //Nuke spin loop
    let deg = 0;

    
    setInterval(() => {      
      deg += 1;
      $('.button').css('transform', 'rotate('+deg+'deg)');      
      if(deg === 360){
        deg = 0;
      }
    }, 2);

  }

  //Render
  return (
    <>
      <div className='app'>
          <div hidden className='menu'>
            <div className='menuItem'>              
              <img className='logo' src={logo} alt='NFT Nuke Logo'/>
            </div>
            <div className='menuItem'>
              <h1 className='pageTitle'>NFT Nuke</h1> 
            </div>            
            <div className='menuItemSeperator'></div>            
            <div className='menuItem'>
              <h3 className='slogan' id="slogan"></h3> 
            </div>            
          </div>
          <div className='content'>        
            <div className='enterWrapper'>
              <h3 className='enter'><a onClick={start}>ENTER</a></h3>
              <small className='skip'><a onClick={skipIntro}>skip intro &gt;&gt;</a></small>
            </div>    
            <div hidden className='introVideo' id='videoWrapper'>
                <video id='video' className='video' onEnded={intro} src={introVideo} id="video"></video>
            </div>
            <div hidden id='introWrapper' className='intro'>
              <p id="fadingSentence"></p>
            </div>
            <div hidden id='buttonWrapper'>              
              <img onClick={nuke} className='button' src={button} alt='Press to Nuke'></img>
            </div>
            <div hidden className='footer'>
              <p>No apes were harmed in the making of this | <a target='_blank' className='link' href='https://twitter.com/_ThomasPearson_'>Thomas Pearson</a> & <a target='_blank' className='link' href='https://twitter.com/vadgamaveeraj'>V</a></p>
            </div>
          </div>
      </div>
      <div className='apeCape'></div>
    </>
  );
}

export default App;
