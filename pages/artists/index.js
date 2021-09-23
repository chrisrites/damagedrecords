import connectDb from '../../utils/connectDb'
// import Artist from '../../models/Artist'
import Link from 'next/link'
// import { Container, Segment, Image } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import globalStyles from '../../static/styles/global.module.scss'
import artistsStyles from '../../static/styles/artists.module.scss'

function Artists({ artists }) {
  
  return (
    <div className={globalStyles.pageContainer}>
      <div id={artistsStyles.artistsContainer}>
        <div className={globalStyles.darkContainer}>
          <div className={globalStyles.contentContainer}>
            <h1 id={globalStyles.artistsh1}>Melted Roster (a-z)</h1>
              {artists.map(artist => (
              <div key={artist._id} >
                <Link href={`/artists/${artist.url}`}><h2 id={globalStyles.artistsh2}>{artist.name}</h2></Link> 
                <Link href={`/artists/${artist.url}`}><img src={artist.image} id={globalStyles.artistsImg} /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  const url = `${baseUrl}/api/artists`
  const response = await axios.get(url)
  return response.data
}

export default Artists;
  