//Media & CSS
import '../App.css';
import '../media/font.otf';

//Imports
import React from 'react';
import {useState} from 'react';
import Countdown from 'react-countdown';

function Cape(){

    const[doomsDay] = useState('2022-01-21 20:30:00');

    const render = ({ days, hours, minutes, seconds, completed }) => {
        return <span>{days}D {hours}H {minutes}M {seconds}S</span>
    }

    return(
        <div className='enterWrapper'>
            <h1 className='capeText'>Nukes dropping soon.</h1>
            <h2 className='capeTextSub'><Countdown renderer={render} date={new Date(doomsDay)}></Countdown></h2>
        </div>
    )
}

export default Cape;