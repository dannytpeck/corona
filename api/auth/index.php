<?php

	$url = 'https://api.limeade.com/identity/connect/token';

	$params = array(
		'grant_type' => 'password',
		'scope' => 'openid apiaccess',
		'username' => 'adurotrackinguser',
		'password' => 'partner1!',
		'client_id' => 'partner_integration_aduro',
		'client_secret' => 'aduro#PRD$p@rtn3rIK'
	);

	$params_string = http_build_query($params);

	// Initialize curl
	$ch = curl_init();

	// Set curl options
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, count($params));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $params_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// Limeade can take awhile, so let's give it an extra minute
	set_time_limit(60);

	// Execute post request, store response
	$response = curl_exec($ch);

	// Close curl connection
	curl_close($ch);

	// Echo response back to requestor
	echo $response;

?>
