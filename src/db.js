import * as firebase from 'firebase'
import 'firebase/firestore'

import configOptions from './config/config'

// Get a Firestore instance
export const db = firebase
  .initializeApp(configOptions)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore
export { Timestamp, GeoPoint, FieldValue }

import { Client } from 'elasticsearch-browser'

export const client = new Client({ hosts: 'http://elastic:Shitou_007@es.tool.ideras.com:9200', maxRetries: 3, requestTimeout: 60000 })
