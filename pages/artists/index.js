import connectDb from '../../utils/connectDb'
// import Artist from '../../models/Artist'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'

function Artists({ artists }) {
    // const artsts = JSON.parse(artists)

    // function mapArtists(){
    //   return (
    //     artsts.map(artst => (
    //       <div>
    //         <h1>{artst.name}</h1>  
    //         <Image src={artst.image}/>
    //         <p>{artst.bio}</p>
    //       </div>
    //     ))
    //   )
    // }

    return (
        <div>
          <h1>Artists</h1>
          {artists.map(artist => (
            <div key={artist._id}>
              <h1>{artist.name}</h1>  
              <Image src={artist.image}/>
              <p>{artist.bio}</p>
            </div>
          ))}
        </div>
    )
}

// Destructure params from context
// export async function getServerSideProps() {
//   connectDb()

  // const artistsObject = await Artist.find()
  // const artists = JSON.stringify(artistObject)
  // const artists = await Artist.find()

  // console.log("HERE IS YOUR ARTIST: " + artist)
//   return {
//     props: {
//       artists
//     }
//   }
// }

export async function getServerSideProps(){
  const url = `${baseUrl}/api/artists`
  const response = await axios.get(url)
  return response.data
}

export default Artists;
  