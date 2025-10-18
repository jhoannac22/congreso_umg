<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diploma Especial</title>
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
        }
        
        .diploma-container {
            width: 100%;
            height: 100%;
            padding: 30mm;
            position: relative;
        }
        
        .border-outer {
            border: 8px double #4C1D95;
            width: 100%;
            height: 100%;
            padding: 15px;
            position: relative;
            background: white;
        }
        
        .border-inner {
            border: 2px solid #8B5CF6;
            width: 100%;
            height: 100%;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .universidad {
            font-size: 18px;
            font-weight: bold;
            color: #4C1D95;
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        
        .subtitle {
            font-size: 20px;
            color: #8B5CF6;
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 25px 0;
            padding: 10px 30px;
            border-top: 2px solid #8B5CF6;
            border-bottom: 2px solid #8B5CF6;
            display: inline-block;
        }
        
        .activity-name {
            font-size: 24px;
            color: #333;
            margin: 20px 0;
            font-weight: 600;
        }
        
        .special-note {
            font-size: 14px;
            color: #666;
            margin: 20px auto;
            max-width: 80%;
            padding: 15px;
            background: #f3f4f6;
            border-left: 4px solid #8B5CF6;
            text-align: left;
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
    </style>
</head>
<body>
    <div class="diploma-container">
        <div class="border-outer">
            <div class="border-inner">
                <div class="universidad">UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA</div>
                <div class="facultad">Facultad de Ingeniería en Sistemas de Información y Ciencias de la Computación</div>
                
                <div class="title">Reconocimiento<br>Especial</div>
                <div class="subtitle">{{ $specialTitle ?? 'Por Contribución Destacada' }}</div>
                
                <div class="text">Otorgado a</div>
                
                <div class="participant-name">
                    {{ strtoupper($participant->first_name . ' ' . $participant->last_name) }}
                </div>
                
                <div class="text">
                    Por su valiosa contribución en
                </div>
                
                <div class="activity-name">{{ $activity->name }}</div>
                
                @if(isset($notes) && $notes)
                <div class="special-note">
                    {{ $notes }}
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

