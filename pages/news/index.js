import axios from 'axios'
import Link from 'next/link';
import NewsList from '../../components/NewsList'
import baseUrl from '../../utils/baseUrl'
import stringifyDate from '../../utils/stringifyDate'
import getExcerpt from '../../utils/getExcerpt';
import { Image } from 'semantic-ui-react'
import { mapRelevantLinks, mapArtistsLinks } from '../../utils/mapLinks'
import globalStyles from '../../static/styles/global.module.scss'
import newsStyles from '../../static/styles/news.module.scss'

function News({ singleNews, newsItems }) {

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer}>
          <div id={newsStyles.mainFeature}>
            <h2 id={globalStyles.newsh2}><Link href={`/news?_id=${singleNews._id}`}>{singleNews.title}</Link></h2>
            <Image id={newsStyles.mainImage} src={singleNews.image}></Image>
            <h4 id={newsStyles.heading4}>{stringifyDate(singleNews.date)}</h4>
            <p id={newsStyles.paragraph}>{singleNews.content}</p>
            <div id={newsStyles.relevantLinks}>
              {mapRelevantLinks(singleNews)}
              {mapArtistsLinks(singleNews)}
            </div>
            <h2>More News</h2>
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
