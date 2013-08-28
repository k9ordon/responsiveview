<h1><?= $_SERVER['HTTP_USER_AGENT'] ?></h1>
<pre>
<? var_dump($_SERVER); ?>

<? if($_GET['sub'] != 1) : ?>
<iframe src="http://duro/responsiveview/t/agent.php?sub=1">
<? endif; ?>