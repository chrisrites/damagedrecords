import { useState, useEffect } from 'react';
import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import styles from '../../static/styles/header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { handleLogout } from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


function Header({ user, toggleOverlay }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [headerScrollPos, setHeaderScrollPos] = useState("0px");
  const router = useRouter();
  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot || isAdmin

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setPrevScrollPos(window.pageYOffset);
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos || currentScrollPos === 0) {
        setHeaderScrollPos("0px");
      } else {
        setHeaderScrollPos("-70px");
        // document.getElementById("header").style.top = "-50px";
      }
      setPrevScrollPos(currentScrollPos);
      console.log(currentScrollPos);
    }
  });

  function isActive(route) {
    return route === router.pathname ? styles.active : ''
  }

  return (
    <div className={styles.headerBody} style={{ top: headerScrollPos }}>
      <div id={styles.headerContainer}>
        <nav className={styles.navBar}>
          <div id={styles.navBrand} className={isActive('/')}>
            <Link href="/">
              <div id={styles.brandAlign}>
                <div id={styles.navBrandContent}>
                  <Image id={styles.brandLogo} src="/static/logo.svg" />
                  <span id={styles.brandTitle}>MELTED WAX RECORDS</span>
                </div>
              </div>
            </Link>
          </div>
          <ul className={styles.navUl}>
            <li className={`${styles.navLi} ${isActive('/store')}`}>
              <Link href="/store">
                <div className={styles.navItems}>
                  {/* <Icon
                    className={styles.semUINavIcons}
                    name="cart"
                  /> */}
                  {/* <FontAwesomeIcon icon={faStore} className={styles.faNavIcons} /> */}
                  <span className={styles.navTitles}>Store</span>
                </div>
              </Link>
            </li>
            <li className={`${styles.navLi} ${isActive('/cart')}`}>
              <Link href="/cart">
                <div className={styles.navItems}>
                  {/* <Icon
                    className={styles.semUINavIcons}
                    name="cart"
                  /> */}
                  <span className={styles.navTitles}>Cart</span>
                </div>
              </Link>
            </li>
            {isRootOrAdmin &&
              <li className={`${styles.navLi} ${isActive('/create')}`}>
                <Link href="/create">
                  <div className={styles.navItems}>
                    {/* <Icon
                      className={styles.semUINavIcons}
                      name="add square"
                    /> */}
                    <span className={styles.navTitles}>Create</span>
                  </div>
                </Link>
              </li>
            }
            {user ? (<>
              <li className={`${styles.navLi} ${isActive('/account')}`}>
                <Link href="/account">
                  <div className={styles.navItems}>
                    {/* <Icon
                      className={styles.semUINavIcons}
                      name="user"
                    /> */}
                    <span className={styles.navTitles}>Account</span>
                  </div>
                </Link>
              </li>
              <li className={`${styles.navLi} ${isActive('/')}`} onClick={handleLogout}>
                <Link href="/">
                  <div className={styles.navItems}>
                    {/* <Icon
                      className={styles.semUINavIcons}
                      name="sign out"
                    /> */}
                    <span className={styles.navTitles}>Log Out</span>
                  </div>
                </Link>
              </li>
            </>)
              :
              (<>
                <li className={`${styles.navLi} ${isActive('/login')}`}>
                  <Link href="/login">
                    <div className={styles.navItems}>
                      {/* <Icon
                        className={styles.semUINavIcons}
                        name="sign in"
                      /> */}
                      <span className={styles.navTitles}>Login</span>
                    </div>
                  </Link>
                </li>
                <li className={`${styles.navLi} ${isActive('/signup')}`}>
                  <Link href="/signup">
                    <div className={styles.navItems}>
                      {/* <Icon
                        className={styles.semUINavIcons}
                        name="signup"
                      /> */}
                      <span className={styles.navTitles}>Signup</span>
                    </div>
                  </Link>
                </li>
              </>)}
          </ul>
          <div id={styles.menuToggle}><Icon
            id={styles.menuToggleBtn}
            name="barcode"
            onClick={() => toggleOverlay("100%")}
          /></div>
        </nav>
        </div>
    </div>
  )
}

export default Header;
