import axios from 'axios'
import Link from 'next/link'
import NewsList from '../../components/NewsList'
import baseUrl from '../../utils/baseUrl'
import stringifyDate from '../../utils/stringifyDate'
import { Image } from 'semantic-ui-react'

function News({ singleNews, newsItems }) {

  function mapLinks(){
    return (
        singleNews.links.map((link, idx) => (
        <a key={idx} href={link.link}>{link.linkName}</a>
      ))
    )
  }

  function mapArtistsLinks(){
    return (
        singleNews.artists.map((artist, idx) => (
        <Link key={idx} href={`/artists/${artist}`}>{artist}</Link>
      ))
    )
  }

  return (
    <>
      <h3>{singleNews.title}</h3>
      <h4>{stringifyDate(singleNews.date)}</h4>
      <p>{singleNews.content}</p>
      <Image src={singleNews.image}></Image>
      {mapLinks()}
      {mapArtistsLinks()}
      <h2>More News</h2>
      <NewsList news={newsItems} />
    </>
  )
}

// query is destructured from ctx, and _id is destructured from query
News.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/news`
  const payload = { params: { _id } }
  const response = await axios.get(url, payload)
  return response.data
}

export default News;
