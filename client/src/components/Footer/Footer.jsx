import './Footer.scss'
import { Link } from 'react-router-dom'
import LogoWhite from '../../assets/logo/white.svg'

const Footer = () => {
  return (
    <footer id='footer'>
      <div id='info-footer'>
        <div className='box'>
          <Link to='/'>
            <img id='logo' src={LogoWhite} alt="Level Up" />
          </Link>
          <p id='desc'>We create posibilities for the connected world.</p>
        </div>
        <div className='box'>
          <p className='title'>Explore</p>
          <Link to='/' className='link'>Home</Link>
          <Link to='/games' className='link'>Games</Link>
          <Link to='/create' className='link'>Create</Link>
          <Link to='/about' className='link'>About</Link>
        </div>
        <div className='box'>
          <p className='title'>Follow Us</p>
          <a 
            target='_blank' 
            className='link'
            rel="noopener noreferrer"
            href="https://github.com/GianmarcoVc" 
          >GitHub</a>
          <a 
            target='_blank' 
            className='link'
            rel="noopener noreferrer"          
            href="https://www.linkedin.com/in/gianmarco-valentin/"
          >Linkedin</a>
        </div>
      </div>
      <p id='copyr'>&#0169; 2022 Envoy. Design and Coded at Gianmarco</p>
    </footer>
  )
};

export default Footer;
