import content from '../media/json/static.en-us.json'
import AdWork from '../components/ad-work'
import ProjectStats from '../components/stats'
import ProjectTimeline from '../components/timeline'

export default function Portfolio() {
	return (
		<div className="portfolio ui grid">
			<div className="two wide column">
				<div className="block">
					<h1>{content.portfolio.title}</h1>
				</div>
			</div>

			<div className="fourteen wide column">
				<AdWork />

				<p dangerouslySetInnerHTML={{ __html: content.portfolio.copy }}></p>

				<div className="ui grid">
					<div className="two wide column">
						<h2>{content.portfolio.subtitle2}</h2>
						<ProjectStats />
					</div>

					<div id="timeline" className="fourteen wide column">
						<h2>{content.portfolio.subtitle3}</h2>
						<ProjectTimeline />
					</div>
				</div>
			</div>
		</div>
	)
}
