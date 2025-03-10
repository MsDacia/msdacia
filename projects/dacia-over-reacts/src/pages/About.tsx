import Wysiwyg from '../components/wysiwyg'
import content from '../media/json/static.en-us.json'

export default function About() {
	return (
		<div className="ui grid">
			<div className="two wide column">
				<div className="block">
					<h1>{content.about?.title ?? 'About'}</h1>
				</div>
			</div>

			<div className="fourteen wide column">
				<Wysiwyg />
			</div>
		</div>
	)
}
