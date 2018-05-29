		<nav role="navigation">
			<div class="menuToggle"><a href="javascript:void(0)">menu <span>+</span></a></div>
			<ul data-role="listview">
				<li data-theme="a"><?php if ($page == 'intro') { ?>Home<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>index.php" title="MsDacia">Home</a><?php } ?></li>
				<li data-theme="a"><?php if ($page == 'about') { ?>About<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>about.php" title="About MsDacia">About</a><?php } ?></li>
				<li data-theme="a"><?php if ($page == 'resume') { ?>Resume<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>resume.php" title="Professional Resume">Resume</a><?php } ?></li>
				<li data-theme="a"><?php if ($page == 'portfolio') { ?>Portfolio<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>portfolio.php" title="Digital Portfolio" data-ajax="false">Portfolio</a><?php } ?></li>
				<!-- <li data-theme="a"><?php if ($page == 'poetry') { ?> Poetry<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>poetry.php" title="Creative Process: Poetry" data-ajax="false">Poetry</a><?php } ?></li>
				<li data-theme="a"><?php if ($page == 'convictions') { ?>Convictions<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>convictions.php" title="Personal Convictions">Convictions</a><?php } ?>
				</li> -->
			</ul>
		</nav>
