function init_oauthio() {
	OAuth.initialize(credentials.app_key);
}

function authenticate(callback) {
    // Replace this with the popup authentication
}

function retrieve_user_info(result, callback) {
    // Replace this with the API request code
}

$('#login_button').click(function() {

	init_oauthio();
	authenticate(function(auth_error, result) {
		if (!auth_error) {
			retrieve_user_info(result, function(req_error, user_info) {
				if (!req_error) {
					$('#name_box').html(user_info.name);
					$('#name_box').addClass('filled');
					$('#email_box').html(user_info.email);
					$('#email_box').addClass('filled');
					$('#img_box').attr('src', user_info.avatar);
					$('#img_box').addClass('filled');
					$("#error").addClass('hidden');
				} else {
					$("#error").append('<div>An error occured during authentication</div>');
					$("#error").removeClass('hidden');
				}
			});
		} else {
			$("#error").append('<div>An error occured during authentication</div>');
			$("#error").removeClass('hidden');
		}
	});

});