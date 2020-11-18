import React from 'react';
import loader from '../../../assets/images/loader3.svg'

const Preloader = (props) => {
    return (
        <div>
            <img src={loader} alt="Alt text" />
        </div>
    )
}

export default Preloader;