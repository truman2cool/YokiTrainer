import propTypes from 'prop-types'

const Header = ({title}) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
    title: 'Yoki Trainer',
}

Header.propTypes = {
    title: propTypes.string,
}

export default Header
