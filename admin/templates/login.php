<?php
	// include ("DataConnection.php");

	session_start();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Admin | Login</title>
		<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-iKbFRxucmOHIcpWdX9NTZ5WETOPm0Goy0WmfyNcl52qSYtc2Buk0NCe6jU1sWWNB" crossorigin="anonymous">
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
                    <h2>Admin Login</h2>
                </div>
                <div class="row mb-4">
                    <div class="input-group">
                        <div class="input-group-text"><i class="fal fa-at"></i></div>
                        <input type="text" name="admin_email" class="form-control" placeholder="Email address">
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="input-group">
                        <div class="input-group-text"><i class="fal fa-lock"></i></div>
                        <input type="password" name="admin_pass" class="form-control" placeholder="Password">
                    </div>
                </div>
                <div class="row mb-4 login-btn">
                    <button type="submit" name="login" class="btn btn-warning btn-block">Sign in</button>
                </div>
                <div class="row mb-3 float-end">
                    <a href="#">Forgot Password?</a>
                </div>
            </form>
        </div>
	</body>
</html>
<?php
// if (isset($_POST['login'])) {

// 	$email = mysqli_real_escape_string($connect, $_POST['email']);
//   $password = mysqli_real_escape_string($connect, $_POST['password']);


// 	if (empty($email)) {
// 		header("Location: index.php?error=Email is required");
// 	    exit();
// 	}

// 	else if(empty($password)){
//         header("Location: index.php?error=Password is required");
// 	    exit();
// 	}

// 	else{

// 		$decrypt = md5($password);
//     $eightbit = substr($decrypt, 0, 8);
//     $sql = "SELECT * FROM admin WHERE Email='$email' AND Password='$eightbit' LIMIT 1";
//     $results = mysqli_query($connect, $sql);
// 		$row  = mysqli_fetch_array($results);

// 		if(is_array($row)) {
// 			$_SESSION["name"] = $row['Email'];
// 			$_SESSION["password"] = $row['Password'];
//         }
//         else{
//         	header("location:index.php?error= Incorect Email or password ");
//         }

// 	}

// }

// if(isset($_SESSION["name"])) {
// 	header("Location:Dashboard.php");
// }
?>
