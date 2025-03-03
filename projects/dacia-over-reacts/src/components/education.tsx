import content from '../json/static.en-us.json'

export default function Education() {
	return (
		<div className="ui card">
			<div className="content">
				<div className="header">{content.resume.education.school}</div>

				<div className="meta">
					<div className="category">{content.resume.education.degree}</div>
				</div>

				<div className="description">
					<p>{content.resume.education.major}<br /><em>Major</em></p>
					<p>{content.resume.education.minor}<br /><em>Minor</em></p>
					<p>{content.resume.education.specialization}<br /><em>Specialization</em></p>
				</div>
			</div>
		</div>
	)
}
