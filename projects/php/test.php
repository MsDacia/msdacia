<?php include('includes/htmlheader.php'); ?>
	<title>MsDacia's Coding Test :: msdacia.com</title>
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

			<h1>LazyLoad Code Test</h1>

			<a href="#" id="get-data">Get JSON data</a>
			<div id="show-data"></div>
				<!-- template -->
				<!-- template ID uses prefix 'template-' and ID of container by default -->
				<div id="lazyjson">
					<dl id="template-lazyjson">
						<dt><b>{news.title}}</b></dt>
						<dd>{{news.published}}</dd>
					</dl>
				</div>
				<!-- /template -->

			<div class="clear"></div>
		</section> <!-- end mainContent -->

<?php include('includes/navigation.php'); ?>
<?php include('includes/footer.php'); ?>

	</div>
</div>

<?php include('includes/htmlfooter.php'); ?>
