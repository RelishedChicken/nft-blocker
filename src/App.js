import './App.css';
import './media/font.otf'
import './media/banner.png';
import logo from './media/logo.svg'
import introVideo from './media/introVideo.mp4';
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function App() {

  //State

  const[devMode] = useState(false);

  const [introArray, setIntroArray] = useState(
    [
      "Hi.",
      "I'm sure you're here for the same reason as many.",
      "Sick of seeing lions and apes that look like they were drawn by three year olds?",
      "Annoyed of seeing CryptoBros circle-jerking thier way to the 'top'?",
      "Just want a much better Twitter timeline?",
      "Whatever the reason, NFTBlock has you covered.",      
      "Coming soon to an ad-ridden browser near you."
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

  useEffect(() => {
    if(devMode){
      intro();
    }
  });

  //Render intro
  const intro = () => {
    $('#video').fadeOut();
    $('.apeCape').css('opacity', '0.5');
    $('.menu').fadeIn();    
    $('.footer').fadeIn();
    console.log("started intro....");
    //for each into sentence
    let randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    $('#slogan').text(randomSlogan);

    introArray.forEach((introSentenceAvailable, i) => {
        setTimeout(()=>{
          $('#fadingSentence').fadeOut(()=>{
            $('#fadingSentence').text(introSentenceAvailable)
            $('#fadingSentence').fadeIn();            
          });
        }, i * 5000);
    });
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
              <h1 className='pageTitle'>NFT Blocker</h1> 
            </div>            
            <div className='menuItemSeperator'></div>            
            <div className='menuItem'>
              <h3 className='slogan' id="slogan"></h3> 
            </div>            
          </div>
          <div className='content'>            
            <div className='introVideo' id='video'>
                <video onLoad={$('.video').volume = 0.2} className='video' autoPlay onEnded={intro} src={introVideo} id="video"></video>
            </div>
            <div className='intro'>
              <p hidden id="fadingSentence"></p>
            </div>
            <div hidden className='footer'>
              <p>No apes were hamed in the making of this | <a className='link' href='https://twitter.com/_ThomasPearson_'>Thomas Pearson</a> & <a target='_blank' className='link' href='https://twitter.com/vadgamaveeraj'>V</a></p>
            </div>
          </div>
      </div>
      <div className='apeCape'></div>
    </>
  );
}

export default App;
