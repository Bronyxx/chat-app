export function emailtemplate(name, clientURL){
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChatApp</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color:#6366f1; padding: 40px 20px;">
                            <h1 style="color:#ffffff; margin:0; font-size:28px; letter-spacing:1px;">💬 ChatApp</h1>
                            <p style="color:#c7d2fe; margin:8px 0 0;">Real-time messaging, simplified</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 40px 20px;">
                            <h2 style="color:#1f2937; margin:0 0 10px;">Welcome aboard, ${name}! 🎉</h2>
                            <p style="color:#6b7280; font-size:16px; line-height:1.6; margin: 0 0 20px;">
                                We're thrilled to have you join ChatApp. Your account has been successfully created and you're all set to start connecting with people.
                            </p>
                            <p style="color:#6b7280; font-size:16px; line-height:1.6; margin: 0 0 30px;">
                                Click the button below to go to the app and start chatting!
                            </p>

                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background-color:#6366f1; border-radius:8px;">
                                        <a href="${clientURL}" 
                                           style="display:inline-block; padding:14px 32px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold; border-radius:8px;">
                                            Open ChatApp →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Info Box -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff; border-radius:8px; padding:20px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="color:#4f46e5; font-size:14px; margin:0 0 8px;"><strong>✅ What you can do now:</strong></p>
                                        <p style="color:#6b7280; font-size:14px; margin:4px 0;">• Start one-on-one conversations</p>
                                        <p style="color:#6b7280; font-size:14px; margin:4px 0;">• Share images and files</p>
                                        <p style="color:#6b7280; font-size:14px; margin:4px 0;">• Customize your profile</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 30px 40px; border-top: 1px solid #e5e7eb; margin-top:20px;">
                            <p style="color:#9ca3af; font-size:13px; margin:0;">
                                If you didn't create this account, you can safely ignore this email.
                            </p>
                            <p style="color:#9ca3af; font-size:13px; margin:8px 0 0;">
                                © 2024 ChatApp. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`;}