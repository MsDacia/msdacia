import content from '../json/static.en-us.json'

export default function Objective() {
	return (
		<div className="ui card">
			<div className="content">
				<div className="description">
					<p>{content.resume.objective.copy}</p>
				</div>
			</div>
		</div>
	)
}
