import connectDb from '../../utils/connectDb'
// import Artist from '../../models/Artist'
import Link from 'next/link'
import { Container, Segment, Image } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'

function Artists({ artists }) {
  
  return (
      <div>
        <h1>Artists</h1>
        {artists.map(artist => (
          <div key={artist._id}>
            <Link href={`/artists/${artist.url}`}>{artist.name}</Link> 
            <Link href={`/artists/${artist.url}`}><img src={artist.image}/></Link>
          </div>
        ))}
      </div>
  )
}

export async function getServerSideProps(){
  const url = `${baseUrl}/api/artists`
  const response = await axios.get(url)
  return response.data
}

export default Artists;
  