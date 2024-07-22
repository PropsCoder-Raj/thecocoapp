exports.signupGenerateOTP = (otp) => {
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <title>Your Email Title</title>
        <style>
            * {
                font-family: 'Montserrat' !important;
            }
        </style>
    </head>

    <body>
        <table style="width: 90%; background-color: #f5f5f5; margin: 0 auto; padding: 0;">
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <img src="https://res.cloudinary.com/dh2hepu1c/image/upload/v1717493603/Logo_y7jxd9.png"
                        alt="Company Logo" width="200" height="50" />
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;font-size: 14px; line-height: 140%;">
                    <p>Hello Dear, </p>
                    <p>Thank you for signing up for <b>THECOCOAPP</b>!</p>
                    <p>To complete your registration and activate your account, please enter the following One-Time Password <b>(${otp})</b> within 3 minutes</p><br><br><br>
                    <p>Note: For account safety, Do not share your OTP with others.</p></br>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px; color: #ffffff; background: #FE8A36;font-weight: bold;">
                    <p>Copyright &copy; 2024 The Cocoapp. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    <script>
        document.getElementById("year").innerHTML = new Date().getFullYear()
    </script>

    </html>`;
}

exports.pinChangedGenerateOTP = (otp) => {
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <title>Your Email Title</title>
        <style>
            * {
                font-family: 'Montserrat' !important;
            }
        </style>
    </head>

    <body>
        <table style="width: 90%; background-color: #f5f5f5; margin: 0 auto; padding: 0;">
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <img src="https://res.cloudinary.com/dh2hepu1c/image/upload/v1717493603/Logo_y7jxd9.png"
                        alt="Company Logo" width="200" height="50" />
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;font-size: 14px; line-height: 140%;">
                    <p>Hello Dear, </p>
                    <p>To verify your PIN change request for <b>THECOCOAPP</b>, please enter the following One-Time Password (OTP) within 3 minutes:</p>
                    <p><b>(${otp})</b></p><br><br><br>
                    <p>Note: For account safety, do not share your OTP with others.</p></br>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px; color: #ffffff; background: #FE8A36;font-weight: bold;">
                    <p>Copyright &copy; 2024 The Cocoapp. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    <script>
        document.getElementById("year").innerHTML = new Date().getFullYear()
    </script>

    </html>`;
}

exports.loginGenerateOTP = (otp) => {
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <title>Your Email Title</title>
        <style>
            * {
                font-family: 'Montserrat' !important;
            }
        </style>
    </head>

    <body>
        <table style="width: 90%; background-color: #f5f5f5; margin: 0 auto; padding: 0;">
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <img src="https://res.cloudinary.com/dh2hepu1c/image/upload/v1717493603/Logo_y7jxd9.png"
                        alt="Company Logo" width="200" height="50" />
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;font-size: 14px; line-height: 140%;">
                    <p>Hello Dear, </p>
                    <p>Your OTP for login is: <b>(${otp})</b></p>
                    <p>This OTP is valid for the next 3 minutes. Please use it to complete your login.</p><br><br><br>
                    <p>Note: For account safety, Do not share your OTP with others.</p></br>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px; color: #ffffff; background: #FE8A36;font-weight: bold;">
                    <p>Copyright &copy; 2024 The Cocoapp. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    <script>
        document.getElementById("year").innerHTML = new Date().getFullYear()
    </script>

    </html>`;
}