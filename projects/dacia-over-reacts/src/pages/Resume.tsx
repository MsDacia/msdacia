import Ad from '../components/ad-work'
import Education from '../components/education'
import Experience from '../components/experience'
import Objective from '../components/objective'
import Projects from '../components/projects'
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

				<address>
					{content.resume?.address ?? 'Address not available'}

					<div className="ui horizontal list resume-contact">
						<div className="item">
							<a href={`mailto:${content.resume.contact.email}`}>{content.resume.contact.email}</a>
						</div>

						{content.resume.contact.links.map((link, index) =>
							<div
								key={index} className="item"
							>
								<a
									href={link.url} rel="noopener noreferrer"
									target="_blank"
								>{link.title}</a>
							</div>
						)}
					</div>
				</address>

				<h2 className="ui horizontal divider header">
					<i className="id badge icon" />
					{content.resume?.objective?.title ?? 'Objective'}
				</h2>

				<div className="ui attached segment">
					<Objective />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="keyboard icon" />
					{content.resume?.skills?.title ?? 'Skills'}
				</h2>

				<div className="ui attached segment">
					<Skills />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="desktop icon" />
					{content.resume?.experiences?.title ?? 'Experience'}
				</h2>

				<div className="ui attached segment">
					<Experience />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="folder open icon" />
					{content.resume?.projects?.title ?? 'Projects'}
				</h2>

				<div className="ui attached segment">
					<Projects />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="university icon" />
					{content.resume?.education?.title ?? 'Education'}
				</h2>

				<div className="ui attached segment">
					<Education />
				</div>
			</div>
		</div>
	)
}
