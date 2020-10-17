import React from 'react'
import content from '../json/static.en-us.json'

export default function Skills() {
	return (
		<table className="ui definition table">
			<tbody>
				{content.resume.skills.categories.map((skill, index) =>
					<tr key={index}>
						<td className="two wide column">{skill.title}</td>
						<td>{skill.copy}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}
