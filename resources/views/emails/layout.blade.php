<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Congreso de Tecnología UMG' }}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8f9fa;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #B22222 0%, #D4AF37 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .logo {
            width: 80px;
            height: 80px;
            background-color: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 24px;
            color: #B22222;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .content h2 {
            color: #B22222;
            font-size: 24px;
            margin: 0 0 20px;
            font-weight: 600;
        }
        .content p {
            line-height: 1.6;
            margin: 0 0 20px;
            font-size: 16px;
        }
        .highlight-box {
            background: linear-gradient(135deg, #D4AF37 0%, #B22222 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .highlight-box h3 {
            margin: 0 0 10px;
            font-size: 20px;
        }
        .highlight-box p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        .info-item {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #B22222;
        }
        .info-item h4 {
            margin: 0 0 10px;
            color: #B22222;
            font-size: 16px;
            font-weight: 600;
        }
        .info-item p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
        .qr-section {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }
        .qr-code {
            width: 150px;
            height: 150px;
            margin: 0 auto 15px;
            background-color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #e9ecef;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #B22222 0%, #D4AF37 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 0 0 10px;
            font-size: 14px;
            color: #666;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #B22222;
            text-decoration: none;
            font-weight: 600;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #B22222 50%, transparent 100%);
            margin: 30px 0;
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            .content {
                padding: 30px 20px;
            }
            .info-grid {
                grid-template-columns: 1fr;
            }
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">UMG</div>
            <h1>Congreso de Tecnología</h1>
            <p>Universidad Mariano Gálvez</p>
        </div>

        <!-- Content -->
        <div class="content">
            @yield('content')
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Universidad Mariano Gálvez</strong></p>
            <p>Facultad de Ingeniería en Sistemas de Información y Ciencias de la Computación</p>
            <div class="social-links">
                <a href="#">Sitio Web</a>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
            </div>
            <p style="font-size: 12px; color: #999;">
                Este es un email automático, por favor no responder directamente.
            </p>
        </div>
    </div>
</body>
</html>
