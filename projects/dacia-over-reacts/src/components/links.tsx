import content from '../media/json/static.en-us.json'

export default function Links() {
	return (
		<div className="ui card">
			<div className="ui horizontal list">
				{content.resume.links.categories.map((link, index) =>
					<div className="item" key={index}>
						<div className="content">
							<a href={link.url} target="_blank">{link.title}</a>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
