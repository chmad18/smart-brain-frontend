import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({onUrlInputChange, onImageSubmit}) => {
    return(
        <div>
            <p className='f3'>
                {'This magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input id='test3' type='text' className='f4 pa2 w-70 center' onChange={onUrlInputChange}/> 
                    <button onClick={onImageSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;