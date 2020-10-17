import React from 'react'
import Ad from './ad-work'
import Education from './education'
import Experience from './experience'
import Objective from './objective'
import Skills from './skills'
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
						<i className="inverted file pdf outline icon"></i>
						{content.resume.resumeTitle}
					</a>
				</p>

				<h2 className="ui horizontal divider header">
					<i className="keyboard icon"></i>
					{content.resume.skills.title}
				</h2>
				<div className="ui attached segment">
					<Skills />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="id badge icon"></i>
					{content.resume.objective.title}
				</h2>
				<div className="ui attached segment">
					<Objective />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="desktop icon"></i>
					{content.resume.experiences.title}
				</h2>
				<div className="ui attached segment">
					<Experience />
				</div>

				<h2 className="ui horizontal divider header">
					<i className="university icon"></i>
					{content.resume.education.title}
				</h2>

				<div className="ui attached segment">
					<Education />
				</div>
			</div>
		</div>
	)
}
