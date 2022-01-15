//Media & CSS
import './App.css';
import './media/font.otf'
import './media/banner.png';
import logo from './media/logo.svg'
import introVideo from './media/introVideo.mp4';
import button from './media/button.svg'
import twitterIcon from './media/twitter_icon.svg';
import fakeUser from './media/button.svg';

//Imports
import React from 'react';
import {useState} from 'react';
import $ from 'jquery';

function App() {

  //State
  const[buttonClicked, setButtonClicked] = useState(false);
  const[uiLoaded, setUiLoaded] = useState(false);  
  const[user, setUser] = useState(null);  

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
      enableButton();
    });
  }

  //Render intro
  const intro = () => {    
    //Hide the video
    $('#videoWrapper').fadeOut();
    $('#videoWrapper').remove();

    //Fade in paragraphs, menu and footer
    if(!uiLoaded){
      $('#introWrapper').fadeIn();
      $('.apeCape').css('opacity', '0.5');
      $('.menu').fadeIn();    
      $('.footer').fadeIn();
      setUiLoaded(true);
    }
    
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
    }, introArray.length * 4000);
  

  }

  const enableButton = () => {
    //Remove story elements
    $('.enterWrapper').fadeOut();
    $('.enterWrapper').remove();
    $('#videoWrapper').fadeOut();
    $('#videoWrapper').remove();
    $('#introWrapper').fadeOut();
    $('#introWrapper').remove();
    
    //Fade in paragraphs, menu and footer
    if(!uiLoaded){
      $('#introWrapper').fadeIn();
      $('.apeCape').css('opacity', '0.5');
      $('.menu').fadeIn();    
      $('.footer').fadeIn();
      setUiLoaded(true);
    }

    //Show button
    $('#buttonWrapper').fadeIn();
    console.log("Button now available..");

  }

  //Get auth URL
  const authUser = () => {
    console.log('retrieving auth');

    $.ajax({
      url: '/ajax/twitter_auth.php'
    }).done(function(data){
      data = JSON.parse(data);
      if(data.successful){
        let twitterAuthWindow = window.open(data.url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400" );
        var timer = setInterval(function() { 
          if(twitterAuthWindow.closed) {
              clearInterval(timer);
              //Now get user info that its available (once window closes)
              getUser();
          }
        }, 1000);
      }
    });
  }

  //Get user data
  const getUser = () => {
    $.ajax({
      url: '/ajax/get_user.php'
    }).done(function(data){
      data = JSON.parse(data);
      console.log(data);
      setUser(data);
    });
  }

  //When authed, nukes NFT users (lol)
  const nuke = () => {
    console.log("boom");

    //Nuke spin loop
    let deg = 0;

    if(!buttonClicked){
      setInterval(() => {      
        deg += 5;
        $('.button').css('transform', 'rotate('+deg+'deg)');      
        if(deg === 360){
          deg = 0;
        }
      }, 2);
      setButtonClicked(true);
    }

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
            
              <div style={{float: 'right'}} className='menuItem'>
                <div className='user'>
                {user != null ?
                  <>
                    <img className='userProfile' src={user.profile_image_url_https} alt="User"></img>
                    <p className='userName'>{user.name}</p>
                  </>                  
                  :
                  <>
                    <img className='userProfile' src={fakeUser} alt="User"></img>
                    <p className='userName'>Connect to Twitter!</p>
                  </>
                }
                </div>
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
              <img onClick={(user == null) ? authUser : nuke} className='button' src={button} alt='Press to Nuke'></img>
            </div>
            <div hidden className='footer'>
              <p>No apes were harmed in the making of this | <a target='_blank' className='link' href='https://twitter.com/_ThomasPearson_'><img height="13px" src={twitterIcon} alt='Thomas Pearson Twitter'></img>&nbsp;Thomas Pearson</a> & <a target='_blank' className='link' href='https://twitter.com/vadgamaveeraj'><img height="13px" src={twitterIcon} alt='V Twitter'></img>&nbsp;V</a></p>
            </div>
          </div>
      </div>
      <div className='apeCape'></div>
    </>
  );
}

export default App;
