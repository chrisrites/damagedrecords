import axios from 'axios'
import EventList from '../../components/EventList'
import baseUrl from '../../utils/baseUrl'
import stringifyDate from '../../utils/stringifyDate'
import { Image } from 'semantic-ui-react'
import { mapRelevantLinks, mapArtistsLinks } from '../../utils/mapLinks'

function Event({ events }) {

    function buildEventList(){
        let list = []
        for(let i = 1; i < events.length; i++){
            list[i-1] = events[i]
        }
        return list
    }

  return (
    <>
      <h2>{events[0].title}</h2>
      <h4>{stringifyDate(events[0].date)}</h4>
      <p>{events[0].description}</p>
      <Image src={events[0].image}></Image>
      {mapRelevantLinks(events[0])}
      {mapArtistsLinks(events[0])}
      <h2>More Upcoming Events</h2>
      <EventList events={buildEventList()} />
    </>
  )
}

// query is destructured from ctx, and _id is destructured from query
export async function getServerSideProps({ query: { event } }){
    const url = `${baseUrl}/api/events`
    const payload = { params: { event } }
    const response = await axios.get(url, payload)
    return response.data
}

export default Event;
