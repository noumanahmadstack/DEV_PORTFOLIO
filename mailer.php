<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        # Replace this email with your actual email address
        $mail_to = "noumanahmad056@gmail.com";

        # Sender Data
        $name    = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["full-name"])));
        $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $phone   = isset($_POST["phone-number"]) ? trim($_POST["phone-number"]) : "";
        $subject = isset($_POST["subject"]) ? trim($_POST["subject"]) : "";
        $budget  = isset($_POST["budget"]) ? trim($_POST["budget"]) : "";
        $message = isset($_POST["message"]) ? trim($_POST["message"]) : "";

        # Validate required fields
        if (empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($subject)) {
            http_response_code(400);
            echo "Please complete all required fields and try again.";
            exit;
        }

        # Handle file upload
        $file_info = "";
        if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) {
            $allowed_types = array('jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt');
            $file_name = $_FILES["file"]["name"];
            $file_size = $_FILES["file"]["size"];
            $file_tmp = $_FILES["file"]["tmp_name"];
            $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

            # Validate file type and size (5MB max)
            if (in_array($file_ext, $allowed_types) && $file_size <= 5242880) {
                $upload_dir = "uploads/";
                if (!is_dir($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }
                $new_file_name = uniqid() . "_" . $file_name;
                $upload_path = $upload_dir . $new_file_name;

                if (move_uploaded_file($file_tmp, $upload_path)) {
                    $file_info = "Attachment: " . $file_name . " (uploaded successfully)\n";
                }
            }
        }

        # Mail Content
        $content = "New Contact Form Submission\n\n";
        $content .= "Name: $name\n";
        $content .= "Email: $email\n";
        $content .= "Phone: $phone\n";
        $content .= "Subject: $subject\n";
        $content .= "Budget: $budget\n\n";
        $content .= "Message:\n$message\n\n";
        $content .= $file_info;

        # Email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        # Send the email
        $mail_subject = "Portfolio Contact: " . $subject;
        $success = mail($mail_to, $mail_subject, $content, $headers);

        if ($success) {
            http_response_code(200);
            echo "Thank You! Your message has been sent successfully.";
        } else {
            http_response_code(500);
            echo "Oops! Something went wrong, we couldn't send your message.";
        }

    } else {
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
