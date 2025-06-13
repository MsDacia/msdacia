		<nav role="navigation">
			<div class="menuToggle"><a href="javascript:void(0)">menu <span>+</span></a></div>
			<ul data-role="listview">
				<li data-theme="a"><?php if ($page == 'intro') { ?>Home<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>index.php" title="MsDacia">Home</a><?php } ?></li>
				<li data-theme="a"><?php if ($page == 'about') { ?>About<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>about.php" title="About MsDacia">About</a><?php } ?></li>
				<li data-theme="a"><?php if ($page == 'portfolio') { ?>Portfolio<?php } else { ?><a href="<?php if ($page == 'home') { echo '../'; } ?>portfolio.php" title="Digital Portfolio" data-ajax="false">Portfolio</a><?php } ?></li>
			</ul>
		</nav>
