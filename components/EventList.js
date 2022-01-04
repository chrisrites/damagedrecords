// import React from 'react'
import Link from 'next/link';
import { Segment } from 'semantic-ui-react'
import stringifyDate from '../utils/stringifyDate'
import globalStyles from '../static/styles/global.module.scss'

function EventList({ events }) {

    function mapEventsToSegment(){
        return (
            events.map((event, idx) => (
                <div id={globalStyles.eventListContainer} key={idx}>
                    <div id={globalStyles.title}><Link href={`/events/${event._id}`}><h3 id={globalStyles.titleH3}>{event.title}</h3></Link></div>
                    <div id={globalStyles.eventDate}><span>{stringifyDate(event.date)}</span></div>
                        {/* <p>{event.description}</p> */}
                    <div id={globalStyles.relevantLinks}>
                        <div id={globalStyles.relevantLinksBlock}>
                            {event.links.map((link, idx) => (
                                <a key={idx} href={link.link}><h5>{link.linkName}</h5></a>
                            ))}
                        </div>
                    </div>
                    <div id={globalStyles.artists}>
                        {event.artists.map((artist, idx) => (
                            <Link key={idx} href={`/artists/${artist.path}`}><h4 id={globalStyles.artistsh4}>{artist.name}</h4></Link>
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
