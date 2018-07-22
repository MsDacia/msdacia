import firebase from 'firebase/app'

import '@firebase/database'

export const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAulsw8sn9dlmHwYFyvHP_dhWkCbdOH1Y8',
	authDomain: 'msdacia-538b9.firebaseapp.com',
	databaseURL: 'https://msdacia-538b9.firebaseio.com',
	projectId: 'msdacia-538b9',
	storageBucket: 'msdacia-538b9.appspot.com',
	messagingSenderId: '396749222687'
})

export const db = firebaseApp.database()

export const contentRef = db.ref('content')
