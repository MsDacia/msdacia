import content from '../media/json/static.en-us.json'

export default function Objective() {
	return (
		<div className="objective ui card">
			<div className="content">
				<div className="description">
					<p>{content.resume.objective?.copy ?? 'Objective not available'}</p>
				</div>
			</div>
		</div>
	)
}
