<?php
	// include ("DataConnection.php");

	session_start();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Admin | Forgot Password</title>
		<script src="https://kit.fontawesome.com/d4e5e909e1.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="stylesheet" type="text/css" href="../../public_html/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
	</head>

	<body class="bg-color">
        <div class="row login-box box-shadow rounded-2 bg-white">
            <form action="#" method="post" class="col p-4">
                <div class="row mb-3 text-center">
                    <div class="col">
                        <img src="../../public_html/images/logo3.png">
                    </div>
                </div>
                <div class="row mb-4 text-center">
                    <h2>Forgot Password</h2>
                </div>
                <div class="row mb-4">
                    <div class="input-group">
                        <div class="input-group-text"><i class="fal fa-at"></i></div>
                        <input type="text" name="admin_email" class="form-control" placeholder="Email address">
                    </div>
                </div>
                <div class="row mb-2 login-btn">
                    <button type="submit" name="forgotpass" class="btn btn-warning btn-block">Reset Password</button>
                </div>
                <div class="row mb-4 forgotpass login-btn">
                    <a href="login.php" class="btn btn-danger btn-block">Back</a>
                </div>
            </form>
        </div>
	</body>
</html>