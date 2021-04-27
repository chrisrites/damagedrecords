import ImageSlider from '../components/ImageSlider'
import axios from 'axios'
import Link from 'next/link'
import baseUrl from '../utils/baseUrl'
import NewsList from '../components/NewsList'

function Home({ artists, news }) {
  return (
    <div>
      <ImageSlider artists={artists} /> 
      <NewsList news={news} />
      <Link href="/news">ALL NEWS</Link>
    </div>
  )
}

// This is a NEXT.JS function to fetch data on the server (we don't have to wait until our component is mounted like using the useEffect hook)
Home.getInitialProps = async () =>{
  // fetch data on the server
  const url = `${baseUrl}/api/home`
  // const payload = { params: { page, size } }  
  const response = await axios.get(url);
  return response.data
  // return response data as an object
  // note: this object will be merged with existing props
}

export default Home;
