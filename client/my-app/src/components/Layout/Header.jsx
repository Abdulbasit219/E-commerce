import { useState } from 'react'
import '.css'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { useAuth } from '../../context/auth'

const Header = () => {

  const [isMobile, setisMobile] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false);
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

                <div className="relative inline-block text-left flex items-center justify-center">
                  <div>
                    <button
                      className="flex w-full justify-center rounded-md md:bg-white px-3 text-sm text-gray-900 hover:opacity-50 outline-none sign-out"
                      onClick={(e) => {
                        setisMenuOpen(!isMenuOpen);
                        e.stopPropagation()
                      }}>

                      {auth?.user?.name}

                      <svg className="h-5 w-5 text-gray-800" >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                      </svg>

                    </button>
                  </div>

                  {isMenuOpen &&
                    <div
                      className="absolute right-12 top-16 md:right-0 md:top-12 z-10 mt-2 origin-top-right rounded-md bg-black text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                      <div className="py-1">

                        <Link to={`/dashboard/${auth?.user?.isAdmin === 1 ? 'admin' : 'user'}`} className='block px-4 py-2'>
                          <li >Dashboard</li>
                        </Link>

                        <Link to="/" className='block px-4 py-2' onClick={handleLogout}>
                          <li >Log out</li>
                        </Link>

                      </div>
                    </div>
                  }
                </div>

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


