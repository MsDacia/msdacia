<?php include('includes/htmlheader.php'); ?>
	<title>MsDacia's Resume :: msdacia.com</title>
</head>

<?php $page = 'resume'; ?>

<body id="<?php echo $page; ?>">

	<div data-role="page">
		<div id="wrapper">

<?php include('includes/home-link.php'); ?>
			<div id="back-top">
<?php include('includes/back-to-top.php'); ?>
			</div>
			<div id="back-bottom">
<?php include('includes/back-to-bottom.php'); ?>
			</div>

			<section id="mainContent" class="resume" data-role="content">

				<h1>Dacia Rodrigue</h1>
				<p>Chicago, Illinois<br />
				<a href="media/miscellaneous/DaciaJamesResumeAll.pdf">download resume (.pdf)</a>

<?php
	$filename = 'media/miscellaneous/DaciaJamesResumeAll.pdf';
	if (file_exists($filename)) {
		echo "<br /><span>(last modified: <span>" . date ("F d Y H:i:s.", filemtime($filename)) . "</span>)</span>";
	}
?>
				</p>

				<h3>Career Objective</h3>
				<p>12+ year of front-end web developer experience working with diverse clients and projects, showcasing my strong development and leadership skills. I have expert-level knowledge of W3C standards, cross-browser/platform development, accessibility, and a solid understanding of the principles of information architecture. I have the ability to quickly hand-code clean HTML/CSS from Photoshop/Sketch/Zeplin mock-ups, functional specs and use cases, with understanding of interaction design and user-centered design methods and practices. I have experience in refactoring existing codebase and in understanding existing implementations to decide to refactor or rewrite. I enjoy working in Agile development and am extremely comfortable with SCRUM process.</p>


				<h3>Skills and Qualifications</h3>
				<div class="contentBlock">
					<div data-role="collapsible">
						<h4>Development</h4>
						<p><strong><em>Front-End:</em></strong> HTML5 (jade), CSS (LESS, SASS), XML/XSLT, JSON, YAML, Twig<br />
						<strong><em>JavaScript:</em></strong> jQuery, Dojo, AJAX, Node, Grunt, Gulp, Bower, Bootstrap, Angular, Backbone, Handlebars, React, vue.js<br />
						<strong><em>Coding Environment/CMS:</em></strong> PHP, SQL, WordPress, Craft CMS, Squarespace, Hybris, Adobe CQ/AEM, Squarespace</p>
					</div>

					<div data-role="collapsible">
						<h4>Tools</h4>
						<p><strong><em>Project Management:</em></strong> Jira, Sharepoint, Google Suite, Quip, Trello<br />
						<strong><em>Bug Tracking:</em></strong> Jira, Sharepoint, @Task, SiteLife, BugZilla, Redmine<br />
						<strong><em>Versioning:</em></strong> Tortoise SVN, VCS, Versions, gitHub, Bitbucket, VisualSVN</p>
					</div>

					<div data-role="collapsible">
						<h4>Links</h4>
						<ul data-role="listview">
							<li><a href="portfolio.php" target="_blank">Portfolio</a></li>
		          <li><a href="http://www.linkedin.com/in/dessin" target="_blank">LinkedIn</a></li>
		          <li><a href="https://github.com/MsDacia" target="_blank">GitHub</a></li>
						</ul>
					</div>
				</div>


				<h3>Work Experience</h3>
				<div class="contentBlock">
					<div data-role="collapsible-set">
						<div data-role="collapsible">
							<h4>Senior Presentation Layer Developer<span>, 05/2016 to 02/2017</span></h4>
							<p><strong><em>Razorfish Commerce</em></strong>, Remote</p>

							<ul>
								 <li>Creating of all coded presentation layer deliverables utilizing HTML5, JavaScript, CSS3, Backbone, SASS, JSON within Adobe AEM/CQ and Hybris</li>
								 <li>Converting HTML pages from Sketch/Zeplin to microsites and landing pages for clients</li>
								 <li>Working within agile, SCRUM-based environment on large commerce accounts</li>
								 <li>Architecting client sites using Grunt/Gulp, setting up project framework and developing single-page applications using AWS</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Senior Front-End Web Developer<span>, 05/2016 to 11/2016</span></h4>
							<p><strong><em>SuperHumane</em></strong>, Remote</p>

							<ul>
								 <li>Developed templates, including responsive web design using SASS and HTML, JSON/Twig within JSX React templates from Invision and Sketch mockups</li>
								 <li>Designed JSON API within Craft CMS</li>
								 <li>Participated in daily stand-up meetings, sprint planning meetings, and retrospective via Google Hangouts</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Senior Front-End Web Developer<span>, 03/2015 to 07/2016</span></h4>
							<p><strong><em>Independent Contractor</em></strong>, Chicago, Illinois</p>

							<ul>
								 <li>Developing HTML5/CSS3 front-end templates, sites and applications, including responsive web design using technologies including but not limited to CSS, HTML, AJAX, JavaScript (jquery, dojo, Bootstrap, Backbone, handlebars.js, and Angular.js), XML/XSLT, API, and JSON/YAML, while working efficiently with a strong attention to detail and accuracy</li>
								 <li>Designed and maintained a variety of single and multi-page websites for clients, including Hyatt Special Event (Adobe CQ), Intel POS (multi-platform/Angular), McDonalds, <a href="http://allstateveterans.com" target="_blank" class="external">Allstate Veterans</a> (PHP), <a href="https://cavalry.squarespace.com/" target="_blank" class="external">Cavalry</a> (Squarespace), <a href="http://czarnowski.com" target="_blank" class="external">Czarnowski</a> (WordPress), <a href="http://resqbiz.com" target="_blank" class="external">Resq</a> (WordPress), <a href="http://advocate.io" target="_blank" class="external">Advocate</a> (WordPress)</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Senior Front-End Web Developer<span>, 12/2013 to 06/2015</span></h4>
							<p><strong><em>Peapod</em></strong>, Chicago, Illinois</p>

							<ul>
								 <li>Produced HTML5/CSS page templates from master source documents for desktop and mobile web applications using technologies including but not limited to CSS, HTML, AJAX, JavaScript, backbone.js, XML/XSLT, JSP, API, JSON, and ATG/Oracle CMS</li>
								 <li>Developed front-end sites and applications, including responsive web design, vanilla JavaScript, RESTful API integration, and rich media production and social media integration while working efficiently with a strong attention to detail and accuracy</li>
								 <li>Websites serviced include:
									<ul>
										<li>GIANT Foods, Landover (<a href="http://giantfood.com" target="_blank" class="external">Giant Foods</a>)</li>
										<li>Giant Foods, Carlisle (<a href="http://giantfoodstores.com" target="_blank" class="external">Giant Food Stores</a>)</li>
										<li>Martins Foods (<a href="http://martinsfoods.com" target="_blank" class="external">Martins Foods</a>)</li>
										<li>Martins Food (Richmond) (<a href="http://richmond.martinsfoods.com" target="_blank" class="external">Martins Foods</a>)</li>
										<li>Stop and Shop (<a href="http://stopandshop.com" target="_blank" class="external">Stop and Shop</a>)</li>
									</ul>
								</li>
								 <li>Created and maintained the UI toolkit and other internal projects in ATG Business Control Center, the internal CMS</li>
								 <li>Developed in agile development environment, including scrums, backlog grooming, sprint development timelines</li>
								 <li>Handled the deployment process for the end of sprint code release to production</li>
								 <li>Created documentation for processes and standards</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Senior Front-End Web Developer<span>, 07/2010 to 12/2013</span></h4>
							<p><strong><em>Acquity Group</em></strong>, Chicago, Illinois</p>

							<ul>
								 <li>Expertise in producing HTML5/CSS page templates from master source documents for desktop and mobile web applications using technologies including but not limited to CSS, HTML, AJAX, JavaScript, XML/XSLT, JSP, PHP, API, JSON, and CMS’ such as Adobe CQ and Hybris</li>
								<li>Expertise coaching front-end developers in standards, compliant methodologies, repeatable processes, cross browser, and cross platform website and application development, including building out our formal QA process</li>
								<li>Architecting and developing front-end sites and applications, including responsive web design, JavaScript (both jQuery and dojo frameworks), RESTful API integration, and rich media production and social media integration while working efficiently with a strong attention to detail and accuracy</li>
								<li>Providing appropriate guidance and oversight to team members to ensure quality of deliverables</li>
								<li>Providing estimates on project deliverables based on level of effort, resources, and requirements</li>
								<li>Mentoring Junior Front-End Developers and college hires to further their knowledge and professional growth</li>
								<li>Understanding of W3C and Accessibility guidelines, cross-browser and cross-platform concepts and concerns</li>
								<li>Developing in agile development environment, including scrums, sprint development timelines</li>
								<li>Project lead for camaraderie committee used to enhance retention and inter-office cohesion</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Web Developer (Independent Contractor)<span>, 02/2004 to 12/2011</span></h4>
							<p>Chicago, Illinois</p>

							<ul>
								 <li>Designed and hand-coded semantic websites using HTML/CSS3, JavaScript with jQuery, AJAX, PHP, MySQL, XML/XSLT</li>
								 <li>Designed and maintained a variety of single and multi-page websites for clients</li>
								 <li>Created symptom checker tool for American Academy of Pediatrics (<a href="http://healthychildren.org/english/tips-tools/symptom-checker/Pages/default.aspx" target="_blank" class="external">Symptom Checker</a>) using XHTML/CSS3 and jQuery as a short-term contractor</li>
								 <li>Modified and reformatted templates for 60+ online news publications, including <a href="http://suntimes.com" target="_blank" class="external">suntimes.com</a>, with Sun-Time Media using XHTML/CSS3 and JavaScript with jQuery framework as a short-term contractor</li>
								 <li>Worked with third-party affiliates in implementing Sun-Times Media templates, including trouble-shooting and modified page structure</li>
								 <li>Provided both front- and back-end web development using XHTML/CSS3, PHP, and JavaScript, as well as, bug-fixing and QA testing for <a href="http://pizzahut.com" target="_blank" class="external">PizzaHut.com</a> redesign with primary focus on IE6 with Quik Order as a short-term contractor</li>
								 <li>Executed cross-browser QA testing and debugging</li>
								 <li>Developed web standards and ensuring accessibility and W3C compliance</li>
								 <li>Produced web assets, by slicing and editing images in Photoshop and page layout</li>
								 <li>Utilized experience and judgment to plan around milestone schedules</li>
								 <li>Managed multiple deadline driven projects</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Front-End Web Developer (Contractor at Whittman Hart)<span>, 12/2009 to 07/2010</span></h4>
							<p><strong><em>Instant Technology</em></strong>, Chicago, Illinois</p>

							<ul>
							    <li>Contracted with Whittman Hart as a front-end web developer</li>
							    <li>Hand-coded pixel-perfect website for client, Saatchi &amp; Saatchi (<a href="http://www.iloveny.com" target="_blank" class="external">iloveny.com</a>) using XHTML/CSS3, JavaScript, jQuery framework, AJAX</li>
							    <li>Developed code templates within Visual Studio 2008</li>
							    <li>Produced web assets, by slicing and editing images in Photoshop</li>
							    <li>Modified existing Photoshop (PSD) files based on development needs</li>
							    <li>Ensured front-end implementations integrate with back-end functionality</li>
							    <li>Worked within an agile environment, while producing high quality work within tight deadlines</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Web Developer (Contractor at University of Chicago Booth)<span>, 02/2009 to 08/2009</span></h4>
							<p><em>The Creative Group/Robert Half Technology</em>, Chicago, Illinois</p>

							<ul>
								<li>Contracted with University of Chicago Booth School of Business (<a href="http://chicagobooth.edu" target="_blank" class="external">chicagobooth.edu</a>) in both front- and back-end web development</li>
								<li>Hand-coded semantic web pages and micro-sites in an agile environment using XHTML/CSS3, ASP .NET C# with Server Controls, JavaScript, jQuery framework, AJAX (Spry), XML/XSLT, along with RSS and Web Service integration</li>
								<li>Produced web assets, by slicing and editing images in Photoshop</li>
								<li>Integrated web services, APIs, and Google Mash-ups</li>
							    <li>Developed within OmniUpdate, Hobsons, Cogix for polls and surveys, Convio for emails, surveys, and database management</li>
							    <li>Executed cross-browser QA testing and debugging</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Front-End Web Developer<span>, 06/2008 to 01/2009</span></h4>
							<p><strong><em>Acquity Group</em></strong>, Chicago, Illinois</p>

							<ul>
								<li>Project lead for camaraderie committee used to enhance retention and inter-office cohesion</li>
								<li>Project lead for coordinating inter-office HTML coding standards process</li>
								<li>Hand-coded pure pixel-perfect HTML/CSS templates and project work files using XHTML/CSS3, JavaScript, jQuery framework, AJAX, and XML/XSLT that validate to W3C standards in an agile environment</li>
								<li>Reviewed deliverable code/pages for cross-platform and cross-browser defeats and bugs</li>
								<li>Assisted in the development of standards, methodologies and repeatable processes for delivery of creative services</li>
								<li>Participated in small, self organized development teams utilizing agile development methodologies</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Web Marketing Developer<span>, 04/2007 to 06/2008</span></h4>
							<p><strong><em>Lightology</em></strong>, Chicago, Illinois</p>

							<ul>
								<li>Programmed online store (<a href="http://lightology.com" target="_blank" class="external">lightology.com</a> and <a href="http://modernlighting.com" target="_blank" class="external">modernlighting.com</a>) and intranet using XHTML/CSS3, JavaScript, script.aculo.us/Prototype framework, AJAX, PHP, MySQL, MSSQL, and ColdFusion</li>
								<li>Produced web assets, by slicing and editing images in Photoshop</li>
								<li>Implemented website optimization and search optimization</li>
								<li>Monitored status and progress of websites with Google Analytics</li>
								<li>Tested website for functionality for cross-browser and cross-platform issues and enforced coding W3C standards</li>
								<li>Fixed server- and client-side errors generated on website</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Marketing Associate<span>, 01/2006 to 04/2007</span></h4>
							<p><strong><em>Professional Education Institute</em></strong>, Burr Ridge, Illinois</p>

							<ul>
								<li>Administered all aspects of the day to day management of our "Go To Market" process, including conducting weekly cross-functional test grid meetings, maintaining and scheduling approved test grid activity, updating and maintaining grid based on weekly media forecasts and actual performance, reevaluating scheduled initiatives to align with resulting changes due to performance</li>
								<li>Updated and maintained new "Segmented" test grid to track testing with channel diversification efforts including Spot TV, Direct Mail, Inquiry, Statement Inserts, and Web Acquisitions</li>
								<li>Lead associate for the execution and result gathering for satisfaction surveys via Survey Monkey and implementing quarter to quarter comparison of survey results</li>
								<li>Developed and maintained an overall state of the business document which provides a view to the PEI business performance, market information, and industry trends via Microsoft Excel</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Director of Financial Planning<span>, 04/2005 to 01/2006</span>
							<br />Financial Planning Advisor<span>, 01/2005 to 03/2005</span></h4>
							<p><strong><em>Career Colleges of Chicago</em></strong>, Chicago, Illinois</p>

							<ul>
								<li>Created Microsoft Excel files to handle manual record-keeping, using many advanced Excel functions</li>
								<li>Developed a strategic method of bring in loan disbursements on time as scheduled</li>
								<li>Developed a standard work breakdown structure and schedule templates to improve day to day processes</li>
								<li>Provided project management in inter-departmental projects, reports, and yearly audits</li>
								<li>Redesigned and copyedited student manual and other documents in a reader/user friendly format</li>
								<li>Promoted from Financial Planning Advisor to Director of Financial Planning within 3 month</li>
							</ul>
						</div>

						<div data-role="collapsible">
							<h4>Student Financial Services Processor<span>, 06/2003 to 01/2005</span></h4>
							<p><strong><em>Cooking &amp; Hospitality Institute of Chicago</em></strong>, Chicago, Illinois</p>

							<ul>
								<li>Created an Excel database log, using a Pivot Chart to track daily file output</li>
								<li>Reduced Past Due Cash deficit by $3,000,000 in 3 months</li>
								<li>Created documents (manuals, job aids, questionnaires), presentations, and websites to be used for training</li>
							</ul>
						</div>
					</div> <!-- end collapsible-set -->
				</div> <!-- end content block -->

				<h3>Education</h3>
				<p><strong><em>Illinois Institute of Technology</em></strong>, Chicago, Illinois, 08/1997 to 05/2002</p>
				<p><strong>Major:</strong> Professional and Technical Communications, Bachelor of Science Degree<br />
				<strong>Minor:</strong> Management<br />
				<strong>Specialization:</strong> CAD &amp; Graphics Design for Non-Engineers</p>

			</section> <!-- end mainContent -->

<?php include('includes/navigation.php'); ?>
<?php include('includes/footer.php'); ?>

		</div>
	</div>

<?php include('includes/htmlfooter.php'); ?>
