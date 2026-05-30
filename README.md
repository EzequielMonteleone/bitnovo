# Bitnovo Test

Aplicacion mobile desarrollada con Expo, React Native y Expo Router para crear y compartir solicitudes de pago.

## Requisitos

- Node.js
- Yarn
- Expo CLI
- Xcode o Android Studio para ejecutar la app en simuladores/emuladores

## Instalacion

Instala las dependencias:

```bash
yarn install
```

Crea el archivo de variables de entorno:

```bash
cp .env.example .env
```

Completa los valores necesarios en `.env`:

```bash
API_BASE_URL=https://payments.pre-bnvo.com/api/v1
WS_BASE_URL=wss://payments.pre-bnvo.com/ws/merchant
DEVICE_ID=your-device-id-here
```

## Scripts

Iniciar Expo:

```bash
yarn start
```

Ejecutar en iOS:

```bash
yarn ios
```

Ejecutar en Android:

```bash
yarn android
```

Ejecutar en web:

```bash
yarn web
```

Revisar lint:

```bash
yarn lint
```

## Estructura

- `src/app`: pantallas y rutas de Expo Router.
- `src/api`: integraciones con la API.
- `src/components`: componentes reutilizables.
- `src/hooks`: hooks compartidos.
- `src/store`: estado global.
- `src/i18n`: configuracion y traducciones.

## Tecnologias

- Expo
- React Native
- Expo Router
- TypeScript
- Zustand
- TanStack Query
- i18next
