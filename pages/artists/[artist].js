import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'
import Event from '../../models/Event'
import NewsItem from '../../models/NewsItem'
import EventList from '../../components/EventList'
import NewsList from '../../components/NewsList'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'

function ArtistProfile({ artist, events, news }) {
    const artst = JSON.parse(artist)
    const evnts = JSON.parse(events)
    const nws = JSON.parse(news)

    return (
      <div>
        <h1>{artst.name}</h1>  
        <Image src={artst.image}/>
        <p>{artst.bio}</p>
        <h5>{`Upcoming ${artst.name} Events`}</h5>
        <EventList events={evnts} />
        <h5>{`Latest ${artst.name} News`}</h5>
        <NewsList news={nws} />
        <Link href="/artists">ALL ARTISTS</Link>
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
  