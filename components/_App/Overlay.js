import Link from 'next/link';
// import Router, { useRouter } from 'next/router';
import styles from '../../static/styles/overlay.module.scss';
import { handleLogout } from '../../utils/auth'

function Overlay({ user, overlayHeight, toggleOverlay }) {
    const isRoot = user && user.role === 'root'
    const isAdmin = user && user.role === 'admin'
    const isRootOrAdmin = isRoot || isAdmin

    function toggleOverlayAndLogout(){
        toggleOverlay("0%")
        handleLogout()
    }

    return (
        <div id={styles.overlayContainer} style={{ height: overlayHeight }}>
            <p id={styles.closeBtn} onClick={() => toggleOverlay("0%")}>&times;</p>
            <div id={styles.overlayContent}>
                <div className={styles.overlayLinks} onClick={() => toggleOverlay("0%")}>
                    <Link href="/store" >Store</Link>
                </div>
                <div className={styles.overlayLinks} onClick={() => toggleOverlay("0%")}>
                    <Link href="/cart" >Cart</Link>
                </div>
                {isRootOrAdmin &&
                    <div className={styles.overlayLinks} onClick={() => toggleOverlay("0%")}>
                        <Link href="/admin">Admin</Link>
                    </div>
                }
                {user ? (<>
                    <div className={styles.overlayLinks} onClick={() => toggleOverlay("0%")}>
                        <Link href="/account">Account</Link>
                    </div>
                    <div className={styles.overlayLinks} onClick={toggleOverlayAndLogout}>
                        <Link href="/">Logout</Link>
                    </div>
                </>
                )
                    :
                    (<>
                        <div className={styles.overlayLinks} onClick={() => toggleOverlay("0%")}>
                            <Link href="/login">Login</Link>
                        </div>
                        {/* <div className={styles.overlayLinks} onClick={() => toggleOverlay("0%")}>
                            <Link href="/signup">Signup</Link>
                        </div> */}
                    </>)}
            </div>
        </div >
    )
}

export default Overlay;
