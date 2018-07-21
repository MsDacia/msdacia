/**
 * Augment the typings of Vue.js
 */

import firebase from 'firebase/app'
import Vue from 'vue'
import VueFire from 'vuefire'

import '@firebase/database'

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		firebase?: Record<string, VueFire.FirebaseDataSource>
	}
}
