import PropTypes from 'prop-types'

const Button = ({color, test, onClick}) => {
    return (
    <button onClick={onClick} style={{backgroundColor: color}}
    className="btn">
        {text}
        </button>
)}

Button.defaultProps = {
    color: 'steelblue'
}

Button.defaultTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button