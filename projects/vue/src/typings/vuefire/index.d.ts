declare module 'vuefire' {

		import firebase from 'firebase/app'
		import Vue, { PluginFunction } from 'vue'

		import '@firebase/database'

		export default VueFire

		class VueFire {

				public static install: PluginFunction<never>

		}

		namespace VueFire {

				export type VueFireArray<T> = Array<VueFireArrayElement<T>>
				export type VueFireArrayElement<T> = T & { readonly '.key': string }

				export type FirebaseDataSource
						= firebase.database.Query
						| {
								asObject?: boolean
								cancelCallback?: Function
								readyCallback?: Function
								source: firebase.database.Query,
						}

		}

}
