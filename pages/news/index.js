import axios from 'axios'

import NewsList from '../../components/NewsList'
import baseUrl from '../../utils/baseUrl'
import stringifyDate from '../../utils/stringifyDate'
import { Image } from 'semantic-ui-react'
import { mapRelevantLinks, mapArtistsLinks } from '../../utils/mapLinks'

function News({ singleNews, newsItems }) {

  return (
    <>
      <h3>{singleNews.title}</h3>
      <h4>{stringifyDate(singleNews.date)}</h4>
      <p>{singleNews.content}</p>
      <Image src={singleNews.image}></Image>
      {/* {mapLinks()} */}
      {mapRelevantLinks(singleNews)}
      {/* {mapArtistsLinks()} */}
      {mapArtistsLinks(singleNews)}
      <h2>More News</h2>
      <NewsList news={newsItems} />
    </>
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
