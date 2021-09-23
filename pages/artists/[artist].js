import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'
import Event from '../../models/Event'
import NewsItem from '../../models/NewsItem'
import EventList from '../../components/EventList'
import NewsList from '../../components/NewsList'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import globalStyles from '../../static/styles/global.module.scss'
import styles from '../../static/styles/artist.module.scss'

function ArtistProfile({ artist, events, news }) {
    const artst = JSON.parse(artist)
    const evnts = JSON.parse(events)
    const nws = JSON.parse(news)

    return (
      <div className={globalStyles.pageContainer}>
        <div id={styles.artistContainer}>
          <div className={globalStyles.darkContainer}>
            <div className={globalStyles.contentContainer}>
              <h1 id={globalStyles.artistH1}>{artst.name}</h1>  
              <Image id={globalStyles.artistImg} src={artst.image}/>
              <h5 id={styles.allArtistsHeading}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} />
                <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} style={{marginRight: "4px"}}/>
                <Link href="/artists">ALL ARTISTS</Link>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} style={{marginLeft: "4px"}}/>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} />
              </h5>
              <p id={globalStyles.artistP}>{artst.bio}</p>
              <h2 id={globalStyles.newsh2}>{`Latest ${artst.name} News`}</h2>
              <NewsList news={nws} />
            </div>
          </div>
          <div className={globalStyles.tealContainer}>
            <div className={globalStyles.contentContainer}>
              <h2 id={globalStyles.eventsh2}>{`Upcoming ${artst.name} Events`}</h2>
              <EventList events={evnts} />
            </div>
          </div>
        </div>
      </div>
    )
}
  
export async function getStaticPaths(){
  connectDb()

  const artists = await Artist.find()
  // console.log("HERE ARE YOUR ARTISTS " + artists)

  const paths = artists.map(artst => ({
    params: { artist: artst.url }
  }))

  return { paths, fallback: false }
}

// Destructure params from context
export async function getStaticProps({ params }) {
  connectDb()

  const artistObject = await Artist.findOne({ url: params.artist }).exec()
  const artist = JSON.stringify(artistObject)
  const eventsObject  = await Event.find({ 'artists.name': artistObject.name })
  const events = JSON.stringify(eventsObject)
  const newsObject = await NewsItem.find({ 'artists.name': artistObject.name }).sort({date: 'desc'}).limit(3)
  const news = JSON.stringify(newsObject)

  return {
    props: {
      artist,
      events,
      news
    }
  }
}

export default ArtistProfile;
  