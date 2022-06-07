import { useState, useEffect } from 'react';
// import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import styles from '../../static/styles/header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '../../utils/auth';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


function Header({ user, toggleOverlay }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [headerScrollPos, setHeaderScrollPos] = useState("0px");
  const [transparentNav, setTransparentNav] = useState("rgba(12, 15, 10, 1)");
  const [navItemColour, setNavItemColour] = useState(null);

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
        if(currentScrollPos === 0){
          setTransparentNav("rgba(12, 15, 10, 1)");
          setNavItemColour(null);
        }
      } else {
        setTransparentNav("rgba(255, 32, 110, 0.5)");
        setNavItemColour(styles.scrolled);
      }
      setPrevScrollPos(currentScrollPos);
    }
  });

  function isActive(route) {
    return route === router.pathname ? styles.active : ''
  }

  return (
    <div className={styles.headerBody} style={{ top: headerScrollPos }}>
      <div id={styles.headerContainer} style={{ background: transparentNav }}>
        <nav className={styles.navBar}>
          <div id={styles.navBrand} >
            <Link href="/">
              <div id={styles.brandAlign}>
                <div id={styles.navBrandContent}>
                  <Image id={styles.brandLogo} src="/static/img/MW_logo.png" />
                  <span id={styles.brandTitle}>MELTED WAX RECORDS</span>
                </div>
              </div>
            </Link>
          </div>
          <ul className={styles.navUl}>
            <li className={`${styles.navLi} ${isActive('/store')}`}>
              <Link href="/store">
                <div className={styles.navItems}>
                  <span className={`${styles.navTitles} ${navItemColour}`}>Store</span>
                </div>
              </Link>
            </li>
            
            {isRootOrAdmin &&
              <li className={`${styles.navLi} ${isActive('/admin')}`}>
                <Link href="/admin">
                  <div className={styles.navItems}>
                    <span className={`${styles.navTitles} ${navItemColour}`}>Admin</span>
                  </div>
                </Link>
              </li>
            }
            {user ? (<>
              <li className={`${styles.navLi} ${isActive('/cart')}`}>
                <Link href="/cart">
                  <div className={styles.navItems}>
                    <span className={`${styles.navTitles} ${navItemColour}`}>Cart</span>
                  </div>
                </Link>
              </li>
              <li className={`${styles.navLi} ${isActive('/account')}`}>
                <Link href="/account">
                  <div className={styles.navItems}>
                    <span className={`${styles.navTitles} ${navItemColour}`}>Account</span>
                  </div>
                </Link>
              </li>
              <li className={styles.navLi} onClick={handleLogout}>
                <Link href="/">
                  <div className={styles.navItems}>
                    <span className={`${styles.navTitles} ${navItemColour}`}>Logout</span>
                  </div>
                </Link>
              </li>
            </>)
              :
              (<>
                <li className={`${styles.navLi} ${isActive('/login')}`}>
                  <Link href="/login">
                    <div className={styles.navItems}>
                      <span className={`${styles.navTitles} ${navItemColour}`}>Login</span>
                    </div>
                  </Link>
                </li>
              </>)}
          </ul>
          <div id={styles.menuToggle}>
            <FontAwesomeIcon 
              icon={faBars}
              id={styles.menuToggleBtn}
              onClick={() => toggleOverlay("100%")}
            />
          </div>
        </nav>
        </div>
    </div>
  )
}

export default Header;
