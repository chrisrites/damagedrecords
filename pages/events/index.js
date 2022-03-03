import axios from 'axios';
import EventList from '../../components/EventList';
import baseUrl from '../../utils/baseUrl';
import Link from 'next/link';
import stringifyDate from '../../utils/stringifyDate';
import { Image } from 'semantic-ui-react';
import { mapRelevantLinks, mapArtistsLinks } from '../../utils/mapLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/events.module.scss';

function Events({ events }) {
    function buildEventList(){
      let list = []
      for(let i = 1; i < events.length; i++){
        list[i-1] = events[i]
      }
      return list
    }
    
  return (
    
    <div className={globalStyles.pageContainer}>
      {events.length > 0 &&
        <>
          <div className={globalStyles.darkContainer}>
            <div className={globalStyles.contentContainer + " " + styles.eventsContainer + " container"}>
              <div id={styles.mainEvent}>
                <div className={globalStyles.breadcrumbs}><Link href="/"><span className={globalStyles.breadcrumbLink}>Home</span></Link><span><FontAwesomeIcon icon={faChevronRight} className={globalStyles.breadcrumbChevrons} /></span><span className={globalStyles.breadcrumbCurrent}>Events</span></div>
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
          {events.length > 1 &&
            <div className={globalStyles.tealContainer}>
              <div className={globalStyles.contentContainer + " " + styles.eventsContainer + " container"}>
                <h2 className={globalStyles.eventsh2} id={styles.eventsh2}>More Events</h2>
                <EventList events={buildEventList()} />
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}

// query is destructured from ctx, and _id is destructured from query
// export async function getServerSideProps({ query: { event } }){
export async function getServerSideProps(){
    const url = `${baseUrl}/api/events`
    const response = await axios.get(url)
    return response.data
}

export default Events;
