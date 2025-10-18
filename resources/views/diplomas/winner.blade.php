<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diploma de Reconocimiento - Ganador</title>
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
            background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
            position: relative;
        }
        
        .diploma-container {
            width: 100%;
            height: 100%;
            padding: 30mm;
            position: relative;
        }
        
        .border-outer {
            border: 10px double #B8860B;
            width: 100%;
            height: 100%;
            padding: 15px;
            position: relative;
            background: white;
            box-shadow: inset 0 0 50px rgba(218, 165, 32, 0.2);
        }
        
        .border-inner {
            border: 3px solid #D4AF37;
            width: 100%;
            height: 100%;
            padding: 25px;
            text-align: center;
            position: relative;
        }
        
        .trophy {
            font-size: 60px;
            margin: 10px auto;
        }
        
        .universidad {
            font-size: 18px;
            font-weight: bold;
            color: #1E5A96;
            margin-bottom: 5px;
            letter-spacing: 2px;
        }
        
        .facultad {
            font-size: 13px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .title {
            font-size: 44px;
            font-weight: bold;
            color: #B8860B;
            margin-bottom: 8px;
            letter-spacing: 3px;
            text-transform: uppercase;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .subtitle {
            font-size: 22px;
            color: #D4AF37;
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .text {
            font-size: 15px;
            color: #333;
            margin-bottom: 12px;
            line-height: 1.5;
        }
        
        .participant-name {
            font-size: 34px;
            font-weight: bold;
            color: #1E5A96;
            margin: 20px 0;
            padding: 12px 30px;
            background: linear-gradient(to right, transparent, #D4AF37 10%, #D4AF37 90%, transparent);
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .position-badge {
            display: inline-block;
            background: linear-gradient(135deg, #D4AF37, #FFD700);
            color: #333;
            padding: 8px 25px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            margin: 15px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }
        
        .activity-name {
            font-size: 22px;
            color: #333;
            margin: 18px 0;
            font-weight: 600;
        }
        
        .project-name {
            font-size: 18px;
            color: #B8860B;
            margin: 12px 0;
            font-style: italic;
        }
        
        .date {
            font-size: 13px;
            color: #666;
            margin-top: 20px;
        }
        
        .signatures {
            margin-top: 30px;
            display: table;
            width: 100%;
        }
        
        .signature-line {
            width: 30%;
            display: inline-block;
            text-align: center;
            margin: 0 1.5%;
        }
        
        .signature-line hr {
            border: none;
            border-top: 2px solid #333;
            margin-bottom: 5px;
        }
        
        .signature-name {
            font-size: 11px;
            font-weight: bold;
            color: #333;
            margin-bottom: 2px;
        }
        
        .signature-title {
            font-size: 10px;
            color: #666;
        }
        
        .diploma-number {
            position: absolute;
            bottom: 15px;
            right: 25px;
            font-size: 10px;
            color: #999;
        }
        
        .medal-decoration {
            position: absolute;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, #D4AF37, #FFD700);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 35px;
        }
        
        .medal-left {
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
        }
        
        .medal-right {
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
        }
    </style>
</head>
<body>
    <div class="diploma-container">
        <div class="border-outer">
            <div class="border-inner">
                <div class="medal-decoration medal-left">🏆</div>
                <div class="medal-decoration medal-right">⭐</div>
                
                <div class="trophy">🏆</div>
                
                <div class="universidad">UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA</div>
                <div class="facultad">Facultad de Ingeniería en Sistemas de Información y Ciencias de la Computación</div>
                
                <div class="title">Reconocimiento</div>
                <div class="subtitle">al Mérito y Excelencia</div>
                
                <div class="text">Otorgado a</div>
                
                <div class="participant-name">
                    {{ strtoupper($participant->first_name . ' ' . $participant->last_name) }}
                </div>
                
                @if(isset($position))
                <div class="position-badge">
                    @if($position == 1)
                        🥇 PRIMER LUGAR
                    @elseif($position == 2)
                        🥈 SEGUNDO LUGAR
                    @elseif($position == 3)
                        🥉 TERCER LUGAR
                    @else
                        🏆 {{ $position }}° LUGAR
                    @endif
                </div>
                @endif
                
                <div class="text">
                    Por su destacado desempeño en la competencia
                </div>
                
                <div class="activity-name">{{ $activity->name }}</div>
                
                @if(isset($projectName))
                <div class="text" style="margin-top: 12px;">Con el proyecto</div>
                <div class="project-name">"{{ $projectName }}"</div>
                @endif
                
                <div class="text" style="margin-top: 12px;">
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
                    </div>
                    <div class="signature-line">
                        <hr>
                        <div class="signature-name">Coordinador General</div>
                        <div class="signature-title">Coordinador del Congreso</div>
                    </div>
                    <div class="signature-line">
                        <hr>
                        <div class="signature-name">Jurado Calificador</div>
                        <div class="signature-title">Juez Principal</div>
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

