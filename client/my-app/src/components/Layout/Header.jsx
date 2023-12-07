import { useState } from 'react'
import '.css'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { useAuth } from '../../context/auth'

const Header = () => {

  const [isMobile, setisMobile] = useState(false)
  const [auth, setAuth] = useAuth();

  const toggleMobile = () => {
    setisMobile(!isMobile)
  }

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('authData')
  }

  return (

    <div className='navbar-position shadow-lg'>

      <nav className='nav-cont'>

        <h3 className='logo'><span>E</span>commerce App</h3>

        <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setisMobile(false)}>
          <Link to="/" className='home'>
            <li>Home</li>
          </Link>
          <Link to='/category' className='cetegory'>
            <li>Category</li>
          </Link>
          {
            auth.user ?
              (<>
                <Link to="/" className='sign-out' onClick={handleLogout}>
                  <li >Log out</li>
                </Link>
              </>)
              :
              (<>
                <Link to="/signup" className='sign-Up'>
                  <li >Sign Up</li>
                </Link>
                <Link to="/signin" className='sign-in'>
                  <li >Sign In</li>
                </Link>
              </>)
          }
          <Link to="/privacypolicy" className='cart'>
            <li >cart(0)</li>
          </Link>
        </ul>

        <button className='menu-bar-icon' onClick={toggleMobile}>
          {isMobile ? <ImCross />
            : <FaBars />}
        </button>

      </nav>

    </div>
  )
}

export default Header;


