# language: es
Característica: Reserva de Servicios y Gestión en AgendaPro
  Como usuario del sistema AgendaPro
  Quiero poder agendar citas como cliente y gestionar reservas como profesional
  Para garantizar una atención organizada y eficiente.

  Criterios de Aceptación:
  - El cliente debe seleccionar una sede, profesional, servicio, fecha y hora.
  - Se debe validar que los campos obligatorios del cliente no estén vacíos.
  - Una cita confirmada debe reflejarse inmediatamente en el Dashboard del Profesional.
  - El profesional debe poder filtrar y cancelar citas activas.

  @e2e @reserva @exitoso
  Escenario: Reserva exitosa de una cita desde el flujo de Cliente
    Dado que el usuario inicia la aplicación en "Modo Cliente"
    Y se encuentra en la pantalla de "Selección de Sede"
    Cuando selecciona la sede "Sede Central Polanco"
    Y elige al profesional "Dr. Carlos Mendoza"
    Y selecciona el servicio "Corte Executive & Barba"
    Y elige la fecha "2026-10-05" y el horario "10:30"
    Y completa su nombre "Carlos Eduardo" y teléfono "5512345678"
    Y presiona el botón "Revisar Reserva"
    Y confirma la información presionando "Confirmar y Registrar Cita"
    Entonces la aplicación muestra el mensaje "¡Tu cita ha sido agendada con éxito!"
    Y genera un ticket de reserva con el detalle de la cita

  @e2e @reserva @validacion
  Escenario: Validación de campos requeridos al agendar una cita
    Dado que el usuario inicia la aplicación en "Modo Cliente"
    Y avanza hasta la pantalla de "Fecha, Hora y Datos"
    Cuando intenta presionar "Revisar Reserva" sin seleccionar fecha ni hora
    Entonces la aplicación muestra el mensaje de error "Por favor selecciona una fecha."
    Cuando selecciona la fecha "2026-10-05" y la hora "10:30"
    Y deja el campo de nombre vacío
    Y presiona "Revisar Reserva"
    Entonces la aplicación muestra el mensaje de error "Por favor ingresa tu nombre completo."

  @e2e @dashboard @profesional
  Escenario: Visualización y cancelación de cita en el Dashboard Profesional
    Dado que existe una cita confirmada para el cliente "Carlos Eduardo"
    Cuando el usuario cambia al "Modo Profesional" desde el encabezado
    Entonces se visualiza la pantalla de "Dashboard del Profesional"
    Y la cita de "Carlos Eduardo" aparece en el listado ordenada cronológicamente
    Y las métricas de "Total Citas" e "Ingreso Est." se actualizan
    Cuando el profesional presiona el botón "Cancelar Cita" de la reserva de "Carlos Eduardo"
    Entonces el estado de la cita cambia a "CANCELADA"
    Y la métrica de ingresos excluye el monto de la cita cancelada
