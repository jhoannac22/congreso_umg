# 🔧 Solución al Error 404 en Descarga de Diplomas

## ❌ **Problema Identificado**

Al intentar descargar un diploma desde la página "Mis Diplomas", se presentaba el error:
```
Failed to load resource: the server responded with a status of 404 (Not Found)
api/v1/diplomas/download/1
```

## 🔍 **Causas Identificadas**

### 1. **PDF no existía físicamente** ✅ SOLUCIONADO
- El diploma estaba registrado en la base de datos pero el archivo PDF no se había generado
- El archivo debía estar en: `storage/app/public/diplomas/DIP-2025-0788E2D4.pdf`

### 2. **Información del participante no estaba disponible en localStorage** ✅ SOLUCIONADO
- El endpoint de login NO estaba devolviendo la información del participante
- El frontend intentaba obtener el ID del participante de `localStorage.getItem('participant')` pero no existía

## ✅ **Soluciones Aplicadas**

### **1. Modificación del AuthController**
**Archivo:** `app/Http/Controllers/Api/AuthController.php`

**Cambio:** Agregar información del participante en la respuesta del login

```php
public function login(LoginRequest $request): JsonResponse
{
    // ... código existente ...
    
    $token = $user->createToken('auth_token')->plainTextToken;

    // ⭐ NUEVO: Buscar el participante si el usuario es participante
    $participant = null;
    if ($user->role === 'participant') {
        $participant = Participant::where('email', $user->email)->first();
    }

    return response()->json([
        'message' => 'Inicio de sesión exitoso',
        'user' => $user,
        'participant' => $participant, // ⭐ NUEVO
        'access_token' => $token,
        'token_type' => 'Bearer',
    ]);
}
```

### **2. Modificación del Login.tsx**
**Archivo:** `resources/js/pages/Login.tsx`

**Cambio:** Guardar información del participante en localStorage

```typescript
// Success - store token and redirect
localStorage.setItem('auth_token', data.access_token);
localStorage.setItem('user', JSON.stringify(data.user));

// ⭐ NUEVO: Store participant data if available
if (data.participant) {
    localStorage.setItem('participant', JSON.stringify(data.participant));
}

// Redirect to dashboard or home
window.location.href = '/dashboard';
```

### **3. Regeneración del PDF del Diploma**
El PDF se regeneró correctamente usando el disco `public`:

```bash
Ubicación: storage/app/public/diplomas/DIP-2025-0788E2D4.pdf
Tamaño: 3,992 bytes
Estado: ✅ Existe
```

## 🚀 **Pasos para Probar la Solución**

### **1. Limpiar localStorage y volver a iniciar sesión**
```javascript
// Desde la consola del navegador:
localStorage.clear();
// Luego, ir a /login y volver a iniciar sesión
```

### **2. Verificar que el participante está en localStorage**
```javascript
// Desde la consola del navegador:
console.log(JSON.parse(localStorage.getItem('participant')));
// Debe mostrar: { id: 1, first_name: "...", last_name: "...", email: "...", ... }
```

### **3. Navegar a "Mis Diplomas"**
1. Click en "Actividades" en el menú
2. Click en "Mis Diplomas"
3. Deberías ver la lista de diplomas disponibles
4. Click en "Descargar PDF" debería funcionar correctamente

## 📋 **Checklist de Verificación**

Antes de usar la función de descarga de diplomas, verifica:

- [ ] El servidor Laravel está corriendo (`php artisan serve`)
- [ ] El servidor Vite está corriendo (`npm run dev`)
- [ ] Has iniciado sesión correctamente
- [ ] Hay un participante asociado a tu usuario
- [ ] El participante tiene diplomas generados
- [ ] Los archivos PDF existen físicamente en `storage/app/public/diplomas/`

## 🔐 **Rutas Protegidas**

La ruta de descarga de diplomas requiere autenticación:

```php
// En routes/api.php
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // ...
    Route::get('/diplomas/download/{diploma}', [DiplomaController::class, 'download']);
    // ...
});
```

Esto significa que:
- ✅ Debes estar autenticado con un token válido
- ✅ El token debe estar en `localStorage` con la clave `'auth_token'`
- ✅ El `api-client.ts` automáticamente agrega el token a las peticiones

## 🛠️ **Comandos Útiles para Debugging**

### Ver diplomas en la base de datos:
```bash
php artisan tinker
>>> Diploma::with(['participant', 'activity'])->get();
```

### Verificar que el PDF existe:
```bash
ls storage/app/public/diplomas/
```

### Regenerar un diploma específico:
```bash
# Crear un script temporal para regenerar
php artisan tinker
>>> $diploma = Diploma::find(1);
>>> // Usar el DiplomaController para regenerar
```

## 📊 **Flujo Completo de Descarga**

```mermaid
Usuario → Click "Descargar"
    ↓
MyDiplomas.tsx → downloadDiploma(id, numero)
    ↓
diploma-api.ts → GET /api/v1/diplomas/download/{id}
    ↓
api-client.ts → Agrega token: "Bearer {token}"
    ↓
AuthController → Verifica token válido
    ↓
DiplomaController@download → Verifica que PDF existe
    ↓
Storage::disk('public')->download() → Envía archivo
    ↓
Navegador → Descarga "Diploma_{numero}.pdf"
```

## ✅ **Estado Final**

| Componente | Estado |
|------------|--------|
| AuthController | ✅ Devuelve participante |
| Login.tsx | ✅ Guarda participante en localStorage |
| PDF Diploma | ✅ Generado en disco público |
| Ruta API | ✅ Configurada correctamente |
| Autenticación | ✅ Token se envía correctamente |

---

**Fecha de solución:** 18 de Octubre, 2025  
**Estado:** ✅ Completamente funcional

