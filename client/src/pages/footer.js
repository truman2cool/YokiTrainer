import { Link } from "react-router-dom"
import "../css/footer.css";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to='/pages/about'>About</Link>
    </footer>
  )
};

export default Footer
