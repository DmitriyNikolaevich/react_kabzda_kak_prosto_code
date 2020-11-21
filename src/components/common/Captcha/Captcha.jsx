import React from 'react';
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators';
import { createField, Input } from '../FormControls/FormControls';

const maxLenght = maxLenghtCreator(10);

const Captcha = ({captchaURL}) => {
    return (
        <div>
            <div>
                <img src={captchaURL} alt="Captcha" />
            </div>
            <div>
                {createField("Captcha", "captcha", [ requiredFild, maxLenght ], Input)}
            </div>
        </div>
    )
}

export default Captcha;