// import React from 'react'
import Link from 'next/link';
import { Segment } from 'semantic-ui-react'
import stringifyDate from '../utils/stringifyDate'

function NewsList({ news }) {
//   const [loading, setLoading] = React.useState(false)

//   React.useEffect(() => {

//   }, )

    function mapNewsToSegment(){
        return (
            news.map((newsItem, idx) => (
                <Segment key={idx} inverted >
                    <Link href={`/news?_id=${newsItem._id}`}><h3>{newsItem.title}</h3></Link>
                    <h4>{stringifyDate(newsItem.date)}</h4>
                    <p>{newsItem.content}</p>
                    {newsItem.links.map((link, idx) => (
                        <a key={idx} href={link.link}>{link.linkName}</a>
                    ))}
                    {newsItem.artists.map((artist, idx) => (
                        <Link key={artist} href={`/artists/${artist}`}>{artist}</Link>
                    ))}
                </Segment>
            ))
        )
    }

  return (
        <div>
            {mapNewsToSegment()}
        </div>
  )
}

export default NewsList;
