// import React from 'react'
import Link from 'next/link';
import { Segment } from 'semantic-ui-react'
import stringifyDate from '../utils/stringifyDate'
import styles from '../static/styles/eventList.module.scss'

function EventList({ events }) {

    function mapEventsToSegment(){
        return (
            events.map((event, idx) => (
                <div id={styles.eventListContainer} key={idx}>
                    <div id={styles.title}><Link href={`/events/${event._id}`}><h3>{event.title}</h3></Link></div>
                    <div id={styles.date}><h4>{stringifyDate(event.date)}</h4></div>
                        {/* <p>{event.description}</p> */}
                        <div id={styles.relevantLinks}>{event.links.map((link, idx) => (
                            <a key={idx} href={link.link}><h5>{link.linkName}</h5></a>
                        ))}</div>
                    <div id={styles.artists}>
                        {event.artists.map((artist, idx) => (
                            <Link key={idx} href={`/artists/${artist.path}`}><h5>{artist.name}</h5></Link>
                        ))}
                    </div>
                </div>
            ))
        )
    }

  return (
        <div>
            {mapEventsToSegment()}
        </div>
  )
}

export default EventList;
