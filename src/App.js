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
import Cape from './components/Cape';

function App() {

  //State
  const[startIntro, setStartIntro] = useState(0);
  const[buttonClicked, setButtonClicked] = useState(false);
  const[user, setUser] = useState(null);
  const[authCheck, setAuthCheck] = useState(false);
  const[spinner, setSpinner] = useState(null);
  const[nukesDropped, setNukesDropped] = useState(-1);

  //Twitter stuff
  const[blockList, setBlockList] = useState(null);
  const[blockingUser, setBlockingUser] = useState("");  
  const[blockedUsers, setBlockedUsers] = useState([{urlName: ""}]);  
  const[blockListUser, setBlockListUser] = useState("");  

  //Check if auth url is there
  useEffect(() => {

    if(nukesDropped === -1){
      getNukeCount();
    }

    

    if(window.location.href.includes('?auth=true') && !authCheck){
      enter(true);
      setAuthCheck(true);
      getNukeCount();
    }else if(window.location.href.includes('?auth=true') && user == null && !authCheck){
      authUser();
      setAuthCheck(true);
      getNukeCount();
    }else if( !authCheck){
      $.ajax({
        url: '/ajax/check_auth.php'
      }).done(function(data){
        data = JSON.parse(data);
        if(data == true){
          enter(true);
          getUser();
          setAuthCheck(true);
          getNukeCount();
        }
      })
    }
    
  })

  //Get auth URL
  const authUser = () => {
    console.log("Authenticating user...");
    window.location.replace('/ajax/twitter_auth.php');
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

    //Minify url names to CSV
    var urlNames = '';
    blockList.forEach(user => {
      urlNames += user.urlName + ",";
    });
    urlNames = urlNames.slice(0, -1);
    console.log(urlNames);

    //Set the random user to show that you 'blocked'    
    setBlockListUser(blockList[Math.floor(Math.random()*blockList.length)].urlName);    

    //Button into nuke mode
    $('.button')[0].id = 'nukeMode';

    //Request server to block all users instantly...    
    console.log("Block request sent...");
    $.ajax({
      url: "/ajax/block_users.php",
      type: 'POST',
      data: {
        users: urlNames
      }
    }).done(function(data){
      data = JSON.parse(data);
      console.log("Users blocked: ");
      console.log(data);
      setBlockedUsers(data);
    });

    //Show nuking dialog    
    $('#gettingBlocklist').fadeOut(()=>{
      $('#blockingUser').fadeIn();
      
      blockList.forEach((user, i) => {
        setTimeout(()=>{
          setBlockingUser(user.name);
        }, i * 200);
      });

      setTimeout(() => {
        console.log("Users blocked")
        $('#blockingUser').fadeOut(()=>{
          $('#nuked').fadeIn();          
          $('.button')[0].id = '';
          clearInterval(spinner);
          updateNukeCount();  
          setTimeout(()=>{
            $('#nuked').fadeOut(()=>{
              $('#readyToBlock').fadeIn();
              setButtonClicked(false);
            });
          }, 5000)
        })
      }, blockList.length * 200);
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
        getBlockList();
      }


    });
    

  }

  //Get counter
  const getNukeCount = () => {
    $.ajax({
      url: "/ajax/nukes.php",
      data: {
        method: 'get'
      }
    }).done(function(data){
      data = JSON.parse(data);
      setNukesDropped(data.nukes_dropped);
    });
  }

  //Set nuke counter
  const updateNukeCount = () => {
    $.ajax({
      url: "/ajax/nukes.php",
      data: {
        method: 'set'
      }
    }).done(function(data){
      data = JSON.parse(data);
      setNukesDropped(data.nukes_dropped);
    });

  }

  //Render
  return (
    <>
      <div className='app'>
          <Menu user={user} signOut={signOut} />
          {false ?          
            <div className='content'>
              <Cape />
            </div>
            :
            <div className='content'>
              <EnterScreen enter={enter}/>
              <Intro startIntro={startIntro} introComplete={introComplete} videoComplete={videoComplete}/>
              <MainPage user={user} authUser={authUser} nuke={nuke} blockingUser={blockingUser} blockListUser={blockListUser} nukesDropped={nukesDropped}/>
              <Footer />
            </div>
          }
      </div>
      <div className='apeCape'></div>
    </>
  );
}

export default App;
