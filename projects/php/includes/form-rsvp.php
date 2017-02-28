<?php
	$action = $_REQUEST['action'];
	if ($action == "") {
?>

<form action="" method="POST" enctype="multipart/form-data">
	<input type="hidden" name="action" value="submit" />
	<fieldset>
		<p>Will you be attending?</p>
		<label>
			<input name="rsvp" type="radio" value="yes" />
			<span>Definitely!</span>
		</label>
		<label>
			<input name="rsvp" type="radio" value="no" />
			<span>Sorry, but Happy Birthday!</span>
		</label>
		<label>
			<input name="rsvp" type="radio" value="maybe" />
			<span>Not sure yet!</span>
		</label>
	</fieldset>
	<fieldset>
		<label>
			<span>Your Name</span>
			<input name="name" type="text" value="" />
		</label>
		<label>
			<span>Your Email</span>
			<input name="email" type="email" value="" />
		</label>
		<label>
			<span>Total Guests</span>
			<input name="guests" type="number" value="" maxlength="2" />
		</label>
		<label>
			<span>Comment</span>
			<textarea name="message" rows="7" cols="30"></textarea>
		</label>
	</fieldset>
	<fieldset>
		<input type="submit" value="RSVP" />
	</fieldset>
</form>

<?php
	} else {
		$errorMessage = "";

		if (empty($_REQUEST['rsvp'])) {
			$errorMessage .= "<li>Are you coming: yes, no, or maybe. You forgot to select which one.</li>";
		}
		if (empty($_REQUEST['name'])) {
			$errorMessage .= "<li>You forgot to enter your name.</li>";
		}
		if (empty($_REQUEST['email'])) {
			$errorMessage .= "<li>You forgot to enter your email address.</li>";
		}
		if (empty($_REQUEST['guests'])) {
			$errorMessage .= "<li>You forgot to enter your total guests.</li>";
		}
		$rsvp = $_REQUEST['rsvp'];
		$name = $_REQUEST['name'];
		$email = $_REQUEST['email'];
		$guests = $_REQUEST['guests'];
		$message = $_REQUEST['message'];

		if (empty($errorMessage)) {
			$from = "From: $name <$email>\r\nReturn-path: $email";
			$subject = "New RSVP for Party";
			mail("daciaj@yahoo.com", $subject, $name, $rsvp, $guests, $message, $from);
			echo "Perfect, your RSVP has been received!";

			$fs = fopen("RSVPs.csv","a");
			fwrite($fs,$name . ", " . $email . ", " . $rsvp . ", " . $guest . ", " . $message . "\n");
			fclose($fs);

			header("Location: party.php");
			exit;
		} else if (!empty($errorMessage)) {
			echo("<p>Your RSVP was not submitted. There was an error with your form:</p>\n");
			echo("<ul>" . $errorMessage . "</ul>\n");
		}
	}
?>