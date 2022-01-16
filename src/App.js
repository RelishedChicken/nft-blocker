//Media & CSS
import './App.css';
import './media/font.otf'
import './media/banner.png';

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

//Components
import Menu from './components/Menu';
import EnterScreen from './components/EnterScreen';
import Intro from './components/Intro';
import MainPage from './components/MainPage';
import Footer from './components/Footer';

function App() {

  //State
  const[startIntro, setStartIntro] = useState(0);
  const[buttonClicked, setButtonClicked] = useState(false);
  const[user, setUser] = useState(null);

  //Check if auth url is there
  useEffect(() => {
    if(window.location.href.includes('?auth=true')){
      enter(true);
    }
  })

  //Get auth URL
  const authUser = () => {
    console.log("Authenticating user...");
    $.ajax({
      url: '/ajax/twitter_auth.php'
    }).done(function(data){
      data = JSON.parse(data);

      //If user not previously authed
      if(!data.prevAuth && data.successful){
        let twitterAuthWindow = window.location.href = data.url;
        var timer = setInterval(function() { 
          if(twitterAuthWindow.closed) {
              clearInterval(timer);
              //Now get user info that its available (once window closes)
              getUser();
          }
        }, 1000);
      }else{
        getUser();
      }
    });
  }

  //Get user data
  const getUser = () => {
    console.log("Grabbing user data...");
    $.ajax({
      url: '/ajax/get_user.php'
    }).done(function(data){
      data = JSON.parse(data);
      console.log(data);
      setUser(data);
    });
  } 

  //Enter page clicked
  const enter = (skip) => {
    console.log("User want's to nuke their twitter timeline...");
    if(!skip){
      $('.enterWrapper').fadeOut(() => {
        setStartIntro(true);        
        $('.apeCape').css('opacity', '0.3');
      });
    }else{
      $('.enterWrapper').fadeOut(() => {        
        setStartIntro(false);
        introComplete();
      });
    }
  }

  //Video complete
  const videoComplete = () => {    
    console.log("Video is complete...");
    $('#videoWrapper').fadeOut();   
    $('#introWrapper').fadeIn();
    $('.menu').fadeIn();
    $('.footer').fadeIn();
  }

  //Intro complete
  const introComplete = () => {
    console.log("Loading main page...");
    $('.apeCape').css('opacity', '0.5');
    $('#videoWrapper').fadeOut();  
    $('#introWrapper').fadeOut(() => {
      $('#buttonWrapper').fadeIn();
      $('.menu').fadeIn();
      $('.footer').fadeIn();
    });
  }

  //Get and nuke cryptobros (lol)
  const nuke = () => {
    console.log("Nuking cypto bros....");


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
          <Menu user={user}/>
          <div className='content'>
            <EnterScreen enter={enter}/>
            <Intro startIntro={startIntro} introComplete={introComplete} videoComplete={videoComplete}/>
            <MainPage authUser={authUser} nuke={nuke}/>
            <Footer />
          </div>
      </div>
      <div className='apeCape'></div>
    </>
  );
}

export default App;
