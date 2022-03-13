// import React from 'react'
import Link from 'next/link';
// import { Segment } from 'semantic-ui-react'
import stringifyDate from '../utils/stringifyDate'
import globalStyles from '../static/styles/global.module.scss'

function EventList({ events }) {

    function mapEventsToSegment(){
        return (
            events.map((event, idx) => (
                <div className={globalStyles.eventListContainer} key={idx}>
                    <div className={globalStyles.title}><Link href={`/events/${event._id}`}><h3 className={globalStyles.titleH3}>{event.title}</h3></Link></div>
                    <div className={globalStyles.eventDate}><span>{stringifyDate(event.date)}</span></div>
                        {/* <p>{event.description}</p> */}
                    <div className={globalStyles.relevantLinks}>
                        <div className={globalStyles.relevantLinksBlock}>
                            {/* {event.links.map((link, idx) => (
                                <a key={idx} href={link.link}><h5>{link.linkName}</h5></a>
                            ))} */}
                            <h5 className={globalStyles.artistsh4}>{event.city}</h5>
                        </div>
                    </div>
                    <div className={globalStyles.artists}>
                        {event.artists.map((artist, idx) => (
                            <Link key={idx} href={`/artists/${artist.path}`}><h4 className={globalStyles.artistsh4}>{artist.name}</h4></Link>
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
