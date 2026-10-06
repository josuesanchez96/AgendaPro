#  AgendaPro 📅 - Sistema de Reservas & Pruebas E2E

AgendaPro es una aplicación móvil desarrollada en **React Native (Expo)** y **TypeScript** que gestiona reservas de servicios. Este proyecto fue construido con un enfoque primordial en la automatización de pruebas de extremo a extremo (E2E) utilizando **Maestro** y la metodología **BDD (Gherkin)**.

## Características Principales
La aplicación cuenta con dos flujos principales gestionados por un estado global mockeado (Zustand):
1. **Modo Cliente (Usuario Final):** Flujo de 5 pasos para agendar citas (Sede ➔ Profesional ➔ Servicio ➔ Fecha/Hora ➔ Confirmación).
2. **Modo Profesional:** Dashboard para visualizar citas agendadas, métricas financieras y cancelación de reservas.

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
* **Node.js** (v18 o superior)
* **Emulador** de Android (Android Studio) o Simulador de iOS (Xcode).
* **Expo CLI** (se instala automáticamente al correr el proyecto).
* **Maestro CLI** (para las pruebas E2E).

---

## 1. Cómo ejecutar la aplicación

1. **Abre tu terminal** y navega a la carpeta del proyecto:
   ```bash
   cd c:\Proyectos2026\AgendaPro
   ```

2. **Inicia el servidor de Expo:**
   ```bash
   npx expo start
   ```

3. **Selecciona cómo visualizar la app:**
   * **🌐 En el Navegador Web (Recomendado en Windows):** Presiona `w` en la terminal para abrir en Chrome/Edge.
   * **📱 En tu Celular Físico:** Abre la app **Expo Go** (Android/iOS) y escanea el código QR mostrado en la terminal.
   * **🤖 En Emulador Android:** Presiona `a` en la terminal (requiere Android Studio y `ANDROID_HOME` configurado).
   * **🍎 En Simulador iOS:** Presiona `i` en la terminal (requiere macOS y Xcode).

*(Nota: Para las pruebas E2E, es obligatorio que la aplicación esté corriendo en el emulador).*

---

## 2. Cómo ejecutar las pruebas E2E con Maestro

Las pruebas están definidas en la carpeta `/e2e` y utilizan los identificadores de prueba (`testID`) inyectados en los componentes de la aplicación.

### Instalación de Maestro (Si no lo tienes)
Si usas Windows, se recomienda usar WSL, macOS o Linux para instalar Maestro nativamente.
`curl -Ls "https://get.maestro.mobile.dev" | bash`

### Ejecutar los escenarios de prueba
Asegúrate de que tu emulador esté abierto y la aplicación AgendaPro esté en pantalla. Abre una nueva ventana de terminal y ejecuta los flujos según lo requieras:

**1. Flujo completo de Reserva (Cliente):**
`maestro test e2e/booking_flow.yaml`

**2. Flujo de validaciones de errores:**
`maestro test e2e/validation_flow.yaml`

**3. Flujo del Dashboard (Profesional):**
`maestro test e2e/professional_dashboard.yaml`

**4. Ejecutar todas las pruebas de forma secuencial:**
`maestro test e2e/`

Al ejecutar estos comandos, verás cómo Maestro interactúa de forma autónoma con la interfaz, validando que los textos, botones y flujos funcionen como se espera.

---

## 3. Documentación Técnica y Entregables

En la raíz de este proyecto encontrarás dos artefactos HTML generados para documentar el sistema (puedes abrirlos con cualquier navegador web como Chrome o Edge):

* `arquitectura_tecnica.html`: Contiene el diagrama técnico interactivo (Mermaid), el listado de librerías, y la explicación de los patrones de diseño aplicados.
* `e2e_testing.html`: Documentación detallada de los escenarios de prueba redactados en **Gherkin**, junto con los scripts de Maestro y espacios para las capturas de pantalla de la ejecución.

---
**Desarrollado por:** Josué Sánchez — Proyecto de Automatización E2E & Arquitectura Móvil