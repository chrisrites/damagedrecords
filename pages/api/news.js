// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb'
import NewsItem from '../../models/NewsItem'

connectDb()

export default async (req, res) => {
    // With this function we want to return one news Item which will be displayed in full, then the other 9 of the 10 total news items we're calling for, to be displayed under the featured news item.  We don't know if the user will have click on All News, or if they have clicked on a particular news story.
   const { _id } = req.query
   let singleNews

   try {
        let newsItems = await NewsItem.find().sort({date: 'desc'}).limit(10)
        // Check if we have a query ID, if we do, search the newsItem array we just created, extract the newsItem and and set it as our singleNews item
        if(_id){
            for(let i=0; i < newsItems.length; i++) {
                // Only double equal sign because news._id is an Object and _id is a String
                if(newsItems[i]._id == _id) {
                    singleNews = newsItems[i]
                    // Now remove this news item from our news list
                    newsItems = newsItems.filter(news => news._id.toString() !== _id)
                    break
                }
            }

            // if we have a query string, but it doesn't match any of our news items, default to the first news item from our list
            if(!singleNews){
                singleNews = newsItems.shift();
            }
        // if we have no query string, set our single news item to the first news item in our list
        } else {
            singleNews = newsItems.shift();
        }

        // return both our single news item and our list
        // res.status(200).json({ singleNews, newsItems })
        res.status(200).json({ props: { singleNews, newsItems }})
    } catch (error) {
        console.error(error)
        res.status(403).send('DB/Server Error fetching news.  Please try again')
    } 
}