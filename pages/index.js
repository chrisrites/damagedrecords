import ImageSlider from '../components/ImageSlider';
import axios from 'axios';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewsList from '../components/NewsList';
import EventList from '../components/EventList';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/index.module.scss';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Home({ artists, news, events }) {
  
  return (
    <div className={globalStyles.pageContainer}>
      <div id={styles.homeContainer}> 
        <div id={styles.sliderBackground}> 
          <div className={globalStyles.sliderContainer}> 
            <ImageSlider artists={artists} style={{width:"100%"}}/>
          </div>
        </div>
        <h5 id={styles.allArtistsHeading}>
          <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} />
          <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} style={{marginRight: "4px"}}/>
          <Link href="/artists">ALL ARTISTS</Link>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} style={{marginLeft: "4px"}}/>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} />
        </h5>
        {news.length > 0 && 
          <div className={globalStyles.darkContainer}>
            <div className={globalStyles.contentContainer + " container"}>
              <h2 className={globalStyles.newsh2}><Link href="/news">NEWS</Link></h2>
              <NewsList news={news} />
              <h5 id={globalStyles.allNewsh5}>
                <FontAwesomeIcon icon={faChevronRight} className={globalStyles.newsChevrons} />
                <FontAwesomeIcon icon={faChevronRight} className={globalStyles.newsChevrons} style={{marginRight: "4px"}} />
                <Link href="/news">
                  ALL NEWS
                </Link>
                <FontAwesomeIcon icon={faChevronLeft} className={globalStyles.newsChevrons} style={{marginLeft: "4px"}}/>
                <FontAwesomeIcon icon={faChevronLeft} className={globalStyles.newsChevrons} />
              </h5>
            </div>
          </div>
        }
        {events.length > 0 &&
          <div className={globalStyles.tealContainer}>
            <div className={globalStyles.contentContainer + " container"}>
                <h2 className={globalStyles.eventsh2}><Link href="/events">UPCOMING EVENTS</Link></h2>
                <EventList  events={events} />
                <h5 id={globalStyles.allEventsh5}>
                  <FontAwesomeIcon icon={faChevronRight} className={globalStyles.eventsChevrons} />
                  <FontAwesomeIcon icon={faChevronRight} className={globalStyles.eventsChevrons} style={{marginRight: "4px"}}/>
                  <Link href="/events">ALL UPCOMING EVENTS</Link>
                  <FontAwesomeIcon icon={faChevronLeft} className={globalStyles.eventsChevrons} style={{marginLeft: "4px"}}/>
                  <FontAwesomeIcon icon={faChevronLeft} className={globalStyles.eventsChevrons} />
                </h5>
            </div>
          </div> 
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // fetch data on the server
  const url = `${baseUrl}/api/home`  
  const response = await axios.get(url);
  return response.data
  // return response data as an object
  // note: this object will be merged with existing props
}

export default Home;