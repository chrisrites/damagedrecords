import connectDb from '../../utils/connectDb';
import Artist from '../../models/Artist';
import Event from '../../models/Event';
import NewsItem from '../../models/NewsItem';
import EventList from '../../components/EventList';
import NewsList from '../../components/NewsList';
import Link from 'next/link';
import { mapRelevantLinks } from '../../utils/mapLinks';
import { Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/artist.module.scss';

function ArtistProfile({ artist, events, news }) {
    const artst = JSON.parse(artist)
    const evnts = JSON.parse(events)
    const nws = JSON.parse(news)
    
    return (
      <div className={globalStyles.pageContainer}>
        <div id={styles.artistContainer}>
          <div className={globalStyles.darkContainer}>
            <div className={globalStyles.contentContainer}>
              <div id={styles.mainContent}>
                <div className={globalStyles.breadcrumbs}><Link href="/"><span className={globalStyles.breadcrumbLink}>Home</span></Link><span><FontAwesomeIcon icon={faChevronRight} className={globalStyles.breadcrumbChevrons} /></span><Link href="/artists"><span className={globalStyles.breadcrumbLink}>Artists</span></Link><span><FontAwesomeIcon icon={faChevronRight} className={globalStyles.breadcrumbChevrons} /></span><span className={globalStyles.breadcrumbCurrent}>{artst.name}</span></div>
                <h1 className={globalStyles.eventsh2}>{artst.name}</h1>  
                <div id={globalStyles.artistImg}> 
                  <Image src={artst.image}/>
                </div>
                {/* <h5 id={styles.allArtistsHeading}>
                  <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} />
                  <FontAwesomeIcon icon={faChevronRight} className={styles.artistChevrons} style={{marginRight: "4px"}}/>
                  <Link href="/artists">ALL ARTISTS</Link>
                  <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} style={{marginLeft: "4px"}}/>
                  <FontAwesomeIcon icon={faChevronLeft} className={styles.artistChevrons} />
                </h5> */}
                <p id={globalStyles.artistP}>{artst.bio}</p>
                <div className={globalStyles.relevantLinks} id={styles.socialLinks}>
                  {mapRelevantLinks(artst)}
                </div>
              </div>
              {Object.keys(nws).length > 0 && 
                <div>
                  <hr className={globalStyles.divider} />
                  <h2 className={`${styles.latestNewsh2} ${globalStyles.eventsh2}`}>{`Latest ${artst.name} News`}</h2>
                  <NewsList news={nws} />
                </div>
               }
            </div>
          </div>
          {Object.keys(evnts).length > 0 && 
            <div className={globalStyles.tealContainer}>
              <div className={globalStyles.contentContainer}>
                <h2 id={styles.artistEventsh2} className={`${globalStyles.eventsh2} ${styles.upcomingEventsh2}`}>{`Upcoming ${artst.name} Events`}</h2>
                <EventList events={evnts} />
              </div>
            </div>
          }
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
  