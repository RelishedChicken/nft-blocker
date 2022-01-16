//Media & CSS
import '../App.css';
import '../media/font.otf';
import button from '../media/button.svg'

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function MainPage(props){
    return(
        <div hidden id='buttonWrapper'>              
            <img onClick={(props.user == null) ? props.authUser : props.nuke} className='button' src={button} alt='Press to Nuke'></img>
        </div>
    );
}

export default MainPage;