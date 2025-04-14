import Links from '../components/links'
import Ad from '../components/ad-work'
import Education from '../components/education'
import Experience from '../components/experience'
import Objective from '../components/objective'
import Skills from '../components/skills'
import content from '../media/json/static.en-us.json'

export default function Resume() {
	return (
		<div className="ui grid resume">
			<div className="two wide column">
				<div className="block">
					<h1>{content.resume?.title ?? 'Resume'}</h1>
				</div>
			</div>

			<div className="fourteen wide column">
				<Ad />

				<address>{content.resume?.address ?? 'Address not available'}</address>

				<h2 className="ui horizontal divider header">
					<i className="keyboard icon" />
					{content.resume?.skills?.title ?? 'Skills'}
				</h2>

				<div className="ui attached segment">
					<Skills />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="id badge icon" />
					{content.resume?.objective?.title ?? 'Objective'}
				</h2>

				<div className="ui attached segment">
					<Objective />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="desktop icon" />
					{content.resume?.experiences?.title ?? 'Experience'}
				</h2>

				<div className="ui attached segment">
					<Experience />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="university icon" />
					{content.resume?.education?.title ?? 'Education'}
				</h2>

				<div className="ui attached segment">
					<Education />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="desktop icon" />
					{content.resume?.links?.title ?? 'Links'}
				</h2>

				<div className="ui attached segment">
					<Links />
				</div>
			</div>
		</div>
	)
}
