import { style } from 'typestyle'
import { defineComponent, ref, onMounted, onUpdated, onUnmounted } from 'vue'

export default defineComponent({
	name: 'HelloWorld',
	props: {
		message: {
			type: String
		}
	},
	setup(props) {
		const count = ref(0)

		onMounted(() => {
			console.log('mounted!')
		})

		onUpdated(() => {
			console.log('updated!')
		})

		onUnmounted(() => {
			console.log('unmounted!')
		})

		return () =>
			<div>
				<h1>{props.message}</h1>
				<button onClick={() => count.value++}>count is: { count.value }</button>
				<p class={fontColor}>Edit <code>components/HelloWord.tsx</code> to test hot module replacement.</p>
			</div>
	},
})

/** convert a style object to a CSS class name */
const fontColor = style({ color: 'red' })
