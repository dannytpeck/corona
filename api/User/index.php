<?php

	$url = 'https://mywellmetrics.com/api/User?response=json'
		. '&e=' . $_POST['e']
		. '&psk=' . $_POST['psk']
		. '&participantcode=' . $_POST['participantcode'];

	// Initialize curl
	$ch = curl_init();

	// Set curl options
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// Limeade can take awhile, so let's give it an extra minute
	set_time_limit(60);

	// Execute request, store response
	$response = curl_exec($ch);

	// Close curl connection
	curl_close($ch);

	// Echo response back to requestor
	echo $response;

?>
