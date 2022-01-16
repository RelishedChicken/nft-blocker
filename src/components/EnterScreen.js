//Media & CSS
import '../App.css';
import '../media/font.otf';

//Imports
import React from 'react';
import $ from 'jquery';

function EnterScreen(props) {    
    
    return(
        <div className='enterWrapper'>
            <h3 className='enter'><a onClick={() => props.enter(false)} alt='Enter Site'>ENTER</a></h3>
            <small className='skip'><a onClick={() => props.enter(true)} alt='Skip Video'>skip intro &gt;&gt;</a></small>
        </div>        
    )
    

}

export default EnterScreen;