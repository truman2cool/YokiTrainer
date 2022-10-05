import React from 'react'
import '../css/button.css'
import { Link } from 'react-router-dom'

const STYLES =['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle : STYLES[0];

    const checkButtonSize =SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <Link to='/login' className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </Link>
    )
};

export const Button2 = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle : STYLES[0];

    const checkButtonSize =SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <a href='https://www.yokirestaurant.com/' target="_blank" rel="noreferrer" className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </a>
    )
};

export default Button
