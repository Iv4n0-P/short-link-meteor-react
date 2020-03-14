import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'
import '../imports/api/users'
import Links from '../imports/api/links'

Meteor.startup(() => {
    WebApp.connectHandlers.use((req, res, next) => {

        const _id = req.url.slice(1) //ovo će iz url-a npr: "/link" okinit "/" i uzet samo "link", jer je to array a on neće krenit od 0 nego od idućeg člana arraya sa indexom 1
        const link = Links.findOne({_id}) //ovo će dat ili undefined ili jedan link, jedno ili drugo

        if (link) {
            res.statusCode = 302 
            res.setHeader('Location', link.url)
            res.end()
            Meteor.call('links.trackVisit', _id)
        } else {
            next()
        }

    })
});
