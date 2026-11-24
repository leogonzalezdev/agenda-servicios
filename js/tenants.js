/**
 * Motor de configuración Multitenant + Plantillas de Estilo para Link del Cliente
 * Cada tenant define su plantilla visual, acento, assets, servicios,
 * reglas de seña, horarios, políticas, galería y turnos.
 */

window.FONT_PRESETS = {
  glam: {
    id: 'glam',
    label: 'Moderna Glam',
    display: "'Poppins', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif"
  },
  editorial: {
    id: 'editorial',
    label: 'Editorial Spa',
    display: "'Playfair Display', Georgia, serif",
    body: "'Plus Jakarta Sans', sans-serif"
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal Pro',
    display: "'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif"
  }
};

window.RADIUS_PRESETS = {
  cute: { id: 'cute', label: 'Suave', card: '20px', btn: '999px', chip: '999px', input: '14px' },
  soft: { id: 'soft', label: 'Clásico', card: '14px', btn: '10px', chip: '8px', input: '10px' },
  sharp: { id: 'sharp', label: 'Recto', card: '6px', btn: '6px', chip: '4px', input: '6px' }
};

/**
 * Plantillas listas para el link público del cliente (selector en Panel Emprendimiento)
 */
window.CLIENT_TEMPLATES = [
  {
    id: 'glam-rose',
    name: 'Glam Studio',
    desc: 'Luminoso, expresivo y femenino',
    primary: '#E91E8C',
    primaryDark: '#C21472',
    primarySoft: '#FFE6F2',
    bg: '#FFF7FB',
    surface: '#FFFFFF',
    accent: '#D9A438',
    text: '#26141F',
    muted: '#7B5E6F',
    isDark: false,
    fontId: 'glam',
    radiusId: 'cute'
  },
  {
    id: 'editorial-spa',
    name: 'Editorial Spa',
    desc: 'Cálido, serifa elegante y minimal',
    primary: '#B85D43',
    primaryDark: '#92442E',
    primarySoft: '#F5E5DE',
    bg: '#FAF6F2',
    surface: '#FFFFFF',
    accent: '#7D8E79',
    text: '#2D2420',
    muted: '#7B6B63',
    isDark: false,
    fontId: 'editorial',
    radiusId: 'soft'
  },
  {
    id: 'soft-boutique',
    name: 'Soft Boutique',
    desc: 'Limpio, fresco y equilibrado',
    primary: '#6D4AFF',
    primaryDark: '#5232D9',
    primarySoft: '#EFEAFF',
    bg: '#F8F7FC',
    surface: '#FFFFFF',
    accent: '#14B8A6',
    text: '#1E1B2E',
    muted: '#6B6785',
    isDark: false,
    fontId: 'minimal',
    radiusId: 'soft'
  },
  {
    id: 'noir-luxe',
    name: 'Noir Luxe',
    desc: 'Oscuro sofisticado con acento oro',
    primary: '#D4AF37',
    primaryDark: '#B38E1D',
    primarySoft: '#2E281B',
    bg: '#121015',
    surface: '#1D1922',
    accent: '#E987B5',
    text: '#FAF5EE',
    muted: '#ACA2B5',
    isDark: true,
    fontId: 'minimal',
    radiusId: 'sharp'
  }
];

function getRelativeDateISO(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

window.getRelativeDateISO = getRelativeDateISO;

window.INITIAL_TENANTS = {
  'brillo-de-luna': {
    id: 'brillo-de-luna',
    slug: 'brillodeluna',
    name: 'Brillo de Luna',
    subtitle: 'by Agus Nails',
    ownerName: 'Agus',
    rubro: 'Nail Studio · Manicura & Nail Art',
    instagram: '@brillodeluna.agusnails',
    whatsapp: '5493515551234',
    whatsappDisplay: '+54 9 351 555-1234',
    address: 'Córdoba, Argentina (dirección exacta al confirmar)',
    rating: '4.9',
    reviewsCount: 148,
    announcement: 'Agenda de Diciembre abierta · Reservas únicamente con seña',
    theme: {
      templateId: 'glam-rose',
      primary: '#E91E8C',
      primaryDark: '#C21472',
      primarySoft: '#FFE6F2',
      bg: '#FFF7FB',
      surface: '#FFFFFF',
      accent: '#D9A438',
      text: '#26141F',
      muted: '#7B5E6F',
      isDark: false,
      fontId: 'glam',
      radiusId: 'cute',
      headerStyle: 'banner', // 'banner' | 'circular'
      showMascot: true
    },
    assets: {
      logoCircular: 'assets/brillo-de-luna/logo-circular.png',
      logoBanner: 'assets/brillo-de-luna/logo-banner.png',
      mascot: 'assets/brillo-de-luna/mascot-agus.png',
      monogram: 'BL'
    },
    portfolio: [
      {
        id: 'w1',
        title: 'French Rosa Glitter + Strass',
        serviceId: 's4',
        serviceName: 'Soft Gel',
        extraSummary: 'Set French + Strass',
        src: 'assets/brillo-de-luna/work-1.jpg',
        gradient: 'linear-gradient(135deg, #ffd1e6, #ff82be)',
        featured: true
      },
      {
        id: 'w2',
        title: 'Milky Nude Aurora Pearl',
        serviceId: 's3',
        serviceName: 'Kapping',
        extraSummary: 'Efecto aurora sutil',
        src: 'assets/brillo-de-luna/work-2.jpg',
        gradient: 'linear-gradient(135deg, #fff4eb, #f3d6c4)',
        featured: true
      },
      {
        id: 'w3',
        title: 'Coquette Moños 3D + Perlas',
        serviceId: 's5',
        serviceName: 'Soft Gel Híbrido',
        extraSummary: 'Diseños 3D + Joyería',
        src: 'assets/brillo-de-luna/work-3.jpg',
        gradient: 'linear-gradient(135deg, #ffe0f0, #f5b3d8)',
        featured: true
      },
      {
        id: 'w4',
        title: 'Glazed Cherry & Barbie Swirl',
        serviceId: 's2',
        serviceName: 'Semipermanente',
        extraSummary: 'Diseño a mano alzada',
        src: 'assets/brillo-de-luna/work-4.jpg',
        gradient: 'linear-gradient(135deg, #ff6b8b, #e91e8c)',
        featured: true
      }
    ],
    categories: [
      { id: 'servicios', name: 'Servicios', icon: 'sparkles', mode: 'single', required: true, hint: 'Elegí tu servicio principal' },
      { id: 'extras', name: 'Extras', icon: 'gem', mode: 'multi', required: false, hint: 'Sumá diseños, strass o joyería' },
      { id: 'retiros', name: 'Retiros', icon: 'droplet', mode: 'single-optional', required: false, hint: 'Indicá si traés producto para retirar' }
    ],
    services: [
      { id: 's1', categoryId: 'servicios', name: 'Manicura Rusa', price: 8000, desde: false, duration: 45, active: true, countable: false, desc: 'Limpieza profunda de cutículas, limado prolijo e hidratación.' },
      { id: 's2', categoryId: 'servicios', name: 'Semipermanente', price: 18000, desde: true, duration: 60, active: true, countable: false, desc: 'Esmaltado en gel de larga duración con brillo espejo.' },
      { id: 's3', categoryId: 'servicios', name: 'Kapping', price: 21000, desde: true, duration: 75, active: true, countable: false, desc: 'Baño nivelador de gel o acrílico para fortalecer tu uña natural.' },
      { id: 's4', categoryId: 'servicios', name: 'Soft Gel', price: 23000, desde: true, duration: 90, active: true, countable: false, desc: 'Extensión completa de uñas livianas, resistentes y prolijas.' },
      { id: 's5', categoryId: 'servicios', name: 'Soft Gel Híbrido', price: 25000, desde: true, duration: 105, active: true, countable: false, desc: 'Técnica combinada para máxima durabilidad y estructura.' },
      { id: 's6', categoryId: 'servicios', name: 'Servis', price: 20000, desde: true, duration: 75, active: true, countable: false, desc: 'Mantenimiento de crecimiento y renovación de color.' },
      { id: 's7', categoryId: 'servicios', name: 'Press On Nails', price: 15000, desde: true, duration: 30, active: true, countable: false, desc: 'Set reutilizable a medida con diseño personalizado.' },

      { id: 'e1', categoryId: 'extras', name: 'Diseño por uña', price: 500, desde: true, duration: 5, active: true, countable: true, unit: 'uña', desc: 'Nail art a mano alzada, aurora o efectos.' },
      { id: 'e2', categoryId: 'extras', name: 'Diseños 3D', price: 1000, desde: false, duration: 10, active: true, countable: true, unit: 'uña', desc: 'Relieves 3D, moños, gotas o texturas esculpidas.' },
      { id: 'e3', categoryId: 'extras', name: 'Strass', price: 100, desde: false, duration: 2, active: true, countable: true, unit: 'c/u', desc: 'Cristales brillantes aplicados con gel fijador.' },
      { id: 'e4', categoryId: 'extras', name: 'Joyería', price: 500, desde: false, duration: 5, active: true, countable: true, unit: 'c/u', desc: 'Dijes metálicos, corazones, perlas o charms.' },
      { id: 'e5', categoryId: 'extras', name: 'Set Completo de French', price: 5000, desde: false, duration: 20, active: true, countable: false, desc: 'Francesita clásica o de color en las 10 uñas.' },

      { id: 'r1', categoryId: 'retiros', name: 'Retiro Servicio Soft Gel', price: 3000, desde: false, duration: 25, active: true, countable: false, desc: 'Remoción cuidada de Soft Gel realizado en Brillo de Luna.' },
      { id: 'r2', categoryId: 'retiros', name: 'Retiro Servicio Kapping', price: 1500, desde: false, duration: 20, active: true, countable: false, desc: 'Remoción suave de Kapping sin dañar la lámina.' },
      { id: 'r3', categoryId: 'retiros', name: 'Retiro de otra colega', price: 5000, desde: false, duration: 35, active: true, countable: false, desc: 'Remoción de producto realizado en otro estudio.' }
    ],
    bookingRules: {
      depositRequired: true,
      depositType: 'fixed',
      depositValue: 5000,
      alias: 'brillodeluna.nails.mp',
      holder: 'Agustina M. López',
      bank: 'Mercado Pago',
      mercadoPagoEnabled: true,
      toleranceMinutes: 10,
      allowReschedule: false,
      askReferencePhoto: true,
      importantNotice: 'LOS TURNOS DE DICIEMBRE NO PODRÁN SER MOVIDOS. Estén seguras al momento de reservar.',
      policySections: [
        {
          title: '1. Reserva del turno',
          bullets: [
            'Para reservar turno sí o sí se deberá señar. Sin seña no se reserva, sin excepción.',
            'La seña se descuenta del total del servicio.',
            'Avisar con anticipación servicio a elegir y si hay producto que remover.'
          ]
        },
        {
          title: '2. Cancelaciones',
          bullets: [
            'La seña no es reembolsable, por lo tanto en caso de cancelación tampoco es reconocida para un nuevo turno.'
          ]
        },
        {
          title: '3. Puntualidad',
          bullets: [
            'Hay una tolerancia de 10 minutos. Pasados, el turno queda cancelado.',
            'No llegar con demasiada anticipación (respetemos el turno de todas).'
          ]
        },
        {
          title: '4. Momento de asistir',
          bullets: [
            'Manos limpias e higienizadas.',
            'No asistir con acompañantes ni niños.',
            'Venir con diseño elegido previamente (en lo posible).'
          ]
        }
      ]
    },
    schedule: {
      slotInterval: 30,
      days: [
        { key: 1, label: 'Lunes', short: 'Lun', enabled: false, start: '10:00', end: '19:00' },
        { key: 2, label: 'Martes', short: 'Mar', enabled: true, start: '09:30', end: '19:30' },
        { key: 3, label: 'Miércoles', short: 'Mié', enabled: true, start: '09:30', end: '19:30' },
        { key: 4, label: 'Jueves', short: 'Jue', enabled: true, start: '09:30', end: '19:30' },
        { key: 5, label: 'Viernes', short: 'Vie', enabled: true, start: '09:30', end: '20:00' },
        { key: 6, label: 'Sábado', short: 'Sáb', enabled: true, start: '09:00', end: '18:00' },
        { key: 0, label: 'Domingo', short: 'Dom', enabled: false, start: '10:00', end: '14:00' }
      ]
    },
    clients: [
      { id: 'c1', name: 'Camila Fernández', phone: '11 4589-2210', ig: '@cami.fer', visits: 7, spent: 162000, note: 'Prefiere almendra corta · Tonos rosados', tag: 'VIP' },
      { id: 'c2', name: 'Sofía Martínez', phone: '11 6721-9034', ig: '@sofimartinez', visits: 4, spent: 98500, note: 'Usa Soft Gel, suele pedir strass', tag: 'Frecuente' },
      { id: 'c3', name: 'Valentina Ruiz', phone: '11 3340-8812', ig: '@valenruiz_', visits: 2, spent: 49000, note: 'Viene de otra colega para retiro + kapping', tag: 'Nueva' },
      { id: 'c4', name: 'Micaela Gómez', phone: '11 5190-7745', ig: '@mica.g', visits: 5, spent: 118000, note: 'Siempre puntual', tag: 'Frecuente' }
    ],
    appointments: [
      {
        id: 'BL-1042',
        date: getRelativeDateISO(0),
        time: '10:00',
        duration: 105,
        clientName: 'Camila Fernández',
        clientPhone: '11 4589-2210',
        clientIg: '@cami.fer',
        items: [
          { name: 'Soft Gel', price: 23000, qty: 1, categoryId: 'servicios' },
          { name: 'Set Completo de French', price: 5000, qty: 1, categoryId: 'extras' },
          { name: 'Strass', price: 100, qty: 6, categoryId: 'extras' }
        ],
        total: 28600,
        depositAmount: 5000,
        status: 'confirmed',
        paymentMethod: 'Transferencia',
        receiptNote: 'Comprobante #MP-88219 verificado',
        designRef: 'French Rosa Glitter + Strass',
        notes: 'Largo medio almendrado.',
        isMine: true
      },
      {
        id: 'BL-1043',
        date: getRelativeDateISO(0),
        time: '13:00',
        duration: 110,
        clientName: 'Valentina Ruiz',
        clientPhone: '11 3340-8812',
        clientIg: '@valenruiz_',
        items: [
          { name: 'Kapping', price: 21000, qty: 1, categoryId: 'servicios' },
          { name: 'Retiro de otra colega', price: 5000, qty: 1, categoryId: 'retiros' },
          { name: 'Diseño por uña', price: 500, qty: 2, categoryId: 'extras' }
        ],
        total: 27000,
        depositAmount: 5000,
        status: 'pending_deposit',
        paymentMethod: 'Transferencia',
        receiptNote: 'Comprobante adjunto (Transferencia $5.000 · hoy 11:42)',
        designRef: 'Milky Nude Aurora Pearl',
        notes: 'Traigo semipermanente de hace 3 semanas.',
        isMine: false
      },
      {
        id: 'BL-1044',
        date: getRelativeDateISO(0),
        time: '16:00',
        duration: 60,
        clientName: 'Sofía Martínez',
        clientPhone: '11 6721-9034',
        clientIg: '@sofimartinez',
        items: [
          { name: 'Semipermanente', price: 18000, qty: 1, categoryId: 'servicios' },
          { name: 'Joyería', price: 500, qty: 2, categoryId: 'extras' }
        ],
        total: 19000,
        depositAmount: 5000,
        status: 'confirmed',
        paymentMethod: 'Mercado Pago',
        receiptNote: 'Aprobado automático MP',
        designRef: 'Glazed Cherry & Barbie Swirl',
        notes: '',
        isMine: false
      },
      {
        id: 'BL-1045',
        date: getRelativeDateISO(1),
        time: '11:00',
        duration: 105,
        clientName: 'Micaela Gómez',
        clientPhone: '11 5190-7745',
        clientIg: '@mica.g',
        items: [
          { name: 'Soft Gel Híbrido', price: 25000, qty: 1, categoryId: 'servicios' },
          { name: 'Diseños 3D', price: 1000, qty: 2, categoryId: 'extras' }
        ],
        total: 27000,
        depositAmount: 5000,
        status: 'pending_deposit',
        paymentMethod: 'Transferencia',
        receiptNote: 'Comprobante adjunto (Transferencia $5.000 · hoy 13:15)',
        designRef: 'Coquette Moños 3D + Perlas',
        notes: 'Sin retiro.',
        isMine: false
      }
    ]
  },

  'aura-depilacion': {
    id: 'aura-depilacion',
    slug: 'auraestetica',
    name: 'Aura Estética',
    subtitle: 'Depilación Láser & Cejas',
    ownerName: 'Lucía',
    rubro: 'Depilación Definitiva · Cejas & Pestañas',
    instagram: '@aura.estetica.ba',
    whatsapp: '5491144449988',
    whatsappDisplay: '+54 9 11 4444-9988',
    address: 'Córdoba, Argentina · Nueva Córdoba',
    rating: '5.0',
    reviewsCount: 92,
    announcement: 'Pack Verano: 15% OFF reservando 2 o más zonas',
    theme: {
      templateId: 'editorial-spa',
      primary: '#B85D43',
      primaryDark: '#92442E',
      primarySoft: '#F5E5DE',
      bg: '#FAF6F2',
      surface: '#FFFFFF',
      accent: '#7D8E79',
      text: '#2D2420',
      muted: '#7B6B63',
      isDark: false,
      fontId: 'editorial',
      radiusId: 'soft',
      headerStyle: 'circular',
      showMascot: false
    },
    assets: {
      logoCircular: '',
      logoBanner: '',
      mascot: '',
      monogram: 'AE'
    },
    portfolio: [
      {
        id: 'aw1',
        title: 'Lifting Natural Keratina',
        serviceId: 'a5',
        serviceName: 'Lifting de Pestañas + Nutrición',
        extraSummary: 'Curvatura efecto rímel',
        src: '',
        gradient: 'linear-gradient(135deg, #f3dfd6, #d9a796)',
        featured: true
      },
      {
        id: 'aw2',
        title: 'Laminado & Perfilado Brow',
        serviceId: 'a6',
        serviceName: 'Perfilado + Laminado de Cejas',
        extraSummary: 'Acabado orgánico',
        src: '',
        gradient: 'linear-gradient(135deg, #e7ece4, #b7c6b2)',
        featured: true
      }
    ],
    categories: [
      { id: 'depilacion', name: 'Depilación Láser', icon: 'leaf', mode: 'single', required: true, hint: 'Tecnología Soprano Ice indolora' },
      { id: 'mirada', name: 'Cejas & Pestañas', icon: 'eye', mode: 'multi', required: false, hint: 'Complementá tu sesión' }
    ],
    services: [
      { id: 'a1', categoryId: 'depilacion', name: 'Pierna Entera + Cavado + Axilas', price: 29000, desde: false, duration: 45, active: true, countable: false, desc: 'Combo completo con gel neutro y cabezal frío.' },
      { id: 'a2', categoryId: 'depilacion', name: 'Cavado Completo + Tiro de Cola', price: 16500, desde: false, duration: 25, active: true, countable: false, desc: 'Sesión rápida, higiénica y confortable.' },
      { id: 'a3', categoryId: 'depilacion', name: 'Axilas + Bozo', price: 11000, desde: false, duration: 20, active: true, countable: false, desc: 'Ideal para mantenimiento mensual.' },
      { id: 'a4', categoryId: 'depilacion', name: 'Cuerpo Completo Mujer', price: 46000, desde: false, duration: 60, active: true, countable: false, desc: 'Todas las zonas en una misma sesión.' },
      { id: 'a5', categoryId: 'mirada', name: 'Lifting de Pestañas + Nutrición', price: 19500, desde: false, duration: 50, active: true, countable: false, desc: 'Curvatura natural con keratina.' },
      { id: 'a6', categoryId: 'mirada', name: 'Perfilado + Laminado de Cejas', price: 17000, desde: false, duration: 40, active: true, countable: false, desc: 'Diseño según tu rostro + fijación.' }
    ],
    bookingRules: {
      depositRequired: true,
      depositType: 'percent',
      depositValue: 25,
      alias: 'aura.estetica.cbu',
      holder: 'Lucía Pereyra',
      bank: 'Banco Galicia',
      mercadoPagoEnabled: true,
      toleranceMinutes: 15,
      allowReschedule: true,
      askReferencePhoto: false,
      importantNotice: 'Asistir con la zona rasurada 12-24 hs antes (no usar cera ni pinza).',
      policySections: [
        {
          title: '1. Reserva y Seña',
          bullets: [
            'Se abona el 25% de seña para bloquear tu horario.',
            'El saldo se abona en el consultorio en efectivo o transferencia.'
          ]
        },
        {
          title: '2. Reprogramaciones',
          bullets: [
            'Podés reprogramar sin cargo avisando con al menos 24 hs de anticipación.'
          ]
        },
        {
          title: '3. Preparación previa',
          bullets: [
            'Venir sin cremas ni desodorante en la zona a tratar.',
            'Tolerancia de llegada: 15 minutos.'
          ]
        }
      ]
    },
    schedule: {
      slotInterval: 30,
      days: [
        { key: 1, label: 'Lunes', short: 'Lun', enabled: true, start: '10:00', end: '19:00' },
        { key: 2, label: 'Martes', short: 'Mar', enabled: true, start: '10:00', end: '19:00' },
        { key: 3, label: 'Miércoles', short: 'Mié', enabled: true, start: '10:00', end: '19:00' },
        { key: 4, label: 'Jueves', short: 'Jue', enabled: true, start: '10:00', end: '19:00' },
        { key: 5, label: 'Viernes', short: 'Vie', enabled: true, start: '10:00', end: '19:00' },
        { key: 6, label: 'Sábado', short: 'Sáb', enabled: true, start: '09:30', end: '15:00' },
        { key: 0, label: 'Domingo', short: 'Dom', enabled: false, start: '10:00', end: '14:00' }
      ]
    },
    clients: [
      { id: 'ac1', name: 'Julieta Sosa', phone: '11 6099-1122', ig: '@julisosa', visits: 6, spent: 174000, note: 'Sesión #6 láser piernas', tag: 'Pack Activo' },
      { id: 'ac2', name: 'Florencia Paz', phone: '11 5412-8877', ig: '@florpaz', visits: 3, spent: 56000, note: 'Piel sensible, usar potencia media', tag: 'Frecuente' }
    ],
    appointments: [
      {
        id: 'AU-301',
        date: getRelativeDateISO(0),
        time: '11:00',
        duration: 45,
        clientName: 'Julieta Sosa',
        clientPhone: '11 6099-1122',
        clientIg: '@julisosa',
        items: [{ name: 'Pierna Entera + Cavado + Axilas', price: 29000, qty: 1, categoryId: 'depilacion' }],
        total: 29000,
        depositAmount: 7250,
        status: 'confirmed',
        paymentMethod: 'Mercado Pago',
        receiptNote: 'Pagado vía MP',
        designRef: '',
        notes: 'Sesión 6',
        isMine: true
      }
    ]
  },

  'velvet-studio': {
    id: 'velvet-studio',
    slug: 'velvetnoir',
    name: 'Velvet Noir',
    subtitle: 'Brows · Lashes · Luxury Nails',
    ownerName: 'Delfi',
    rubro: 'Beauty Bar Nocturno & Luxury',
    instagram: '@velvetnoir.studio',
    whatsapp: '5491177773322',
    whatsappDisplay: '+54 9 11 7777-3322',
    address: 'Córdoba, Argentina · Cerro de las Rosas',
    rating: '4.9',
    reviewsCount: 210,
    announcement: 'Horario extendido hasta las 21 hs · Jueves a Sábado',
    theme: {
      templateId: 'noir-luxe',
      primary: '#D4AF37',
      primaryDark: '#B38E1D',
      primarySoft: '#2E281B',
      bg: '#121015',
      surface: '#1D1922',
      accent: '#E987B5',
      text: '#FAF5EE',
      muted: '#ACA2B5',
      isDark: true,
      fontId: 'minimal',
      radiusId: 'sharp',
      headerStyle: 'circular',
      showMascot: false
    },
    assets: {
      logoCircular: '',
      logoBanner: '',
      mascot: '',
      monogram: 'VN'
    },
    portfolio: [
      {
        id: 'vw1',
        title: 'Fox Eye Mega Volumen',
        serviceId: 'v3',
        serviceName: 'Mega Volumen Fox Eye',
        extraSummary: 'Curvatura D · Rasgado',
        src: '',
        gradient: 'linear-gradient(135deg, #332a1d, #8c6f27)',
        featured: true
      },
      {
        id: 'vw2',
        title: 'Volumen 3D Aterciopelado',
        serviceId: 'v2',
        serviceName: 'Volumen Tecnológico 3D',
        extraSummary: 'Efecto intenso suave',
        src: '',
        gradient: 'linear-gradient(135deg, #2b1d2e, #6b3859)',
        featured: true
      }
    ],
    categories: [
      { id: 'lashes', name: 'Pestañas', icon: 'eye', mode: 'single', required: true, hint: 'Volumen personalizado' },
      { id: 'extras', name: 'Add-ons', icon: 'sparkles', mode: 'multi', required: false, hint: 'Sumá retoques' }
    ],
    services: [
      { id: 'v1', categoryId: 'lashes', name: 'Efecto Rimel / Clásicas', price: 24000, desde: false, duration: 90, active: true, countable: false, desc: 'Sutiles, prolijas y livianas.' },
      { id: 'v2', categoryId: 'lashes', name: 'Volumen Tecnológico 3D', price: 29000, desde: false, duration: 105, active: true, countable: false, desc: 'Mirada intensa con acabado aterciopelado.' },
      { id: 'v3', categoryId: 'lashes', name: 'Mega Volumen Fox Eye', price: 34000, desde: true, duration: 120, active: true, countable: false, desc: 'Diseño rasgado de alto impacto.' },
      { id: 'v4', categoryId: 'extras', name: 'Remoción de pestañas', price: 6000, desde: false, duration: 25, active: true, countable: false, desc: 'Con crema removedora hipoalergénica.' },
      { id: 'v5', categoryId: 'extras', name: 'Diseño de cejas con pinza', price: 7500, desde: false, duration: 20, active: true, countable: false, desc: 'Visagismo limpio.' }
    ],
    bookingRules: {
      depositRequired: true,
      depositType: 'fixed',
      depositValue: 8000,
      alias: 'velvet.noir.studio',
      holder: 'Delfina Castro',
      bank: 'Brubank',
      mercadoPagoEnabled: true,
      toleranceMinutes: 10,
      allowReschedule: true,
      askReferencePhoto: true,
      importantNotice: 'Asistir sin maquillaje en ojos ni máscara de pestañas.',
      policySections: [
        {
          title: '1. Seña obligatoria',
          bullets: ['La seña de $8.000 confirma tu turno y se descuenta del total.']
        },
        {
          title: '2. Asistencia',
          bullets: ['Venir sin lentes de contacto ni maquillaje en ojos.', 'Tolerancia máxima: 10 minutos.']
        }
      ]
    },
    schedule: {
      slotInterval: 30,
      days: [
        { key: 1, label: 'Lunes', short: 'Lun', enabled: false, start: '11:00', end: '20:00' },
        { key: 2, label: 'Martes', short: 'Mar', enabled: true, start: '11:00', end: '20:00' },
        { key: 3, label: 'Miércoles', short: 'Mié', enabled: true, start: '11:00', end: '20:00' },
        { key: 4, label: 'Jueves', short: 'Jue', enabled: true, start: '11:00', end: '21:00' },
        { key: 5, label: 'Viernes', short: 'Vie', enabled: true, start: '11:00', end: '21:00' },
        { key: 6, label: 'Sábado', short: 'Sáb', enabled: true, start: '10:00', end: '20:00' },
        { key: 0, label: 'Domingo', short: 'Dom', enabled: false, start: '10:00', end: '14:00' }
      ]
    },
    clients: [
      { id: 'vc1', name: 'Martina Belén', phone: '11 9821-4430', ig: '@martubelen', visits: 8, spent: 256000, note: 'Curvatura D · Fox eye', tag: 'VIP' }
    ],
    appointments: [
      {
        id: 'VN-702',
        date: getRelativeDateISO(0),
        time: '15:00',
        duration: 105,
        clientName: 'Martina Belén',
        clientPhone: '11 9821-4430',
        clientIg: '@martubelen',
        items: [{ name: 'Volumen Tecnológico 3D', price: 29000, qty: 1, categoryId: 'lashes' }],
        total: 29000,
        depositAmount: 8000,
        status: 'confirmed',
        paymentMethod: 'Transferencia',
        receiptNote: 'Confirmado',
        designRef: '',
        notes: '',
        isMine: true
      }
    ]
  }
};
