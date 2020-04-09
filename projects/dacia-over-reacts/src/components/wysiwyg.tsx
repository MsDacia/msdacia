import React from 'react'
import content from '../json/static.en-us.json'

export default function Wysiwyg() {
	return (
		<div className="ui accordion">
			<div className="active title">
				<div className="ui icon message">
					<i className="heartbeat icon"></i>
					<div className="content">
						<div className="header">{content.about.subtitle}</div>
					</div>
				</div>
			</div>
			<div className="active content">
				<p dangerouslySetInnerHTML={{ __html: content.about.copy }}></p>
			</div>
			<div className="title">
				<div className="ui icon message">
					<i className="desktop icon"></i>
					<div className="content">
						<div className="header">{content.about.subtitle2}</div>
					</div>
				</div>
			</div>
			<div className="content">
				<p dangerouslySetInnerHTML={{ __html: content.about.copy2 }}></p>
			</div>
			<div className="title">
				<div className="ui icon message">
					<i className="diamond icon"></i>
					<div className="content">
						<div className="header">{content.about.subtitle3}</div>
					</div>
				</div>
			</div>
			<div className="content">
				<p dangerouslySetInnerHTML={{ __html: content.about.copy3 }}></p>
			</div>
		</div>
	)
}
