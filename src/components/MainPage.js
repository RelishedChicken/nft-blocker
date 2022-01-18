//Media & CSS
import '../App.css';
import '../media/font.otf';
import button from '../media/button.svg'

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function MainPage(props){

    const[showReasoning, setShowReasoning] = useState(false);

    const handleButton = () => {
        if(props.user != null){
            props.nuke();
        }else{
            props.authUser();
        }
    }

    const hiddenPanel = () => {
        if(showReasoning){
            $('.anExplanation').fadeIn();
        }else{
            $('.anExplanation').fadeOut();
        }
        setShowReasoning(!showReasoning);
    }

    return(
        <div hidden id='buttonWrapper'>
            
            <div className="miniMenu">
              <div onClick={() => hiddenPanel()} className="miniMenuItem">
                Why?
              </div>
            </div>
            <div hidden className='anExplanation'>
                <h2>Why should I hate NFT's?</h2>
                <p>Seems you really need to be educated here.</p>
                <p>If you don’t already know, an NFT is a ‘Non-Fungible Token’, and can be seen as an (awful) extension to cryptocurrencies.</p>
                <p>Cryptocurrencies alone already cause a large amount of environmental damage, and the existence of NFT’s is a reason to use and create more crypto, for stupid images of apes and lions.</p>
                <p>There has been a trend of most NFT’s being stolen artwork. It’s funny how a CryptoBro is happy with right clicking someone’s art but burst into tears when we right click their awful, mutated abomination.</p>
                <p>The worst bit is that an NFT does not give you rights to the image. It’s a representation of the token you’ve bought. Some numbers. Most people don’t know this and is one of the reasons it’s so viral. It’s a huge scam pushed by influencers that’s snowballed out of control.</p>
                <p>Long story short, you shouldn’t like these things. They cause environmental damage, don’t actually do anything, are made of stolen art and are essentially the biggest scam of the 20th century.</p>
            </div>  
            <img onClick={() => handleButton()} className='button' src={button} alt='Press to Nuke'></img>            
            <div hidden id="readyToBlock" className="blockingUser">
                <h1>Ready to launch?</h1>
                <h2>By pressing this button, you will instantly block anyone currently interacting with #NFT.</h2>
            </div>                       
            <div hidden id="gettingBlocklist" className="blockingUser">
                <h1>Getting CryptoBros....</h1>
            </div>
            <div hidden id="blockingUser" className="blockingUser">
                <h1>NUKING</h1>
                <h2>{props.blockingUser}</h2>
            </div>
            <div hidden id="nuked" className="blockingUser">
                <h1>That's it. That's all the CryptoBros.</h1>
                <h2>Here's someone you eviscerated: <a target={'_blank'} href={'https://www.twitter.com/' + props.blockedUser.urlName} >@{props.blockedUser.urlName}</a></h2>
            </div>
        </div>
    );
}

export default MainPage;