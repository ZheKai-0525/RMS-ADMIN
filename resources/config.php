<?php
    defined("LIBRARY_PATH")
        or define("LIBRARY_PATH", realpath(dirname(__FILE__) . '/library'));
        
    defined("TEMPLATES_PATH")
        or define("TEMPLATES_PATH", realpath(dirname(__FILE__) . '/templates'));

    defined("PUBLIC_PATH")
        or define("PUBLIC_PATH", realpath(dirname(__FILE__) . '/../public_html'));

    // db connection
    // ...

    function logout ($user) {
        // to do ...
        // Kill the session or other info
    }

    function login ($user) {
        // to do ...
        // Get the user obj
        // Store the user id and name in the session.
    }

    function user_authorized ($roles=array()) {
        // Get the user group from db
        // ...
        $user_group = null;

        // Check if the user group is included in the roles
        if (in_array($user_group, $roles)) {
            return true;
        }
        else {
            // Render unauthorised page
            // Session_
        }
    }

    function render($path, $context=array()) {
        $contentFileFullPath = TEMPLATES_PATH . "/" . $path;
        $contentFileSubPath = "./templates" . "/" . $path;

        if (count($context) > 0) {
			foreach ($context as $key => $value) {
				if (strlen($key) > 0) {
					${$key} = $value;
				}
			}
		}

        require_once(TEMPLATES_PATH . "/header.php");
	
		echo "<div id=\"container\">\n"
		   . "\t<div id=\"content\">\n";
	
		if (file_exists($contentFileFullPath) || file_exists($contentFileSubPath)) {
            if (file_exists($contentFileSubPath)) {
                require_once($contentFileSubPath);
            }
            else if (file_exists($contentFileFullPath)) {
                require_once($contentFileFullPath);
            }
		}
        else {
			/*
				If the file isn't found the error can be handled in lots of ways.
				In this case we will just include an error template.
			*/
			require_once(TEMPLATES_PATH . "/error.php");
		}
	
		// close content div
		echo "\t</div>\n";
	
		// close container div
		echo "</div>\n";
	
		require_once(TEMPLATES_PATH . "/footer.php");
    }
?>