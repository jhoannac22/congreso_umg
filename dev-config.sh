# Configuración de desarrollo para Laravel
# Este archivo fuerza HTTP y configura el entorno de desarrollo

# Configurar variables de entorno para desarrollo
export APP_ENV=local
export APP_DEBUG=true
export APP_URL=http://127.0.0.1:8000

# Configurar base de datos SQLite para desarrollo
export DB_CONNECTION=sqlite
export DB_DATABASE=database/database.sqlite

# Configurar caché para desarrollo
export CACHE_DRIVER=file
export SESSION_DRIVER=file
export QUEUE_CONNECTION=sync

# Configurar mail para desarrollo
export MAIL_MAILER=log
export MAIL_HOST=127.0.0.1
export MAIL_PORT=2525
export MAIL_USERNAME=null
export MAIL_PASSWORD=null
export MAIL_ENCRYPTION=null
export MAIL_FROM_ADDRESS="hello@example.com"
export MAIL_FROM_NAME="${APP_NAME}"

# Configurar logging
export LOG_CHANNEL=stack
export LOG_DEPRECATIONS_CHANNEL=null
export LOG_LEVEL=debug

echo "Configuración de desarrollo aplicada"
echo "APP_URL: $APP_URL"
echo "APP_ENV: $APP_ENV"
echo "APP_DEBUG: $APP_DEBUG"
