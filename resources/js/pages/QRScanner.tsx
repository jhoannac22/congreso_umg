import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode';
import { router } from '@inertiajs/react';

interface ScanResult {
  success: boolean;
  message: string;
  participant?: {
    id: number;
    name: string;
    email: string;
    type: string;
  };
  activity?: {
    id: number;
    name: string;
    type: string;
    location: string;
  };
  attendance?: any;
}

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>('');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [activities, setActivities] = useState<any[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  // Cargar actividades disponibles
  useEffect(() => {
    fetch('/api/v1/activities')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setActivities(data.data.data || data.data);
        }
      })
      .catch(err => console.error('Error loading activities:', err));
  }, []);

  // Verificar permisos de cámara
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'camera' as PermissionName }).then((permissionStatus) => {
        setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        
        permissionStatus.onchange = () => {
          setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        };
      }).catch(() => {
        // Si no se puede verificar, asumimos que necesita pedir permiso
        setCameraPermission('prompt');
      });
    }
  }, []);

  const startScanning = async () => {
    try {
      setError('');
      setResult(null);
      
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      const qrCodeSuccessCallback = async (decodedText: string) => {
        // Detener el escáner temporalmente mientras procesamos
        await stopScanning();
        
        // El código QR debe contener un email
        const email = decodedText.trim();
        
        // Validar que sea un email válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('El código QR no contiene un email válido');
          setTimeout(() => {
            startScanning();
          }, 3000);
          return;
        }

        // Registrar asistencia
        try {
          const payload: any = { email };
          
          if (selectedActivityId) {
            payload.activity_id = parseInt(selectedActivityId);
            payload.type = 'activity';
          } else {
            payload.type = 'general';
          }

          const response = await fetch('/api/v1/attendance/check-in-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (data.success) {
            setResult(data);
            // Mostrar resultado por 3 segundos y luego reiniciar
            setTimeout(() => {
              setResult(null);
              startScanning();
            }, 3000);
          } else {
            setError(data.message || 'Error al registrar asistencia');
            setTimeout(() => {
              setError('');
              startScanning();
            }, 3000);
          }
        } catch (err) {
          console.error('Error registering attendance:', err);
          setError('Error al conectar con el servidor');
          setTimeout(() => {
            setError('');
            startScanning();
          }, 3000);
        }
      };

      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        // Mejorar detección de QR
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
        // Configuración para mejor detección
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
      };

      // Intentar con cámara trasera primero, luego frontal si falla
      try {
        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          qrCodeSuccessCallback,
          undefined
        );
      } catch (err: any) {
        // Si falla con cámara trasera, intentar con frontal
        if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
          console.log('Intentando con cámara frontal...');
          await html5QrCode.start(
            { facingMode: 'user' },
            config,
            qrCodeSuccessCallback,
            undefined
          );
        } else {
          throw err;
        }
      }

      setScanning(true);
      setCameraPermission('granted');
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      if (err.name === 'NotAllowedError') {
        setError('Permiso de cámara denegado. Por favor, permite el acceso a la cámara en la configuración de tu navegador.');
        setCameraPermission('denied');
      } else if (err.name === 'NotFoundError') {
        setError('No se encontró ninguna cámara en el dispositivo');
      } else {
        setError('Error al iniciar el escáner: ' + err.message);
      }
      setScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Escáner de QR - Asistencia
          </h1>
          <p className="text-lg text-gray-600">
            Escanea el código QR para registrar tu asistencia
          </p>
        </div>

        {/* Activity Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Actividad (Opcional)
          </label>
          <select
            id="activity"
            value={selectedActivityId}
            onChange={(e) => setSelectedActivityId(e.target.value)}
            disabled={scanning}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Asistencia General</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name} - {activity.type}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Si no seleccionas una actividad, se registrará como asistencia general
          </p>
        </div>

        {/* Scanner Container */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div id="qr-reader" className="w-full rounded-lg overflow-hidden mb-4" />

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!scanning ? (
              <button
                onClick={startScanning}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                🎥 Iniciar Escaneo
              </button>
            ) : (
              <button
                onClick={stopScanning}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                ⏹ Detener Escaneo
              </button>
            )}
          </div>

          {/* Camera Permission Status */}
          {cameraPermission === 'denied' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                ⚠️ Permiso de cámara denegado. Para usar el escáner, debes permitir el acceso a la cámara en la configuración de tu navegador.
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && result.success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg animate-fade-in">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  ✅ {result.message}
                </h3>
                {result.participant && (
                  <div className="mt-4 bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Información del Participante:</h4>
                    <dl className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Nombre:</dt>
                        <dd className="text-gray-900">{result.participant.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Email:</dt>
                        <dd className="text-gray-900">{result.participant.email}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Tipo:</dt>
                        <dd className="text-gray-900 capitalize">{result.participant.type}</dd>
                      </div>
                    </dl>
                  </div>
                )}
                {result.activity && (
                  <div className="mt-4 bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Actividad:</h4>
                    <dl className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Nombre:</dt>
                        <dd className="text-gray-900">{result.activity.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Tipo:</dt>
                        <dd className="text-gray-900 capitalize">{result.activity.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Ubicación:</dt>
                        <dd className="text-gray-900">{result.activity.location}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📱 Instrucciones:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>Permite el acceso a la cámara cuando el navegador lo solicite</li>
            <li>Selecciona una actividad específica si es necesario (opcional)</li>
            <li>Haz clic en "Iniciar Escaneo"</li>
            <li>Coloca el código QR frente a la cámara</li>
            <li>El sistema registrará automáticamente la asistencia cuando detecte el código</li>
            <li>El escáner se reiniciará automáticamente después de cada escaneo exitoso</li>
          </ol>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.visit('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

