// import connectDb from '../../utils/connectDb'
// import Artist from '../../models/Artist'
import Link from 'next/link';
// import { Container, Segment, Image } from 'semantic-ui-react'
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/artists.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Artists({ artists }) {
  
  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.artistsContainer + " container"}>
          <div className={globalStyles.breadcrumbs}><Link href="/"><span className={globalStyles.breadcrumbLink}>Home</span></Link><span><FontAwesomeIcon icon={faChevronRight} className={globalStyles.breadcrumbChevrons} /></span><span className={globalStyles.breadcrumbCurrent}>Artists</span></div>
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
  )
}

export async function getServerSideProps(){
  const url = `${baseUrl}/api/artists`
  const response = await axios.get(url)
  return response.data
}

export default Artists;
  