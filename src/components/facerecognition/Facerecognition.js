import React from 'react';
import './facerecognition.css';

const Facerecognition = ({imageurl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageurl} alt="this is an sparta" width='500px' height='auto'></img>
                <div className='bounding-box' style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>
            </div>
        </div>
    )
}

export default Facerecognition;