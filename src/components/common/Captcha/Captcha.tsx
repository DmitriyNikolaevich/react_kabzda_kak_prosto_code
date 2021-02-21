import React, { FC } from 'react'
import { maxLenghtCreator, requiredFild } from '../../../utils/validators/validators'
import { CreateFieldNamePropertiesType } from '../../Login/Login'
import { createField, Input } from '../FormControls/FormControls'

const maxLenght = maxLenghtCreator(10)

type PropsType = {
    captchaURL: string
}

const Captcha: FC<PropsType> = ({captchaURL}) => {
    return (
        <div>
            <div>
                <img src={captchaURL} alt="Captcha" />
            </div>
            <div>
                {createField<CreateFieldNamePropertiesType>("Captcha", "captcha", [ requiredFild, maxLenght ], Input)}
            </div>
        </div>
    )
}

export default Captcha;