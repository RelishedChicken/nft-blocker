//Media & CSS
import '../App.css';
import '../media/font.otf'
import logo from '../media/logo.svg'
import fakeUser from '../media/button.svg';

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';



function Menu(props) {

    //State
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

    //Onload
    useEffect(() => {    
      //Grab and show a random slogan
      let randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
      $('#slogan').text(randomSlogan);
    })

    return(
        <div hidden className='menu'>
            <div className='menuItemTitle'>              
              <img className='logo' src={logo} alt='NFT Nuke Logo'/>
              <h1 className='pageTitle'>NFT Nuke</h1>
            </div>
            <div className='menuItemSeperator'></div>            
            <div className='menuItem'>
              <h3 className='slogan' id="slogan"></h3> 
            </div>            
              <div style={{float: 'right'}} className='menuItemUser'>
                <div className='user'>
                {props.user != null ?
                  <>
                    <img className='userProfile' src={props.user.profile_image_url_https} alt="User"></img>
                    <div className='userDetails'>
                      <p className='userName'>Connect to Twitter!</p>
                      <small onClick={() => props.signOut()} className='userLogout'>Sign Out</small>
                    </div>
                  </>                  
                  :
                  <>
                    <img className='userProfile' src={fakeUser} alt="User"></img>
                    <div className='userDetails'>
                      <p className='userName'>Connect to Twitter!</p>
                    </div>
                  </>
                }
                </div>
              </div>
          </div>
    );

}

export default Menu;