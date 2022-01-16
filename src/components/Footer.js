//Media & CSS
import '../App.css';
import '../media/font.otf';
import twitterIcon from '../media/twitter_icon.svg';

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function Footer(props){

    return(        
        <div hidden className='footer'>
            <p>No apes were harmed in the making of this | <a target='_blank' className='link' href='https://twitter.com/_ThomasPearson_'><img height="13px" src={twitterIcon} alt='Thomas Pearson Twitter'></img>&nbsp;Thomas Pearson</a> & <a target='_blank' className='link' href='https://twitter.com/vadgamaveeraj'><img height="13px" src={twitterIcon} alt='V Twitter'></img>&nbsp;V</a></p>
        </div>
    )

}

export default Footer;