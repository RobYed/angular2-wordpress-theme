<!DOCTYPE html>
<html>
<head>
	<base href="<?php $url_info = parse_url( home_url() ); echo trailingslashit( $url_info['path'] ); ?>">
	<title>Home | Angular2 Wordpress Theme</title>
	<?php wp_head(); ?>
</head>
<body>
	<div id="page" ng-app="wpApp">
		<header>
			<h1>
				<a href="<?php echo home_url(); ?>">Angular2 Wordpress Theme</a>
			</h1>
		</header>

		<div ng-view></div>

		<footer>
			&copy; <?php echo date( 'Y' ); ?>
		</footer>
	</div>

	<?php wp_footer(); ?>
</body>
</html>