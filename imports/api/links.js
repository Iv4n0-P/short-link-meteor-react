import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', () => {
        return Links.find({userId: Meteor.userId()})
    })
}

Meteor.methods({
    'links.setVisibility' (_id, visible) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('non-authorised')
        }

        try {
            new SimpleSchema ({
                _id: {
                    type: String,
                    min: 1
                },
                visible: {
                    type: Boolean
                }
            }).validate({_id, visible}) 
          } catch (e) {
            throw new Meteor.Error (400, e.message)
          }

        Links.update({_id: _id}, {$set: {visible}})
    },
    'links.insert' (url) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('non-authorised')
        }
        
        try {
            new SimpleSchema ({
                url: {
                    type: String,
                    regEx: SimpleSchema.RegEx.Url
                }
            }).validate({url}) 
          } catch (e) {
            throw new Meteor.Error (400, e.message)
          }

           Links.insert({
            _id: shortid.generate(), url, userId: Meteor.userId(), visible: true, visibleCount: 0, lastVisitedAt: null
        })
    },
    'links.trackVisit' (_id) {

        try {
            new SimpleSchema ({
                _id: {
                    type: String,
                    min: 1
                }
            }).validate({_id}) 
          } catch (e) {
            throw new Meteor.Error (400, e.message)
          }

        Links.update({_id}, {
            $inc:{
                visitedCount: 1
            },
            $set: {
                lastVisitedAt: new Date().getTime()
            }
        })
    }
})

export default Links