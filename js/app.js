$('#main-select').change(() => {
  $('#activity-details').hide();
  $('#subgroup-details').hide();
  const selected = $('#main-select').val();
  switch (selected) {
    case 'Activity API Demo':
      $('#activity-details').show();
      break;
    case 'Eligibility Only':
      $('#subgroup-details').show();
      break;
    default:
      break;
  }
});

$('#search-pcode').click(() => {
  const url = 'api/user/';
  const params = {
    e: $('#employer-name').val(),
    psk: $('#psk').val(),
    participantcode: $('#participant-code').val()
  };
  $.post(url, params).done((data) => {
    const response = JSON.parse(data);
    if (response.status === 'success') {
      $('#employee-id').css({
        'background-color': 'white',
        'border-color': 'initial',
        'color': 'initial'
      });
      $('#employee-id').val(response.employeeID);
    } else {
      $('#employee-id').css({
        'border-color': '#ebcccc',
        'background-color': '#f2dede',
        'color': '#a94442'
      });
      $('#employee-id').val('Invalid Employer Name, PSK and/or Participant Code.');
    }
    console.log(response);
  });

});

$('#update-subgroup').click(() => {
  const participantCode =  $('#participant-code').val();
  const subgroupColumn = $('#subgroup-column').val();
  const subgroupValue = $('#subgroup-value').val();

  const data = `ParticipantCode,${subgroupColumn}\n${participantCode},${subgroupValue}`;

  const url = 'api/upload/';
  const params = {
    e: $('#employer-name').val(),
    psk: $('#psk').val(),
    data: data
  };
  $.post(url, params).done((data) => {
    const response = JSON.parse(data);
    $('#response-modal .modal-body').html(data);
    $('#response-modal').modal('show');
    console.log(response);
  });
});

$('#auth').click(() => {
  const url = 'https://api.limeade.com/identity/connect/token';
  const params = {
    grant_type: 'password',
    scope: 'openid apiaccess',
    username: 'adurotrackinguser',
    password: 'partner1!',
    client_id: 'partner_integration_aduro',
    client_secret: 'aduro#PRD$p@rtn3rIK'
  };
  $.post(url, params).done((data) => {
    console.log(data);
    $('#partner-token').val(data.access_token);
  });
});

const myParticipantCode = 'eb4a90da-37f5-44ec-9147-ce98b2859cfd';
