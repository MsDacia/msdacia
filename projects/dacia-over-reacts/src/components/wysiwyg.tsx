import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import content from '../media/json/static.en-us.json'

export default function Wysiwyg() {
	return (
		<div className="ui accordion">
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<div className="ui icon message">
						<i className="heartbeat icon" />
						<div className="content">
							<div className="header">{content.about.subtitle}</div>
						</div>
					</div>
				</AccordionSummary>

				<AccordionDetails>
					<p dangerouslySetInnerHTML={{ __html: content.about.copy }} />
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<div className="ui icon message">
						<i className="desktop icon" />
						<div className="content">
							<div className="header">{content.about.subtitle2}</div>
						</div>
					</div>
				</AccordionSummary>

				<AccordionDetails>
					<p dangerouslySetInnerHTML={{ __html: content.about.copy2 }} />
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<div className="ui icon message">
						<i className="diamond icon" />
						<div className="content">
							<div className="header">{content.about.subtitle3}</div>
						</div>
					</div>
				</AccordionSummary>

				<AccordionDetails>
					<p dangerouslySetInnerHTML={{ __html: content.about.copy3 }} />
				</AccordionDetails>
			</Accordion>
		</div>
	)
}
