interface JQuery<TElement extends Node = HTMLElement> extends Iterable<TElement> {

	accordion(options?: SemanticUI.AccordionOptions): JQuery

	checkbox(): JQuery

	dropdown(options?: SemanticUI.DropdownOptions): JQuery

		/**
     * Sets selected values to exactly specified values, removing current
     * selection.
     */
	dropdown(behavior: 'set exactly', values: string[]): JQuery

		/**
     * Sets value as selected.
     */
	dropdown(behavior: 'set selected', value: string): JQuery

		/**
     * Adds a group of values as selected.
     */
	dropdown(behavior: 'set selected', values: string[]): JQuery

	dropdown(behavior: 'set selected', values: string | string[]): JQuery

	dropdown(behavior: 'toggle'): JQuery

	modal(options?: SemanticUI.ModalOptions): JQuery

		/**
     * Hides the modal.
     */
	modal(behavior: 'hide'): JQuery

		/**
     * Setting to false will not allow you to close the modal by clicking on the
     * dimmer.
     */
	modal(behavior: 'setting', setting: 'closable', closable: boolean): JQuery

		/**
     * Named transition to use when animating menu in and out.
     */
	modal(behavior: 'setting', setting: 'transition', transition: 'scale'): JQuery

		/**
     * Shows the modal.
     */
	modal(behavior: 'show'): JQuery

	modal(behavior: 'refresh' | 'show dimmer' | 'toggle'): JQuery

	popup(options?: SemanticUI.PopupOptions): JQuery

	sidebar(): JQuery

		/**
     * Attaches sidebar action to given selector. Default event if none
     * specified is toggle.
     */
	sidebar(behavior: 'attach events', selector: string, event?: string): JQuery

		/**
     * Hides sidebar.
     */
	sidebar(behavior: 'hide'): JQuery

	/**
	 * Settings sidebar.
	 */
	sidebar(behavior: 'setting', setting: 'transition', transition: string): JQuery

		/**
     * Shows sidebar.
     */
	sidebar(behavior: 'show'): JQuery

		/**
     * Toggles visibility of sidebar.
     */
	sidebar(behavior: 'toggle'): JQuery

}

declare namespace SemanticUI {

	export interface AccordionOptions {

		selector?: {
			accordion?: string;
			content?: string;
			title?: string;
			trigger?: string;
		}

				/**
         * Callback on element open or close.
         */
		onChange?: () => void

				/**
         * Callback after element is closed.
         */
		onClose?: () => void

				/**
         * Callback before element closes.
         */
		onClosing?: () => void

				/**
         * Callback after element is open.
         */
		onOpen?: () => void

				/**
         * Callback before element opens.
         */
		onOpening?: () => void

	}

	export interface DropdownOptions {
		action?: 'activate' | 'combo' | 'hide' | 'select' | ((text: string, value: string, element: JQuery) => void)
		allowAdditions?: boolean
		forceSelection?: boolean
		fullTextSearch?: boolean
		hideAdditions?: boolean
		match?: 'both' | 'text' | 'value'
		minCharacters?: number
		onAdd?: (addedValue: string, addedText: string, $addedChoice: JQuery) => void
		onChange?: (value: string, text: string, $selectedItem: JQuery) => void
		useLabels?: boolean
		values?: Array<{
			name?: string
			selected?: boolean
			value?: string,
		}>
	}

	export interface ModalOptions {
		onApprove?: (el: HTMLElement) => boolean
		onHidden?: () => void
		onShow?: () => void
		onVisible?: () => void
	}

	export interface PopupOptions {
		content?: string
		inline?: boolean
		popup?: string
		title?: string
	}

}
