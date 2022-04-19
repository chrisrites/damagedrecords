import Link from 'next/link';
import { Image } from 'semantic-ui-react';
import stringifyDate from '../utils/stringifyDate';
import getExcerpt from '../utils/getExcerpt';
import globalStyles from '../static/styles/global.module.scss';

function NewsList({ news }) {

    function mapNewsToSegment(){
        return (
            news.map((newsItem, idx) => (
                <div className={globalStyles.newsListContainer} key={idx}>
                    <Link href={`/news?_id=${newsItem._id}`}><h3 className={globalStyles.heading3}>{newsItem.title}</h3></Link>
                    <div className={globalStyles.articleCard}>
                        <Link href={`/news?_id=${newsItem._id}`}>
                            <div className={globalStyles.articleThumbnail}>
                                <Image className={globalStyles.thumbnail} src={newsItem.image} />
                            </div>
                        </Link>
                        <div className={globalStyles.articleExcerpt}><h4 className={globalStyles.heading4} >{stringifyDate(newsItem.date)}</h4><p className={globalStyles.paragraph}>{getExcerpt(newsItem.content)} <Link className={globalStyles.showArticle} href={`/news?_id=${newsItem._id}`}>More</Link></p></div>
                    </div>
                </div>
            ))
        )
    }

  return (
        <div>
            {mapNewsToSegment()}
        </div>
  )
}

export default NewsList;
