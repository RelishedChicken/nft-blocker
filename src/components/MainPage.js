//Media & CSS
import '../App.css';
import '../media/font.otf';
import button from '../media/button.svg'

//Imports
import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery';

function MainPage(props){

    const handleButton = () => {
        if(props.user != null){
            props.nuke();
        }else{
            props.authUser();
        }
    }

    return(
        <div hidden id='buttonWrapper'>              
            <img onClick={() => handleButton()} className='button' src={button} alt='Press to Nuke'></img>
        </div>
    );
}

export default MainPage;