// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb'
import Event from '../../models/Event'

connectDb()

export default async (req, res) => {
    // With this function we want to return one news Item which will be displayed in full, then the other 9 of the 10 total news items we're calling for, to be displayed under the featured news item.  We don't know if the user will have click on All News, or if they have clicked on a particular news story.
   const { event } = req.query
   let events = []
   let singleEvent = {}

   try {
        // Get today's date
        const yesterday = new Date()
        // subtract 1 from it, resulting in yesterdays date
        yesterday.setDate(yesterday.getDate()-1)
        events = await Event.find({ date: { $gte: yesterday}  }).sort({date: 'asc'})
        
        // Check if we have a query event, if we do, search the events array we just created, extract the event and move it to the front of the array
        if(event){
            for(let i=0; i < events.length; i++) {
                // Only double equal sign because news.event is an Object and event is a String
                if(events[i]._id == event) {
                    singleEvent = events[i]
                    // Now remove this event item from our events list
                    events = events.filter(evnt => evnt._id.toString() !== event)
                    // Add our featured event to the front of the array
                    events.unshift(singleEvent);
                    break
                }
            }
        }
        if(events.length === 0){
            events[0] = {
                _id: "#",
                title: "There are no new Melted Events on the horizon.  Perhaps in the future",
                image: "https://res.cloudinary.com/chrischartranddevelopment/image/upload/v1629323489/zolnccckmeqn4qjdjs28.jpg",
                date: Date.parse("2099-12-09T04:00:00.000+00:00"),
                links: [
                  {
                    link: "#",
                    linkName: "No Show"
                  }
                ],
                artists: [
                  {
                    name: "No One",
                    path: "#"
                  }
                ]
              }
        }
        console.log(events)
        // return both our single news item and our list
        res.status(200).json({ props: { events }})
    } catch (error) {
        console.error(error)
        res.status(403).send('DB/Server Error fetching events.  Please try again')
    } 
}