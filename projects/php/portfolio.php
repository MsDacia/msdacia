<?php include('includes/htmlheader.php'); ?>
	<title>MsDacia's Portfolio :: msdacia.com</title>
</head>

<?php $page = 'portfolio'; ?>

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

		<section id="mainContent" class="resume portfolio" data-role="content">

			<h1>Portfolio</h1>
			<div class="introBlock double">
				<p>Please browse my gallery of projects. If you are using touch screen, simply tap/hold on the screenshot, otherwise, hover over the screenshot to view more details about my roles and responsibility for each project. In addition to my roles and responsibilities, there is a link to either a staging version or live version of the site. Live versions have the external icon to the right of the link. In some cases, both links are provided, and when that happens, you will see the link icon at the bottom right of the container for the live version. Unfortunately, a lot of my client work is proprietary, so I will not share code.</p>
				<h2>My Links</h2>
				<p><a href="https://github.com/MsDacia" target="_blank"><i class="fa fa-github"></i>My GitHub Repositories</a></p>
				<p><a href="https://jsfiddle.net/user/MsDacia/fiddles/" target="_blank"><i class="fa fa-jsfiddle"></i>My JSFiddle Code Snippets</a></p>
			</div>

			<div id="masonry">
<?php
				$json = file_get_contents('media/json/projects.json');
				$obj = json_decode($json);
				foreach($obj as $index => $project) {
?>
					<dl>
						<dt>
							<span><?php echo $project -> year; ?> | <?php echo $project -> name; ?></span><br />
							<img src="media/images/projects/<?php echo $project -> image; ?>" alt="<?php echo $project -> name; ?>" title="<?php echo $project -> name; ?>" width="<?php echo $project -> width; ?>" height="<?php echo $project -> height; ?>" />
						</dt>
						<dd>
							<p>
								<?php if(!empty($project -> link)) { ?>
									<a href="<?php echo $project -> link; ?>" target="_blank" class="<?php echo $project -> external; ?>">
								<?php } ?>
									<em><?php echo $project -> name; ?></em>
									<span>(<?php echo $project -> year; ?>)</span>
								<?php if(!empty($project -> link)) { ?>
									</a>
								<?php } ?>
							</p>
							<p>
								<span><?php echo $project -> text; ?></span><br />
								<em>&mdash; <?php echo $project -> client; ?></em>
								<?php if(!empty($project -> link2)) { ?>
									<a href="<?php echo $project -> link2; ?>" target="_blank" class="link" title="Live"><?php echo $project -> name; ?></a>
								<?php } ?>
							</p>
						</dd>
					</dl>
<?php
				}
?>
			</div> <!-- end masonry -->
			<div class="clear"></div>
		</section> <!-- end mainContent -->

<?php include('includes/navigation.php'); ?>
<?php include('includes/footer.php'); ?>

	</div>
</div>

<?php include('includes/htmlfooter.php'); ?>
