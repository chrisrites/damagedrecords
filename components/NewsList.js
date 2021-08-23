// import React from 'react'
import Link from 'next/link';
// import { Segment } from 'semantic-ui-react'
import stringifyDate from '../utils/stringifyDate'
import globalStyles from '../static/styles/global.module.scss'
// import styles from '../static/styles/newsList.module.scss'

function NewsList({ news }) {

    function mapNewsToSegment(){
        return (
            news.map((newsItem, idx) => (
                <div id={globalStyles.newsListContainer} key={idx}>
                    <Link href={`/news?_id=${newsItem._id}`}><h3 id={globalStyles.heading3}>{newsItem.title}</h3></Link>
                    <h4 id={globalStyles.heading4} >{stringifyDate(newsItem.date)}</h4>
                    <p id={globalStyles.paragraph}>{newsItem.content}</p>
                    <div id={globalStyles.relevantLinks}>
                        {newsItem.links.map((link, idx) => (
                            <a key={idx} href={link.link}>{link.linkName}</a>
                        ))}
                        {newsItem.artists.map((artist, idx) => (
                            <Link key={idx} href={`/artists/${artist.path}`}>{artist.name}</Link>
                        ))}
                    </div>
                </div>
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
