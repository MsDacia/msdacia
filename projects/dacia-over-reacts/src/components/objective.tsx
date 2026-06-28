import content from '../media/json/static.en-us.json'

export default function Objective() {
	return (
		<div className="objective ui card">
			<div className="content">
				<div className="description">
					<p className="objective-headline">{content.resume.objective?.headline}</p>
					<p className="objective-subtitle">{content.resume.objective?.subtitle}</p>
					<p className="objective-copy">{content.resume.objective?.copy ?? 'Objective not available'}</p>
				</div>
			</div>
		</div>
	)
}
