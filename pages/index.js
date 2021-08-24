import ImageSlider from '../components/ImageSlider'
import axios from 'axios'
import Link from 'next/link'
import baseUrl from '../utils/baseUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewsList from '../components/NewsList'
import EventList from '../components/EventList'
import globalStyles from '../static/styles/global.module.scss'
import styles from '../static/styles/index.module.scss'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Home({ artists, news, events }) {
  return (
    <div className={globalStyles.pageContainer}>
      <div id={styles.homeContainer}> 
        <ImageSlider artists={artists} style={{width:"100%"}}/>
        <h5 id={styles.allArtistsHeading}>
          <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} />
          <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} />
          <Link href="/artists">ALL ARTISTS</Link>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} />
          <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} />
        </h5>
        <div className={globalStyles.darkContainer}>
          <div className={globalStyles.contentContainer}>
            <h2 id={styles.newsh2}><Link href="/news">NEWS</Link></h2>
            <NewsList news={news} />
            <h5 id={styles.allNewsh5}>
              <FontAwesomeIcon icon={faChevronRight} className={styles.newsChevrons} />
              <FontAwesomeIcon icon={faChevronRight} className={styles.newsChevrons} />
              <Link href="/news">
                ALL NEWS
              </Link>
              <FontAwesomeIcon icon={faChevronLeft} className={styles.newsChevrons} />
              <FontAwesomeIcon icon={faChevronLeft} className={styles.newsChevrons} />
            </h5>
          </div>
        </div>
        <div className={globalStyles.whiteContainer}>
          <div className={globalStyles.contentContainer}>
              <h2 id={styles.eventsh2}><Link href="/events">Upcoming Events</Link></h2>
              <EventList id={styles.eventListContainer} events={events} />
              <h5 id={styles.allEventsh5}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.eventsChevrons} />
                <FontAwesomeIcon icon={faChevronRight} className={styles.eventsChevrons} />
                <Link href="/events">ALL UPCOMING EVENTS</Link>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.eventsChevrons} />
                <FontAwesomeIcon icon={faChevronLeft} className={styles.eventsChevrons} />
              </h5>
          </div>
        </div> 
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