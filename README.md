# Agenda de Servicios — Mockup Interactivo Multitenant

Prototipo interactivo **mobile-first** (sin compilación ni dependencias pesadas) de la plataforma multitenant de agenda de servicios para emprendimientos de estética (uñas, depilación, cejas/pestañas, etc.), configurado inicialmente para **Brillo de Luna by Agus Nails**.

## Cómo abrirlo

- **Local (sin instalar nada):** abrí directamente `index.html` en tu navegador.
- **En la nube (Firebase Studio / Project IDX):** subí este repo a GitHub y abrilo en Firebase Studio; el archivo `.idx/dev.nix` levanta la vista previa automáticamente sin exigirle recursos a la PC.

## Qué incluye el mockup

1. **App del Cliente (`slug.turnos.app`)**
   - Portada personalizable con logo, mascota, stickers, anuncio de temporada y **Galería de Trabajos de referencia** (tocar cualquier foto permite verla en grande y pulsar *"✨ Quiero este estilo"* para preseleccionar el servicio y adjuntar el diseño).
   - Lista de precios por categorías (**Servicios**, **Extras** con contador `+/-` por unidad, **Retiros**).
   - Flujo completo de reserva en 5 pasos: Fecha/Hora dinámica → Datos y diseño de referencia (o subida de foto propia) → Aceptación obligatoria de **Política de Turnos** → Pago de Seña (Alias con 1 clic + comprobante o Mercado Pago) → Ticket de confirmación.
   - Secciones **📸 Trabajos**, **📅 Mis Turnos** (actualización de estado en tiempo real) y **📋 Políticas**.

2. **Panel del Emprendimiento (Admin)**
   - **📅 Agenda:** turnos del día, bandeja de **señas por aprobar** (al aprobar se confirma en vivo en la App Cliente), turnos manuales y bloqueos de horario.
   - **💅 Precios:** crear, editar precios/duraciones o pausar servicios con sincronización inmediata.
   - **⚙️ Reglas:** monto/% de seña, alias, tolerancia, activar/desactivar reprogramaciones (ej. Agenda Diciembre) y horarios semanales.
   - **🎨 Marca (Personalización Multitenant):** paletas listas, selectores de color a medida, tipografía, estilo de bordes, logo/mascota/stickers y gestión de la **Galería de Trabajos**.
   - **💰 Caja:** señas confirmadas, facturación proyectada, servicios más pedidos y ficha de clientas.

3. **Selector de Marca (Multitenant)**
   - En la barra superior podés alternar entre **Brillo de Luna** (Uñas), **Aura Estética** (Depilación Láser & Cejas) y **Velvet Noir** (Pestañas Dark Glam), o ver **App Cliente + Panel Emprendimiento lado a lado**.
