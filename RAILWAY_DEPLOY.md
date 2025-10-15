# 🚂 Guía de Despliegue en Railway

## 📋 Pre-requisitos

- Cuenta en [Railway.app](https://railway.app)
- Repositorio de GitHub con el código
- Credenciales de Aiven MySQL

## 🚀 Pasos para Deploy

### 1. Configurar el Proyecto en Railway

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Selecciona tu repositorio `congreso_umg`
5. Railway detectará automáticamente que es una app Laravel

### 2. Configurar Variables de Entorno

En la configuración del proyecto en Railway, agrega las siguientes variables:

#### **Aplicación**
```env
APP_NAME=Congreso de Tecnología UMG
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-app.up.railway.app
APP_LOCALE=es
APP_FALLBACK_LOCALE=es
```

#### **Base de Datos Aiven**
```env
DB_CONNECTION=mysql
DB_HOST=mysql-3e5c49c7-javiermorales-2ad7.b.aivencloud.com
DB_PORT=11912
DB_DATABASE=defaultdb
DB_USERNAME=avnadmin
DB_PASSWORD=tu-password-de-aiven-aqui
```

#### **Sesión y Caché**
```env
SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database
```

#### **Correo (Gmail)**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password-de-gmail
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=tu-email@gmail.com
MAIL_FROM_NAME=Congreso de Tecnología UMG
```

#### **Logging**
```env
LOG_CHANNEL=stack
LOG_LEVEL=error
```

### 3. Generar APP_KEY

Railway generará automáticamente el `APP_KEY` si no está presente. Si necesitas generarlo manualmente:

1. En la terminal de Railway (dentro del proyecto):
```bash
php artisan key:generate --show
```

2. Copia el output y agrégalo como variable de entorno `APP_KEY`

### 4. Configurar Dominio

1. En Railway, ve a "Settings" → "Domains"
2. Click en "Generate Domain" para obtener un dominio `.up.railway.app`
3. O configura un dominio personalizado si lo tienes

### 5. Trigger Deploy

Railway hará deploy automáticamente cuando:
- Hagas push a la rama `main` de GitHub
- Cambies variables de entorno
- Manualmente desde el dashboard

## 🔧 Archivos de Configuración Incluidos

### `nixpacks.toml`
Configuración de build para Railway con:
- PHP 8.3 (requerido por Pest)
- Extensiones de PHP necesarias
- Node.js 22
- Comandos de build optimizados

### `composer.json`
Actualizado para requerir PHP ^8.3

## ✅ Verificar el Deploy

Una vez desplegado, verifica:

1. **URL del proyecto**: `https://tu-app.up.railway.app`
2. **Logs**: Revisa los logs en Railway para errores
3. **Base de datos**: Verifica que las migraciones se hayan ejecutado
4. **Assets**: Los archivos CSS/JS deben cargarse correctamente

## 🐛 Troubleshooting

### Error: "Composer dependencies not installed"
**Solución**: Railway debería instalarlas automáticamente. Si no:
```bash
composer install --no-dev --optimize-autoloader
```

### Error: "Missing APP_KEY"
**Solución**: Genera la clave:
```bash
php artisan key:generate
```
Y agrégala a las variables de entorno.

### Error: "Cannot connect to database"
**Solución**: Verifica que:
- Las credenciales de Aiven estén correctas
- El puerto 11912 esté accesible
- Railway tenga permisos para conectarse a Aiven

### Error: "Assets not loading"
**Solución**: 
1. Verifica que `npm run build` se ejecutó correctamente
2. Verifica que la carpeta `public/build` existe
3. Revisa que `APP_URL` sea correcto

### Error: "PHP version conflict"
**Solución**: El archivo `nixpacks.toml` configura PHP 8.3. Si aún da error:
1. Verifica que el archivo esté en la raíz del proyecto
2. Haz push del archivo a GitHub
3. Re-deploy desde Railway

## 📊 Comandos Post-Deploy (Opcional)

Si necesitas ejecutar comandos después del deploy:

1. Ve a tu proyecto en Railway
2. Click en "Shell" o "Terminal"
3. Ejecuta:

```bash
# Limpiar cachés
php artisan config:clear
php artisan cache:clear

# Ver estado de migraciones
php artisan migrate:status

# Ejecutar migraciones (si es necesario)
php artisan migrate --force

# Optimizar
php artisan optimize
```

## 🔄 Actualizaciones

Para actualizar la aplicación:

1. Haz cambios en tu código local
2. Commit y push a GitHub:
```bash
git add .
git commit -m "Update: descripción de cambios"
git push origin main
```
3. Railway detectará los cambios y hará deploy automáticamente

## 💡 Tips

- **Monitorea los logs** durante el primer deploy
- **Usa el plan gratuito** de Railway (500 horas/mes)
- **Configura alertas** para errores críticos
- **Habilita backups** en Aiven MySQL
- **Usa HTTPS** siempre (Railway lo proporciona gratis)

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Railway
2. Verifica las variables de entorno
3. Consulta la documentación de Railway: https://docs.railway.app
4. Revisa la configuración de Aiven

---

**¡Listo!** Tu aplicación debería estar corriendo en Railway con conexión a Aiven MySQL.

