$('#oauth').click(() => {
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
      $('#user-modal .modal-body').html(`
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">participantcode</th>
              <td>${response.participantcode}</td>
            </tr>
            <tr>
              <th scope="row">username</th>
              <td>${response.username}</td>
            </tr>
            <tr>
              <th scope="row">email</th>
              <td>${response.email}</td>
            </tr>
            <tr>
              <th scope="row">firstName</th>
              <td>${response.firstName}</td>
            </tr>
            <tr>
              <th scope="row">lastName</th>
              <td>${response.lastName}</td>
            </tr>
            <tr>
              <th scope="row">employeeID</th>
              <td>${response.employeeID}</td>
            </tr>
            <tr>
              <th scope="row">birthDate</th>
              <td>${response.birthDate}</td>
            </tr>
          </tbody>
        </table>
      `);
    } else {
      $('#user-modal .modal-body').html(`
        <div class="alert alert-danger" role="alert">
          Invalid Employer Name, PSK and/or Participant Code.
        </div>
      `);
    }

    $('#user-modal').modal('show');
    console.log(response);
  });

});

$('#main-select').change(() => {
  $('#subgroup-details').hide();
  const selected = $('#main-select').val();
  switch (selected) {
    case 'Eligibility Only':
      $('#subgroup-details').css({ 'display': 'flex' });
      break;
    case 'Activity API Demo':
      break;
    default:
      break;
  }
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
    console.log(data);
  });
});

const IAe = 'WellmetricsDemo';
const IApsk = 'b3dda09c-1317-433c-9809-359ce8f2f61f';
const DannyPCode = 'eb4a90da-37f5-44ec-9147-ce98b2859cfd';
