import content from '../json/static.en-us.json'

export default function AdWork() {
	return (
		<div className="ui icon ad message">
			<i className="laptop icon" />

			<div className="content">
				<div className="header">{content.common.ad.work.title}</div>
				<p>{content.common.ad.work.copy}</p>
			</div>
		</div>
	)
}
