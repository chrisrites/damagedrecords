import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Image } from 'semantic-ui-react';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/footer.module.scss';

function Footer() {
    
    return (
        <div className={styles.footerBody}>
            <div id={styles.footerContainer} className={globalStyles.darkContainer}>
                <div className="container">
                    <div id={styles.footerRow} className="row">
                        <div className={`col-12 col-md-6 ${styles.footerCol} ${styles.footerColLeft}`}>
                            <div id={styles.footerLogo}>
                                <Image id={styles.footerLogoImg} src="/static/img/footer_logo.webp" />
                            </div>
                            <div id={styles.contactContainer}>
                                {/* <p><address>Pembroke, ON, Canada</address></p> */}
                                <h5>
                                    Contact 
                                </h5>
                                <p>For general questions, comments & concerns, don't hesitate to reach out at: <a href="mailto:info@meltedwaxrecords.com">info@meltedwaxrecords.com</a></p> 
                            </div>
                        </div>
                        <div className={`col-12 col-md-6 ${styles.footerCol} ${styles.footerColRight}`}>
                            <a href="https://www.facebook.com" target="_blank">
                                <FontAwesomeIcon 
                                    className={styles.icons}
                                    icon={faFacebook}
                                />
                            </a>
                            <a href="https://www.instagram.com" target="_blank">
                                <FontAwesomeIcon 
                                    className={styles.icons}
                                    icon={faInstagram}
                                />
                            </a>
                            <h5>
                                Privacy & Cookies 
                            </h5>
                            <p>
                                * This site only uses cookies to manage logins.
                            </p>
                            <p>
                                We respect privacy and are not in the businenss of selling information. Your name & email address are used solely for the purpose of placing orders and will not be sold or shared in any way.
                            </p>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Footer;
