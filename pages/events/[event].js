import axios from 'axios';
import EventList from '../../components/EventList';
import baseUrl from '../../utils/baseUrl';
import stringifyDate from '../../utils/stringifyDate';
import { Image } from 'semantic-ui-react';
import { mapRelevantLinks, mapArtistsLinks } from '../../utils/mapLinks';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/events.module.scss';

function Event({ events }) {

    function buildEventList(){
        let list = []
        for(let i = 1; i < events.length; i++){
          list[i-1] = events[i]
        }
        return list
    }

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.eventsContainer + " container"}>
          <div id={styles.mainEvent}>
            <h2 className={globalStyles.newsh2} id={styles.mainEventh2}>{events[0].title}</h2>
            <h4 className={globalStyles.heading4} id={styles.mainEventDate}>{stringifyDate(events[0].date)}</h4>
            <Image id={styles.mainEventImg} src={events[0].image} />
            <p id={styles.description}>{events[0].description}</p>
            <div className={globalStyles.relevantLinks} id={styles.relevantEventLinks}>
              {mapRelevantLinks(events[0])}
              {mapArtistsLinks(events[0])}
            </div>
          </div>
        </div>
      </div> 
      <div className={globalStyles.tealContainer}>
        <div className={globalStyles.contentContainer + " " + styles.eventsContainer + " container"}>
          <h2 className={globalStyles.eventsh2} id={styles.eventsh2}>More Events</h2>
          <EventList events={buildEventList()} />
        </div>
      </div>
    </div> 
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
