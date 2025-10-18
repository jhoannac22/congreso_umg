<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diploma de Participación</title>
    <style>
        @page {
            margin: 0;
            size: A4 landscape;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            width: 297mm;
            height: 210mm;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            position: relative;
        }
        
        .diploma-container {
            width: 100%;
            height: 100%;
            padding: 30mm;
            position: relative;
        }
        
        .border-outer {
            border: 8px double #1E5A96;
            width: 100%;
            height: 100%;
            padding: 15px;
            position: relative;
            background: white;
        }
        
        .border-inner {
            border: 2px solid #D4AF37;
            width: 100%;
            height: 100%;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
        }
        
        .universidad {
            font-size: 18px;
            font-weight: bold;
            color: #1E5A96;
            margin-bottom: 5px;
            letter-spacing: 2px;
        }
        
        .facultad {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
        }
        
        .title {
            font-size: 42px;
            font-weight: bold;
            color: #1E5A96;
            margin-bottom: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        
        .subtitle {
            font-size: 20px;
            color: #D4AF37;
            margin-bottom: 30px;
            font-style: italic;
        }
        
        .text {
            font-size: 16px;
            color: #333;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .participant-name {
            font-size: 32px;
            font-weight: bold;
            color: #1E5A96;
            margin: 25px 0;
            padding: 10px 30px;
            border-top: 2px solid #D4AF37;
            border-bottom: 2px solid #D4AF37;
            display: inline-block;
        }
        
        .activity-name {
            font-size: 24px;
            color: #333;
            margin: 20px 0;
            font-weight: 600;
        }
        
        .activity-description {
            font-size: 14px;
            color: #666;
            margin: 15px auto;
            max-width: 80%;
            line-height: 1.4;
        }
        
        .date {
            font-size: 14px;
            color: #666;
            margin-top: 25px;
        }
        
        .signatures {
            margin-top: 40px;
            display: table;
            width: 100%;
        }
        
        .signature-line {
            width: 35%;
            display: inline-block;
            text-align: center;
            margin: 0 7%;
        }
        
        .signature-line hr {
            border: none;
            border-top: 2px solid #333;
            margin-bottom: 5px;
        }
        
        .signature-name {
            font-size: 12px;
            font-weight: bold;
            color: #333;
            margin-bottom: 3px;
        }
        
        .signature-title {
            font-size: 11px;
            color: #666;
        }
        
        .diploma-number {
            position: absolute;
            bottom: 20px;
            right: 30px;
            font-size: 10px;
            color: #999;
        }
        
        .decorative-corner {
            position: absolute;
            width: 50px;
            height: 50px;
            border: 3px solid #D4AF37;
        }
        
        .corner-tl {
            top: 10px;
            left: 10px;
            border-right: none;
            border-bottom: none;
        }
        
        .corner-tr {
            top: 10px;
            right: 10px;
            border-left: none;
            border-bottom: none;
        }
        
        .corner-bl {
            bottom: 10px;
            left: 10px;
            border-right: none;
            border-top: none;
        }
        
        .corner-br {
            bottom: 10px;
            right: 10px;
            border-left: none;
            border-top: none;
        }
    </style>
</head>
<body>
    <div class="diploma-container">
        <div class="border-outer">
            <div class="border-inner">
                <div class="decorative-corner corner-tl"></div>
                <div class="decorative-corner corner-tr"></div>
                <div class="decorative-corner corner-bl"></div>
                <div class="decorative-corner corner-br"></div>
                
                <div class="universidad">UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA</div>
                <div class="facultad">Facultad de Ingeniería en Sistemas de Información y Ciencias de la Computación</div>
                
                <div class="title">Diploma</div>
                <div class="subtitle">de Participación</div>
                
                <div class="text">Otorgado a</div>
                
                <div class="participant-name">
                    {{ strtoupper($participant->first_name . ' ' . $participant->last_name) }}
                </div>
                
                <div class="text">
                    Por su destacada participación en
                </div>
                
                <div class="activity-name">{{ $activity->name }}</div>
                
                @if($activity->description)
                <div class="activity-description">
                    {{ $activity->description }}
                </div>
                @endif
                
                <div class="text">
                    Realizado en el marco del <strong>Congreso de Tecnología {{ date('Y') }}</strong>
                </div>
                
                <div class="date">
                    Emitido el {{ \Carbon\Carbon::parse($diploma->issue_date)->isoFormat('D [de] MMMM [de] YYYY') }}
                </div>
                
                <div class="signatures">
                    <div class="signature-line">
                        <hr>
                        <div class="signature-name">Ing. Director de Facultad</div>
                        <div class="signature-title">Director</div>
                        <div class="signature-title">Facultad de Ingeniería</div>
                    </div>
                    <div class="signature-line">
                        <hr>
                        <div class="signature-name">Coordinador General</div>
                        <div class="signature-title">Coordinador</div>
                        <div class="signature-title">Congreso de Tecnología</div>
                    </div>
                </div>
                
                <div class="diploma-number">
                    Diploma No. {{ $diploma->diploma_number }}
                </div>
            </div>
        </div>
    </div>
</body>
</html>

