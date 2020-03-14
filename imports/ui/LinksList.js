import React from 'react'
import Links from '../api/links'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import LinkListItem from './LinkListItem'

export default () => {

    const [links, setLinks] = React.useState([])
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
       const linksTracker = Tracker.autorun(() => {
           Meteor.subscribe('links')
            setLinks(Links.find().fetch())
        }) 
        return () => {
            linksTracker.stop()
        }
    }, [])

    const renderLinks = () => {
       const filteredLinks = links.filter((link) => visible ? !link.visible : link.visible)

        if (filteredLinks.length === 0) {
            return (
                <div className="item">
                <p className="item__status-message">No links found</p>
                </div>
            )
            } else {
                return filteredLinks.map((link) => <LinkListItem key={link._id} shortUrl={Meteor.absoluteUrl(link._id)} {...link}/>)
        /* Meteor.absoluteUrl() daje recimo http://www.google.com, dok Meteor.absoluteUrl('test') daje google.com/test a mi cemo dodat id zapisa */
            }
    }

    return (
        <div>
        <label className="checkbox">
        <input className="checkbox__box" type="checkbox" checked={visible} onChange={()=>{setVisible(!visible)}}/>Show hidden links
        </label>
        {renderLinks()}
        </div>
    )
}