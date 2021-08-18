import ImageSlider from '../components/ImageSlider'
import axios from 'axios'
import Link from 'next/link'
import baseUrl from '../utils/baseUrl'
import NewsList from '../components/NewsList'
import EventList from '../components/EventList'
import globalStyles from '../static/styles/global.module.scss'
// import styles from '../static/styles/index.module.scss'

function Home({ artists, news, events }) {
  return (
    <div class={globalStyles.contentContainer}>
      <ImageSlider artists={artists} />
      <h5 id={globalStyles.allArtistsHeading}><Link href="/artists">ALL ARTISTS</Link></h5>
      <div id={globalStyles.newsListContainer}>
        <div className="content-container">
          <h2><Link href="/news">NEWS</Link></h2>
          <NewsList id={globalStyles.newsContainer} news={news} />
          <h5><Link href="/news">ALL NEWS</Link></h5>
        </div>
      </div>
      <div id={globalStyles.eventListContainer}>
        <div className="content-container">
          <div id={globalStyles.eventContent}></div>
          <h2><Link href="/events">Upcoming Events</Link></h2>
          <EventList id={globalStyles.eventListContainer} events={events} />
          <Link href="/events">ALL UPCOMING EVENTS</Link>
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