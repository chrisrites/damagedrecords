import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'

function ArtistProfile({ artist }) {
    const artst = JSON.parse(artist)

    return (
      <div>
        <h1>{artst.name}</h1>  
        <Image src={artst.image}/>
        <p>{artst.bio}</p>
        <Link href="/artists"><h4>All Artists</h4></Link>
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

  // console.log("HERE IS YOUR ARTIST: " + artist)
  return {
    props: {
      artist
    }
  }
}

export default ArtistProfile;
  