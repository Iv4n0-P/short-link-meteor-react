import React from 'react'
import Clipboard from 'clipboard'
import {Meteor} from 'meteor/meteor'
import moment from 'moment'

export default (props) => {

    const [justCopied, changeJustCopied] = React.useState(false)

    React.useEffect(() => {
        const clipboard = new Clipboard('#copy')
        
        return () => {
            clipboard.destroy()
            //mora se prilkom unmountanja komponente očistit svi event listeneri koji library dodaje u pozadini, čisto resource friendly
        }
    }, [justCopied])

    const renderStats = () => {
        const visitMessage = props.visitedCount === 1 ? 'visit' : 'visits'
        let visitedMessage = null

        if (typeof props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(props.lastVisitedAt).fromNow()})`
            return <p>{props.visitedCount} {visitMessage} {visitedMessage}</p>
        }
    }

    return (
        <div className="item">
        <h2>{props.url}</h2>
        <p className="item__message">{props.shortUrl}</p>
        <p className="item__message">{props.visitedCount && renderStats()}</p>
        <a className="button button--pill button-link" href={props.shortUrl} target="_blank">Visit</a>
        <button className="button button--pill" onClick={() => {
        changeJustCopied(true)
        window.setTimeout(() => {changeJustCopied(false)}, 1000)
        }} id="copy" data-clipboard-text={props.shortUrl}>{justCopied ? 'Copied' : 'Copy'}</button>
        <button className="button button--pill" onClick={()=>{Meteor.call('links.setVisibility', props._id, !props.visible)}}>{props.visible ? 'Hide' : 'Unhide'}</button>
        </div>
    )
}