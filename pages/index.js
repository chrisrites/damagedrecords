import ImageSlider from '../components/ImageSlider'
import axios from 'axios'
import Link from 'next/link'
import baseUrl from '../utils/baseUrl'
import NewsList from '../components/NewsList'
import EventList from '../components/EventList'
import globalStyles from '../static/styles/global.module.scss'
import styles from '../static/styles/index.module.scss'

function Home({ artists, news, events }) {
  return (
    <div className={globalStyles.pageContainer}>
      <div id={styles.homeContainer}> 
        <ImageSlider artists={artists} style={{width:"100%"}}/>
        <h5 id={styles.allArtistsHeading}><Link href="/artists">ALL ARTISTS</Link></h5>
        <div className={globalStyles.newsContainer}>
          <div className={globalStyles.contentContainer}>
            <h2><Link href="/news">NEWS</Link></h2>
            <NewsList id={styles.newsContainer} news={news} />
            <h5><Link href="/news">ALL NEWS</Link></h5>
          </div>
        </div>
        <div className={globalStyles.eventsContainer}>
          <div className={globalStyles.contentContainer}>
            <div id={styles.eventContent}></div>
            <h2><Link href="/events">Upcoming Events</Link></h2>
            <EventList id={styles.eventListContainer} events={events} />
            <Link href="/events">ALL UPCOMING EVENTS</Link>
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