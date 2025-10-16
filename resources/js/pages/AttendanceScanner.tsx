import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Navigation from '../components/Navigation';

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
}

export default function AttendanceScanner() {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>('');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [activities, setActivities] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [currentCamera, setCurrentCamera] = useState<'environment' | 'user'>('user');
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

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

  // Verificar permisos de cámara y obtener cámaras disponibles
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'camera' as PermissionName }).then((permissionStatus) => {
        setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        
        permissionStatus.onchange = () => {
          setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        };
      }).catch(() => {
        setCameraPermission('prompt');
      });
    }

    // Obtener cámaras disponibles
    const getAvailableCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(videoDevices);
        
        // Seleccionar cámara frontal por defecto si está disponible
        const frontCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('front') || 
          device.label.toLowerCase().includes('user') ||
          device.label.toLowerCase().includes('facing')
        );
        
        if (frontCamera) {
          setSelectedCameraId(frontCamera.deviceId);
          setCurrentCamera('user');
        } else if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error getting cameras:', error);
      }
    };

    getAvailableCameras();
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  // Función para procesar el QR escaneado
  const processEmail = async (scannedData: string) => {
    // Detener el escaneo temporalmente
    await stopScanning();
    
    const dataToProcess = scannedData.trim();
    
    // Intentar decodificar como JSON (QR seguro)
    let qrData;
    try {
      qrData = JSON.parse(dataToProcess);
    } catch (e) {
      // Si no es JSON, tratar como email simple (compatibilidad)
      qrData = dataToProcess;
    }

    // Validar datos del QR
    if (typeof qrData === 'string') {
      // QR legacy con solo email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(qrData)) {
        setError('El código QR no contiene un email válido');
        setTimeout(() => {
          setError('');
          startScanning();
        }, 3000);
        return;
      }
    } else if (typeof qrData === 'object') {
      // QR seguro con datos JSON
      if (!qrData.participant_id || !qrData.email || !qrData.token) {
        setError('El código QR no contiene datos válidos');
        setTimeout(() => {
          setError('');
          startScanning();
        }, 3000);
        return;
      }
    } else {
      setError('Formato de código QR no reconocido');
      setTimeout(() => {
        setError('');
        startScanning();
      }, 3000);
      return;
    }

    // Registrar asistencia
    try {
      setLoading(true);
      const payload: any = { qr_data: dataToProcess };

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
        // Mostrar resultado por 4 segundos y luego reiniciar
        setTimeout(() => {
          setResult(null);
          startScanning();
        }, 4000);
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
    } finally {
      setLoading(false);
    }
  };

  // Iniciar escaneo con cámara
  const startScanning = async () => {
    try {
      setError('');
      setResult(null);
      
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      const qrCodeSuccessCallback = async (decodedText: string) => {
        // Procesar el email escaneado
        await processEmail(decodedText);
      };

      const qrCodeErrorCallback = (error: string) => {
        // Solo mostrar errores importantes, no todos los "no QR found"
        if (!error.includes('No QR code found') && !error.includes('NotFoundException')) {
          console.error('QR Scanner error:', error);
        }
      };

      const config = { 
        fps: 30,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        videoConstraints: {
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
          facingMode: currentCamera
        },
        mirror: false,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
        useBarCodeDetectorIfSupported: true,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.AZTEC,
          Html5QrcodeSupportedFormats.CODABAR,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODE_93,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.DATA_MATRIX,
          Html5QrcodeSupportedFormats.MAXICODE,
          Html5QrcodeSupportedFormats.ITF,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.PDF_417,
          Html5QrcodeSupportedFormats.RSS_14,
          Html5QrcodeSupportedFormats.RSS_EXPANDED,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION
        ]
      };

      const cameraConfig = selectedCameraId 
        ? { deviceId: { exact: selectedCameraId } }
        : { facingMode: currentCamera };
      
      await html5QrCode.start(
        cameraConfig,
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );

      setScanning(true);
      setCameraPermission('granted');
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      if (err.name === 'NotAllowedError') {
        setError('Permiso de cámara denegado. Por favor, permite el acceso a la cámara.');
        setCameraPermission('denied');
      } else if (err.name === 'NotFoundError') {
        setError('No se encontró ninguna cámara en el dispositivo');
      } else {
        setError('Error al iniciar el escáner: ' + err.message);
      }
      setScanning(false);
    }
  };

  // Detener escaneo
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

  // Cambiar cámara
  const switchCamera = async () => {
    if (scanning) {
      await stopScanning();
      
      // Cambiar entre cámaras disponibles
      const currentIndex = availableCameras.findIndex(cam => cam.deviceId === selectedCameraId);
      const nextIndex = (currentIndex + 1) % availableCameras.length;
      const nextCamera = availableCameras[nextIndex];
      
      if (nextCamera) {
        setSelectedCameraId(nextCamera.deviceId);
        // Determinar el tipo de cámara basado en el label
        const isFrontCamera = nextCamera.label.toLowerCase().includes('front') || 
                             nextCamera.label.toLowerCase().includes('user') ||
                             nextCamera.label.toLowerCase().includes('facing');
        setCurrentCamera(isFrontCamera ? 'user' : 'environment');
      }
      
      setTimeout(() => {
        startScanning();
      }, 500);
    } else {
      // Cambiar entre cámaras disponibles sin escanear
      const currentIndex = availableCameras.findIndex(cam => cam.deviceId === selectedCameraId);
      const nextIndex = (currentIndex + 1) % availableCameras.length;
      const nextCamera = availableCameras[nextIndex];
      
      if (nextCamera) {
        setSelectedCameraId(nextCamera.deviceId);
        const isFrontCamera = nextCamera.label.toLowerCase().includes('front') || 
                             nextCamera.label.toLowerCase().includes('user') ||
                             nextCamera.label.toLowerCase().includes('facing');
        setCurrentCamera(isFrontCamera ? 'user' : 'environment');
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📋 Registro de Asistencia
          </h1>
          <p className="text-lg text-gray-600">
            Ingresa el email del participante para registrar su asistencia
          </p>
        </div>

        {/* Activity Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <label htmlFor="activity" className="block text-sm font-semibold text-gray-700 mb-3">
            🎯 Seleccionar Actividad (Opcional)
          </label>
          <select
            id="activity"
            value={selectedActivityId}
            onChange={(e) => setSelectedActivityId(e.target.value)}
            disabled={loading || scanning}
            className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          >
            <option value="">✨ Asistencia General</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name} • {activity.type}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            💡 Si no seleccionas una actividad, se registrará como asistencia general al congreso
          </p>
        </div>

        {/* QR Scanner con Cámara */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">📸</span> Escaneo con Cámara
          </h3>
          
          {/* Visor de la cámara */}
          <div id="qr-reader" className="w-full rounded-lg overflow-hidden mb-4 bg-gray-900" style={{ maxWidth: '500px', margin: '0 auto' }} />

          {/* Información de la cámara actual */}
          {availableCameras.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">📹 Cámara actual:</span> {
                  availableCameras.find(cam => cam.deviceId === selectedCameraId)?.label || 
                  'Cámara no identificada'
                }
              </p>
              {availableCameras.length > 1 && (
                <p className="text-xs text-blue-600 mt-1">
                  💡 Usa el botón "Cambiar Cámara" para alternar entre {availableCameras.length} cámaras disponibles
                </p>
              )}
            </div>
          )}

          {/* Controles de la cámara mejorados */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            {!scanning ? (
              <button
                onClick={startScanning}
                disabled={loading}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 font-bold text-lg disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <span className="relative flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  🚀 Iniciar Escaneo
                </span>
              </button>
            ) : (
              <button
                onClick={stopScanning}
                disabled={loading}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:via-rose-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2 transition-all duration-300 font-bold text-lg disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <span className="relative flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  ⏹️ Detener Escaneo
                </span>
              </button>
            )}
            
            <button
              onClick={switchCamera}
              disabled={availableCameras.length <= 1}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white rounded-2xl hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 transition-all duration-300 font-bold text-lg disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <span className="relative flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                📹 {currentCamera === 'environment' ? 'Cámara Frontal' : 'Cámara Trasera'}
                {availableCameras.length > 1 && ` (${availableCameras.length})`}
              </span>
            </button>
          </div>

          {/* Mensaje de permiso de cámara */}
          {cameraPermission === 'denied' && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-800 text-sm flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>Permiso de cámara denegado.</strong><br/>
                  Para usar el escáner, debes permitir el acceso a la cámara en la configuración de tu navegador. Usa la entrada manual como alternativa.
                </span>
              </p>
            </div>
          )}

          {scanning && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 flex items-center justify-center">
                <span className="animate-pulse w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Escaneando... Coloca el código QR frente a la cámara
              </p>
            </div>
          )}
        </div>


        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-lg shadow-md animate-pulse">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-semibold text-red-800">⚠️ Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && result.success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl shadow-lg mb-6 animate-bounce-in">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  ✅ {result.message}
                </h3>
                {result.participant && (
                  <div className="mt-4 bg-white rounded-lg p-5 border-2 border-green-200 shadow">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg flex items-center">
                      <span className="text-2xl mr-2">👤</span> Información del Participante
                    </h4>
                    <dl className="grid grid-cols-1 gap-4 text-base">
                      <div className="flex justify-between py-3 border-b-2 border-gray-100">
                        <dt className="font-medium text-gray-600">Nombre Completo:</dt>
                        <dd className="text-gray-900 font-bold text-lg">{result.participant.name}</dd>
                      </div>
                      <div className="flex justify-between py-3 border-b-2 border-gray-100">
                        <dt className="font-medium text-gray-600">Correo Electrónico:</dt>
                        <dd className="text-gray-900 font-mono">{result.participant.email}</dd>
                      </div>
                      <div className="flex justify-between py-3">
                        <dt className="font-medium text-gray-600">Tipo de Participante:</dt>
                        <dd>
                          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                            result.participant.type === 'interno' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {result.participant.type === 'interno' ? '🎓 Estudiante UMG' : '🌟 Estudiante Externo'}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
                {result.activity && (
                  <div className="mt-4 bg-white rounded-lg p-5 border-2 border-green-200 shadow">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg flex items-center">
                      <span className="text-2xl mr-2">🎯</span> Actividad Registrada
                    </h4>
                    <dl className="grid grid-cols-1 gap-4 text-base">
                      <div className="flex justify-between py-3 border-b-2 border-gray-100">
                        <dt className="font-medium text-gray-600">Nombre:</dt>
                        <dd className="text-gray-900 font-bold text-lg">{result.activity.name}</dd>
                      </div>
                      <div className="flex justify-between py-3 border-b-2 border-gray-100">
                        <dt className="font-medium text-gray-600">Tipo:</dt>
                        <dd className="text-gray-900 capitalize font-semibold">{result.activity.type}</dd>
                      </div>
                      <div className="flex justify-between py-3">
                        <dt className="font-medium text-gray-600">Ubicación:</dt>
                        <dd className="text-gray-900 font-semibold">📍 {result.activity.location}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Instrucciones de Uso
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-blue-900">
            <li className="flex items-start">
              <span className="mr-2">1️⃣</span>
              <span>Selecciona una actividad específica (opcional) o deja "Asistencia General"</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2️⃣</span>
              <span>Haz clic en "🚀 Iniciar Escaneo" para activar la cámara</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3️⃣</span>
              <span>Coloca el código QR del participante frente a la cámara</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4️⃣</span>
              <span>El sistema escaneará y procesará automáticamente el QR</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">5️⃣</span>
              <span>Se mostrará la confirmación de asistencia registrada</span>
            </li>
          </ol>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🔍</div>
              <h4 className="font-bold text-gray-900 mb-2">Código QR</h4>
              <p className="text-sm text-gray-600">El QR del participante contiene su email</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-bold text-gray-900 mb-2">Sin Duplicados</h4>
              <p className="text-sm text-gray-600">Previene registros duplicados el mismo día</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <h4 className="font-bold text-gray-900 mb-2">Validación</h4>
              <p className="text-sm text-gray-600">Solo participantes activos y registrados</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        
        /* Estilos para el visor de cámara */
        #qr-reader {
          position: relative;
        }
        
        #qr-reader video {
          width: 100% !important;
          height: auto !important;
          object-fit: cover;
          border-radius: 8px;
          /* Corregir efecto espejo */
          transform: scaleX(-1);
        }
        
        #qr-reader canvas {
          display: none;
        }
        
        /* Asegurar que el contenedor no tenga efecto espejo */
        #qr-reader__dashboard {
          transform: none !important;
        }
        
        /* Mejorar visibilidad del área de detección */
        #qr-reader__dashboard_section_fsr {
          background: rgba(0, 0, 0, 0.7) !important;
          border-radius: 8px !important;
          padding: 10px !important;
        }
        
        /* Estilo para el marco de detección */
        #qr-reader__dashboard_section_fsr_csr {
          border: 3px solid #10b981 !important;
          border-radius: 8px !important;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
        }
        
        /* Botones del escáner */
        #qr-reader__dashboard_section_fsr button {
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          margin: 0 5px !important;
          font-weight: 600 !important;
        }
        
        #qr-reader__dashboard_section_fsr button:hover {
          background: #2563eb !important;
        }
        
        /* Mejorar la detección de QR */
        #qr-reader__dashboard {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 8px;
          padding: 10px;
        }
        
        #qr-reader__dashboard_section_csr {
          display: none;
        }
        
        /* Estilos para el selector de QR */
        #qr-reader__dashboard_section_fsr {
          text-align: center;
        }
        
        #qr-reader__dashboard_section_fsr button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin: 0 5px;
        }
        
        #qr-reader__dashboard_section_fsr button:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}

