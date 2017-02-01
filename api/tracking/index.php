<?php

	$url = 'https://api.limeade.com/api/event';

	$token = $_POST['token'];
	$participantCode = $_POST['participantcode'];
	$eventCode = $_POST['eventcode'];

	$today = date('m-d-Y');

	$data = '{"user_identifier": "' . $participantCode
		. '","event_date": "' . $today . '","event_code": "'
		. $eventCode . '","value": "1"}';

	$headers = array();
	$headers[] = 'Content-type: application/json';
	$headers[] = 'Accept: application/json';
	$headers[] = 'Authorization: Bearer ' . $token;

	// Initialize curl
	$ch = curl_init();

	// Set curl options
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
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
