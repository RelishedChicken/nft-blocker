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
  const[authCheck, setAuthCheck] = useState(false);
  const[spinner, setSpinner] = useState(null);

  //Twitter stuff
  const[blockList, setBlockList] = useState(null);
  const[blockingUser, setBlockingUser] = useState("");

  //Check if auth url is there
  useEffect(() => {
    if(window.location.href.includes('?auth=true') && !authCheck){
      enter(true);
      setAuthCheck(true);
    }else if(window.location.href.includes('?auth=true') && user == null && !authCheck){
      authUser();
      setAuthCheck(true);
    }else if(user == null && !authCheck){
      $.ajax({
        url: '/ajax/check_auth.php'
      }).done(function(data){
        data = JSON.parse(data);
        if(data == true){
          enter(true);
          getUser();
        }
      })
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
      if(data.successful && !data.prevAuth){
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

  //Deauth user
  const signOut = () => {    
    console.log("Deauthenticating user...");
    $.ajax({
      url: '/ajax/deauth.php'
    }).done(function(data){
      window.location.href = "https://www.nftnuke.co.uk";
    });

  }

  //Get user data
  const getUser = () => {
    console.log("Grabbing user data...");
    $.ajax({
      url: '/ajax/get_user.php'
    }).done(function(data){
      data = JSON.parse(data);

      //check no auth error
      if(!data.hasOwnProperty('errors')){
        setUser(data);
      }else{
        setUser(null);
        console.log(data.errors);
      }
    });
  } 

  //Get a list of NFTBros
  const getBlockList = () => {
    console.log("Grabbing list of users to nuke...");

    $('#readyToBlock').fadeOut(()=>{
      
      $('#gettingBlocklist').fadeIn();

      $.ajax({
        url: '/ajax/get_recent_tweets.php?query=NFT'
      }).done(function(data){
  
        data = JSON.parse(data);
  
        console.log(data);
  
        setBlockList(data);
        
      });

    });
  }

  useEffect(() => {
    if (blockList !== null) {
      blockUsers();
    }
  }, [blockList]);

  //Blocks NFTBros
  const blockUsers = () =>{

    console.log("Nuking users.....");

    //Show nuking dialog    
    $('#gettingBlocklist').fadeOut(()=>{
      $('#blockingUser').fadeIn();
      //Loop through 'story' and display
      blockList.forEach((user, i) => {
        //Time calculation to show each sentence
        setTimeout(()=>{
          setBlockingUser(user.name);
        }, i * 100);
      });

      //Make faster spinner
      //Nuke spin loop
      let deg = 0;
      clearInterval(spinner);
      if(!buttonClicked){
        let spinner = setInterval(() => {      
          deg += 5;
          $('.button').css('transform', 'rotate('+deg+'deg)');      
          if(deg === 360){
            deg = 0;
          }
        }, 2);
        setButtonClicked(true);
        setSpinner(spinner);
      }

      setTimeout(() => {
        console.log("Users blocked")
        $('#blockingUser').fadeOut(()=>{
          $('#nuked').fadeIn();
          clearInterval(spinner);
          setTimeout(()=>{
            $('#nuked').fadeOut(()=>{
              $('#readyToBlock').fadeIn();
            });
          }, 5000)
        })
      }, blockList.length * 100);
    });   

  }


  //VV VISUALS VV
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
        introComplete();
        getUser();
      });
    }
  }

  //Video complete
  const videoComplete = () => {    
    console.log("Video is complete...");
    $('#videoWrapper').fadeOut(()=>{
      $('#introWrapper').fadeIn();
      $('.menu').fadeIn();
      $('.footer').fadeIn();
    });   
  }

  //Intro complete
  const introComplete = () => {
    console.log("Loading main page...");
    $('.apeCape').css('opacity', '0.5');
    $('#videoWrapper').fadeOut();  
    $('#introWrapper').fadeOut(() => {
      $('#buttonWrapper').fadeIn();
      $('#readyToBlock').fadeIn();
      $('.menu').fadeIn();
      $('.footer').fadeIn();
    });
  }

  //Get and nuke cryptobros (lol)
  const nuke = () => {
    console.log("Nuking cypto bros....");

    
    $('#readyToBlock').fadeOut(() => {
      //Nuke spin loop
      let deg = 0;
      if(!buttonClicked){
        let spinner = setInterval(() => {      
          deg += 5;
          $('.button').css('transform', 'rotate('+deg+'deg)');      
          if(deg === 360){
            deg = 0;
          }
        }, 8);
        setButtonClicked(true);
        setSpinner(spinner);
      }

      getBlockList();
    });

    

  }


  //Render
  return (
    <>
      <div className='app'>
          <Menu user={user} signOut={signOut} />
          <div className='content'>
            <EnterScreen enter={enter}/>
            <Intro startIntro={startIntro} introComplete={introComplete} videoComplete={videoComplete}/>
            <MainPage user={user} authUser={authUser} nuke={nuke} blockingUser={blockingUser}/>
            <Footer />
          </div>
      </div>
      <div className='apeCape'></div>
    </>
  );
}

export default App;
