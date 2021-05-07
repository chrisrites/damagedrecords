import ImageSlider from '../components/ImageSlider'
import axios from 'axios'
import Link from 'next/link'
import baseUrl from '../utils/baseUrl'
import NewsList from '../components/NewsList'
import EventList from '../components/EventList'

function Home({ artists, news, events }) {
  return (
    <div>
      <ImageSlider artists={artists} /> 
      <NewsList news={news} />
      <Link href="/news">ALL NEWS</Link>
      <h3>Upcoming Events</h3>
      <EventList events={events} />
      <Link href="/events"><h4>All Upcoming Events</h4></Link>
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