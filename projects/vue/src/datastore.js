import * as firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAtazcHXg5llmTdTqfDni28ueJYeLvxw7k",
	authDomain: "msdacia-1a521.firebaseapp.com",
	databaseURL: "https://msdacia-1a521.firebaseio.com",
	projectId: "msdacia-1a521",
	storageBucket: "",
	messagingSenderId: "270327716074"
})

export const db = firebaseApp.database()
