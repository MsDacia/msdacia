declare module 'vue-analytics' {

	import Vue, { PluginFunction } from 'vue'
	import VueRouter, { Route } from 'vue-router'

	export default VueAnalytics

	class VueAnalytics {

		public static install: PluginFunction<VueAnalytics.Options>

		/**
		 * @param category
		 * 		Typically the object that was interacted with (e.g. 'Video')
		 * @param action
		 * 		The type of interaction (e.g. 'play')
		 * @param label
		 * 		Useful for categorizing events (e.g. 'Fall Campaign')
		 * @param value
		 * 		A numeric value associated with the event (e.g. 42)
		 */
		public event(category: string, action: string, label?: string, value?: number): void
		public event(fields: VueAnalytics.Event): void

		public page(pageview: string | VueAnalytics.Pageview | VueRouter): void

	}

	namespace VueAnalytics {

		export interface AutoTrackingOptions {

			exception?: boolean
			exceptionLogs?: boolean
			ignoreRoutes?: string[]
			page?: boolean
			pageviewOnLoad?: boolean
			prependBase?: boolean
			screenview?: boolean
			skipSamePath?: boolean
			transformQueryString?: boolean
			untracked?: boolean
			pageviewTemplate?(route: Route): Pageview
			shouldRouterUpdate?(to: Route, from: Route): boolean

		}

		export interface DebugOptions {

			enabled?: boolean
			sendHitTask?: boolean
			trace?: boolean

		}

		export interface Event {

			/**
			 * The type of interaction (e.g. 'play')
			 */
			eventAction: string

			/**
			 * Typically the object that was interacted with (e.g. 'Video')
			 */
			eventCategory: string

			/**
			 * Useful for categorizing events (e.g. 'Fall Campaign')
			 */
			eventLabel?: string

			/**
			 * A numeric value associated with the event (e.g. 42)
			 */
			eventValue?: number

		}

		export interface Options {

			autoTracking?: AutoTrackingOptions
			checkDuplicatedScript?: boolean
			debug?: DebugOptions
			disableScriptLoader?: boolean
			id: string | string[] | (() => string | Promise<string>) | Promise<string>
			router?: VueRouter

		}

		export interface Pageview {

			/**
			 * URL of the page being tracked.
			 */
			location?: string

			/**
			 * The path portion of a URL. This value should start with a
			 * slash (/) character.
			 */
			page?: string

			/**
			 * The title of the page (e.g. homepage)
			 */
			title?: string

		}

	}

}
