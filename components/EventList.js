// import React from 'react'
import Link from 'next/link';
import { Segment } from 'semantic-ui-react'
import stringifyDate from '../utils/stringifyDate'

function EventList({ events }) {

    function mapEventsToSegment(){
        return (
            events.map((event, idx) => (
                <Segment key={idx} inverted >
                    <Link href={`/events/${event._id}`}><h3>{event.title}</h3></Link>
                    <h4>{stringifyDate(event.date)}</h4>
                    {/* <p>{event.description}</p> */}
                    {event.links.map((link, idx) => (
                        <a key={idx} href={link.link}>{link.linkName}</a>
                    ))}
                    {event.artists.map((artist, idx) => (
                        <Link key={artist} href={`/artists/${artist}`}>{artist}</Link>
                    ))}
                </Segment>
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
