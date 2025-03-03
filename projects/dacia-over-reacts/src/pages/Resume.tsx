import Ad from '../components/ad-work'
import Education from '../components/education'
import Experience from '../components/experience'
import Objective from '../components/objective'
import Skills from '../components/skills'
import content from '../json/static.en-us.json'

export default function Resume() {
	return (
		<div>
			<div className="two wide column">
				<div className="block">
					<h1>{content.resume.title}</h1>
				</div>
			</div>

			<div className="fourteen wide column">
				<Ad />

				<address>{content.resume.address}</address>

				<p>
					<a
						href={content.resume.resumeUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="inverted file pdf outline icon" />
						{content.resume.resumeTitle}
					</a>
				</p>

				<h2 className="ui horizontal divider header">
					<i className="keyboard icon" />
					{content.resume.skills.title}
				</h2>

				<div className="ui attached segment">
					<Skills />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="id badge icon" />
					{content.resume.objective.title}
				</h2>

				<div className="ui attached segment">
					<Objective />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="desktop icon" />
					{content.resume.experiences.title}
				</h2>

				<div className="ui attached segment">
					<Experience />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="university icon" />
					{content.resume.education.title}
				</h2>

				<div className="ui attached segment">
					<Education />
				</div>
			</div>
		</div>
	)
}
