//Media & CSS
import '../App.css';
import '../media/font.otf'
import logo from '../media/logo.svg'
import fakeUser from '../media/button.svg';

//Imports
import React from 'react';
import {useState, useEffect} from 'react';

function Menu(props) {

    //State
    const[slogans] = useState([
      "Let's hope OpenSea has a drought.",
      "If NFT's are so great, why are the apes so bored?",
      "Non Functional Tossers.",
      "Are the mutated apes really necessary?",
      "'Join my crypto program I promise it's not a pyramid scheme!'",
      "'Please don't right click.'",
      "#ethBurnsForests",
      "Right click, or you're a right tit.",
      "'I been hacked. All my apes gone. Please help me.'",
      "A literal Block-Chain. - (<a href='https://twitter.com/celestefleurs' >HOT E-GIRL</a>)",
      "NFT's more like No Fucking Thanks. - (<a href='https://twitter.com/halogeniee' >Halo</a>)",
      "Bang and the Ape is gone. - (<a href='https://twitter.com/PandaManda695' >Wilko</a>)",
      "Non Functioning Testicle.",
      "Nice Fuggin' Tittes."
    ]);

    const[superRareSlogans] = useState([
      "Testicle is the medical term - (<a href='https://twitter.com/_ThomasPearson_' >TP</a>)",
      "FUCK NFTS. - (<a href='https://twitter.com/vadgamaveeraj' >?</a>)",
      "#ThomasPearson",
    ]);

    const[currentSlogan, setCurrentSlogan] = useState("");

    const[firstLoad, setFirstLoad] = useState(true);

    //Onload
    useEffect(() => {    
      if(firstLoad){

        //Grab and show a random slogan
        let randomChance = Math.floor(Math.random() * 101);

        if(randomChance > 80){
          let randomSlogan = superRareSlogans[Math.floor(Math.random() * superRareSlogans.length)];
          setCurrentSlogan(randomSlogan);
        }else{
          let randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
          setCurrentSlogan(randomSlogan);
        }

        setFirstLoad(false);

      }

    }, [firstLoad, superRareSlogans, slogans])

    return(
        <div hidden className='menu'>
            <div className='menuItemTitle'>              
              <img className='logo' src={logo} alt='NFT Nuke Logo'/>
              <h1 className='pageTitle'>NFT Nuke</h1>
            </div>
            <div className='menuItemSeperator'></div>            
            <div className='menuItem'>
              <h3 dangerouslySetInnerHTML={{ __html: currentSlogan }} className='slogan' id="slogan"></h3> 
            </div>

             
            <div style={{float: 'right'}} className='menuItemUser'>
              <div className='user'>
              {props.user != null ?
                <>
                  <img className='userProfile' src={props.user.profile_image_url_https} alt="User"></img>
                  <div className='userDetails'>
                    <p className='userName'>{props.user.name}</p>
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