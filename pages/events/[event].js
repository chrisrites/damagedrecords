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
            <div className={globalStyles.breadcrumbs}><Link href="/"><span className={globalStyles.breadcrumbLink}>Home</span></Link><span><FontAwesomeIcon icon={faChevronRight} className={globalStyles.breadcrumbChevrons} /></span><Link href="/events"><span className={globalStyles.breadcrumbLink}>Events</span></Link><span><FontAwesomeIcon icon={faChevronRight} className={globalStyles.breadcrumbChevrons} /></span><span className={globalStyles.breadcrumbCurrent}>Current</span></div>
            <h2 className={globalStyles.newsh2} id={styles.mainEventh2}>{events[0].title}</h2>
            <h4 className={globalStyles.heading4} id={styles.mainEventDate}>{stringifyDate(events[0].date)}</h4>
            <Image id={styles.mainEventImg} src={events[0].image} />
            <p id={styles.description}>{events[0].description}</p>
            <div id={styles.showInfo}>
              <h6>Event Info</h6>
              <div id={styles.subInfo}>
                {events[0].date ? <p className={styles.infoItem}>Date: {stringifyDate(events[0].date)}</p> : ''}
                {events[0].venue ? <p className={styles.infoItem}>Venue: {events[0].venue}</p> : ''}
                {events[0].address || events[0].city || events[0].province || events[0].country ?
                  <div className={styles.infoItem}>
                    <span>Address:</span>
                    <address>
                      {events[0].address ? <span>{events[0].address}</span> : ''}
                      {events[0].city ? <><br /><span>{events[0].city}</span></> : ''}
                      {events[0].province ? <><br /><span>{events[0].province}</span></> : ''}
                      {events[0].country ? <><br /><span>{events[0].country}</span></> : ''}
                    </address>
                  </div>
                :
                  ''
                }
                  {events[0].price ? <p className={styles.infoItem}>Price: {events[0].price}</p> : ''}
                  {events[0].doors ? <p span className={styles.infoItem}>Doors: {events[0].doors}</p> : ''}
                  {events[0].age ? <p className={styles.infoItem}>{events[0].age}</p> : ''}
              </div>
            </div>
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
