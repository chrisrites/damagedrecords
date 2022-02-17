import axios from 'axios'
import NewsList from '../../components/NewsList'
import baseUrl from '../../utils/baseUrl'
import stringifyDate from '../../utils/stringifyDate'
// import getExcerpt from '../../utils/getExcerpt';
import { Image } from 'semantic-ui-react'
import { mapRelevantLinks, mapArtistsLinks } from '../../utils/mapLinks'
import globalStyles from '../../static/styles/global.module.scss'
import styles from '../../static/styles/news.module.scss'

function News({ singleNews, newsItems }) {

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer  + " container"}>
          <div id={styles.mainFeature}>
            <h2 className={globalStyles.newsh2} id={styles.mainFeatureh2}>{singleNews.title}</h2>
            <Image id={styles.mainImage} src={singleNews.image}></Image>
            <h4 className={globalStyles.heading4}>{stringifyDate(singleNews.date)}</h4>
            <p id={styles.paragraph}>{singleNews.content}</p>
            <div className={globalStyles.relevantLinks}>
              {mapRelevantLinks(singleNews)}
              {mapArtistsLinks(singleNews)}
            </div>
            <h2 className={globalStyles.newsh2} id={styles.moreNewsh2}>More News</h2>
            <NewsList news={newsItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

// query is destructured from ctx, and _id is destructured from query
// News.getInitialProps = async ({ query: { _id } }) => {
export async function getServerSideProps ({ query: { _id } }) {
  const url = `${baseUrl}/api/news`
  const payload = { params: { _id } }
  const response = await axios.get(url, payload)
  return response.data
}

export default News;
