# Billetera Municipal · Demo Trust-Native

Demo interactiva privada para recorrer un caso municipal de principio a fin: adjudicación y priorización de proyectos, decisiones por rol, evolución de estados administrativos, evidencias y trazabilidad conceptual sobre Stellar/Soroban.

> Esta versión es una simulación demostrativa. No envía transacciones reales a Stellar Testnet ni reemplaza MEF, SIAF, SEACE o INFOBRAS.

## Ejecutar localmente

La aplicación es estática y no requiere instalar dependencias.

1. Abre `index.html` directamente en el navegador; o
2. Inicia un servidor local desde la carpeta del proyecto:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173`.

Para generar la carpeta de distribución:

```bash
npm run build
```

## Estructura

- `index.html`: estructura y contenido de la experiencia.
- `styles.css`: identidad visual institucional y diseño responsivo.
- `app.js`: recorrido de ocho hitos, decisiones, guardas, ledger y verificador.
- `scripts/build.mjs`: genera la versión estática dentro de `dist/`.
- `.openai/hosting.json`: configuración del despliegue privado original en ChatGPT Sites.

## Crear un repositorio privado en GitHub

Con GitHub CLI instalado y autenticado:

```bash
git init
git add .
git commit -m "feat: demo Billetera Municipal"
gh repo create billetera-municipal-demo --private --source=. --remote=origin --push
```

Si prefieres la interfaz web de GitHub, crea un repositorio **privado**, no agregues archivos iniciales, y sigue las instrucciones de **push an existing repository**.

## Identidad visual

La paleta toma como referencia la identidad institucional peruana compartida:

- rojo principal `#E11D1A`;
- gris institucional `#565656`;
- blanco `#FFFFFF`;
- fondos neutros `#F5F4F4`.

Las alertas administrativas mantienen ámbar para distinguir advertencias de los elementos de marca.
