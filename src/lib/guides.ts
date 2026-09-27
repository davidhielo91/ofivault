export type GuideCallout = {
  tone: "info" | "warning";
  title: string;
  text: string;
};

export type GuideCodeBlock = {
  label?: string;
  code: string;
  note?: string;
};

export type GuideSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: GuideCallout;
  codeBlocks?: GuideCodeBlock[];
};

export type Guide = {
  category: "Office 2024" | "Soporte" | "Instalación";
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  answer: string;
  steps: Array<{ title: string; description: string }>;
  sections: GuideSection[];
  questions: Array<{ question: string; answer: string }>;
  officialSource: { label: string; url: string };
  officialSources?: Array<{ label: string; url: string }>;
  relatedSlugs: string[];
  updatedAt: string;
};

export const guides: Guide[] = [
  {
    category: "Office 2024",
    slug: "requisitos-office-2024",
    title: "Requisitos de Office 2024: Windows, memoria y espacio",
    shortTitle: "Requisitos de Office 2024",
    description: "Comprueba si tu PC puede ejecutar Office 2024: Windows compatible, procesador, memoria, espacio, arquitectura y conexión necesaria.",
    eyebrow: "Compatibilidad 2024",
    intro: "Antes de descargar Office 2024 conviene identificar la edición y el canal de licencia, porque los requisitos de la versión para consumidores y de Office LTSC 2024 no son idénticos.",
    answer: "Para Office 2024 de consumo, Microsoft indica Windows 10 o Windows 11, procesador de dos núcleos a 1,6 GHz, 4 GB de RAM para 64 bits o 2 GB para 32 bits y 4 GB de espacio. En 2026, Windows 11 es la opción prudente porque el soporte general de Windows 10 terminó el 14 de octubre de 2025.",
    steps: [
      { title: "Identifica la edición", description: "Comprueba si tu licencia corresponde a Office 2024 para consumidores, Professional Plus o una edición LTSC por volumen." },
      { title: "Revisa Windows", description: "Abre Configuración, Sistema y Acerca de para comprobar la edición, la versión y el tipo de sistema." },
      { title: "Comprueba memoria y espacio", description: "Reserva al menos 4 GB de espacio y confirma que el equipo tiene la memoria necesaria para la arquitectura elegida." },
      { title: "Detecta instalaciones anteriores", description: "Busca versiones previas de Office, Project o Visio que puedan usar otra arquitectura o canal." },
      { title: "Prepara internet y licencia", description: "Necesitarás conexión para descargar, activar y recibir actualizaciones, además de una licencia válida." },
    ],
    sections: [
      {
        title: "Requisitos básicos para Office 2024 en PC",
        bullets: [
          "Windows 11 o Windows 10, teniendo en cuenta que Windows 10 ya terminó su soporte general.",
          "Procesador de dos núcleos a 1,6 GHz para la edición de consumo.",
          "4 GB de RAM para 64 bits o 2 GB para 32 bits.",
          "4 GB de espacio disponible y pantalla de 1024 × 768 como mínimo.",
          "Acceso a internet y cuenta o licencia correspondiente para instalar y activar.",
        ],
      },
      {
        title: "Office LTSC 2024 tiene otra matriz de soporte",
        paragraphs: [
          "Office LTSC 2024 está pensado para organizaciones con licencias por volumen. Microsoft publica sistemas compatibles y métodos de activación propios para ese canal, por lo que no se debe asumir que cualquier instalador llamado Office 2024 es LTSC.",
          "Comprueba siempre el canal de tu licencia antes de instalar. El nombre del archivo no sustituye los términos ni la compatibilidad de la licencia.",
        ],
      },
      {
        title: "Estas imágenes IMG son para Windows",
        paragraphs: [
          "Los archivos IMG del catálogo contienen instaladores para Windows. Office 2024 también dispone de versiones para Mac, pero usan paquetes y licencias específicos y no se instalan desde estos archivos IMG.",
        ],
      },
    ],
    questions: [
      { question: "¿Office 2024 funciona en Windows 11?", answer: "Sí. Windows 11 es compatible y es la opción recomendada para un equipo que seguirá recibiendo soporte y actualizaciones del sistema." },
      { question: "¿Office 2024 funciona en Windows 10?", answer: "Microsoft incluye Windows 10 entre los sistemas de Office 2024 para consumidores, pero el soporte general de Windows 10 terminó el 14 de octubre de 2025. Conviene migrar a Windows 11 si el equipo lo permite." },
      { question: "¿Puedo instalar este IMG en un Mac?", answer: "No. Los IMG publicados en el catálogo son para Windows. Office para Mac utiliza un instalador y una licencia diferentes." },
      { question: "¿Necesito 4 GB de RAM?", answer: "Microsoft indica 4 GB para Office de 64 bits y 2 GB para 32 bits en la edición de consumo. Más memoria mejora el trabajo con archivos grandes y varias aplicaciones abiertas." },
    ],
    officialSource: {
      label: "Requisitos del sistema para conjuntos de aplicaciones de Office",
      url: "https://support.microsoft.com/es-es/office/system-requirements/office-suites-for-individuals-and-families",
    },
    officialSources: [
      { label: "Preguntas frecuentes oficiales sobre Office 2024 y Office LTSC 2024", url: "https://support.microsoft.com/es-es/office/lifecycle/office-2024-and-office-ltsc-2024-faq" },
    ],
    relatedSlugs: ["como-instalar-office-2024", "office-2024-professional-plus", "office-32-o-64-bits", "limpiar-office-antes-de-instalar"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Office 2024",
    slug: "office-2024-vs-microsoft-365",
    title: "Office 2024 vs Microsoft 365: diferencias y cuál elegir",
    shortTitle: "Office 2024 vs Microsoft 365",
    description: "Compara Office 2024 y Microsoft 365 por forma de compra, aplicaciones, dispositivos, almacenamiento, actualizaciones y uso sin conexión.",
    eyebrow: "Comparativa",
    intro: "Office 2024 y Microsoft 365 incluyen aplicaciones conocidas, pero siguen modelos de licencia y actualización diferentes.",
    answer: "Office 2024 para consumidores es una compra de pago único para un PC o Mac y no recibe nuevas versiones principales. Microsoft 365 es una suscripción con aplicaciones actualizadas, servicios en la nube y uso en varios dispositivos. Office LTSC 2024 es una tercera opción destinada a organizaciones con licencias por volumen.",
    steps: [
      { title: "Define cuántos dispositivos usarás", description: "Una compra de Office 2024 para consumidores se asigna a un equipo; Microsoft 365 permite usar las aplicaciones en varios dispositivos según el plan." },
      { title: "Decide si necesitas novedades", description: "Office 2024 recibe correcciones y seguridad, pero no las nuevas funciones continuas de Microsoft 365." },
      { title: "Valora la nube", description: "Microsoft 365 integra almacenamiento y colaboración; Office 2024 no incluye esos servicios como parte de la compra." },
      { title: "Comprueba las aplicaciones", description: "Las aplicaciones incluidas cambian según la edición. Outlook, Access, Project y Visio no forman parte de todos los paquetes." },
      { title: "Confirma el canal de licencia", description: "No confundas Office 2024 para consumidores con Office LTSC 2024 para licencias por volumen." },
    ],
    sections: [
      {
        title: "Cuándo elegir Office 2024",
        bullets: [
          "Prefieres un pago único y vas a utilizar un solo PC o Mac.",
          "No necesitas recibir funciones nuevas de forma continua.",
          "Trabajas principalmente con archivos locales y aplicaciones de escritorio.",
          "La edición que vas a comprar incluye exactamente las aplicaciones que necesitas.",
        ],
      },
      {
        title: "Cuándo elegir Microsoft 365",
        bullets: [
          "Quieres instalar las aplicaciones en varios dispositivos.",
          "Necesitas almacenamiento en OneDrive, colaboración y funciones conectadas.",
          "Prefieres recibir mejoras y características nuevas durante la suscripción.",
          "Tu plan incluye las funciones de Copilot o los servicios empresariales que necesitas.",
        ],
      },
      {
        title: "Dónde encaja Office LTSC 2024",
        paragraphs: [
          "Office LTSC 2024 está dirigido a organizaciones que necesitan una versión local estable y administrada mediante licencias por volumen. No es simplemente otro nombre comercial para cualquier descarga de Office 2024.",
        ],
      },
    ],
    questions: [
      { question: "¿Office 2024 es una suscripción?", answer: "La edición de consumo de Office 2024 se vende como compra de pago único. Microsoft 365 utiliza una suscripción mensual o anual." },
      { question: "¿Office 2024 incluye OneDrive?", answer: "No incluye almacenamiento adicional de OneDrive como parte de la compra. Puedes usar una cuenta de OneDrive por separado." },
      { question: "¿Office 2024 recibe actualizaciones?", answer: "Recibe actualizaciones de seguridad y calidad durante su ciclo de soporte, pero no las nuevas funciones continuas ni una actualización gratuita a la siguiente versión principal." },
      { question: "¿Office 2024 incluye Copilot?", answer: "Las funciones integradas de Copilot dependen de planes de Microsoft 365 compatibles. No deben asumirse como parte de una licencia clásica de Office 2024." },
    ],
    officialSource: {
      label: "Comparación oficial entre Microsoft 365 y Office 2024",
      url: "https://support.microsoft.com/es-es/office/lifecycle/lc-account/what-s-the-difference-between-microsoft-365-and-office-2024",
    },
    relatedSlugs: ["office-2024-professional-plus", "requisitos-office-2024", "como-instalar-office-2024", "fin-soporte-office-2021"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Office 2024",
    slug: "office-2024-professional-plus",
    title: "Office 2024 Professional Plus: qué incluye y qué significa Retail",
    shortTitle: "Qué incluye Office 2024 ProPlus",
    description: "Conoce qué significa Office 2024 Professional Plus, qué aplicaciones documenta Microsoft y cómo distinguir Retail de Office LTSC por volumen.",
    eyebrow: "Ediciones y licencia",
    intro: "Professional Plus describe una edición amplia de Office, mientras que Retail y Volume identifican canales de distribución y licencia diferentes.",
    answer: "Microsoft documenta que Office LTSC Professional Plus 2024 incluye Access, Excel, OneNote, Outlook, PowerPoint y Word. La descarga de OfiVault se llama ProPlus2024Retail.img: ese nombre identifica un paquete Retail y no debe presentarse como LTSC ni como una licencia incluida.",
    steps: [
      { title: "Lee el nombre del archivo", description: "ProPlus2024Retail.img identifica la edición ProPlus y el canal Retail del paquete publicado." },
      { title: "Comprueba tu licencia", description: "La licencia debe corresponder al producto y canal que vas a instalar; el archivo por sí solo no concede derechos de uso." },
      { title: "Distingue LTSC", description: "Office LTSC Professional Plus 2024 se distribuye mediante licencias por volumen y usa métodos de implementación y activación empresariales." },
      { title: "Separa Project y Visio", description: "Project 2024 y Visio 2024 son productos independientes, con sus propias descargas y licencias." },
    ],
    sections: [
      {
        title: "Aplicaciones documentadas para LTSC Professional Plus 2024",
        bullets: [
          "Microsoft Word, Excel y PowerPoint.",
          "Microsoft Outlook y OneNote.",
          "Microsoft Access, disponible solo en Windows.",
          "Skype Empresarial como instalación opcional en el canal LTSC.",
        ],
      },
      {
        title: "Qué no debes dar por incluido",
        bullets: [
          "Microsoft Teams no se instala automáticamente con Office LTSC 2024.",
          "Publisher no forma parte de Office LTSC 2024.",
          "Project y Visio son productos separados.",
          "La descarga no incluye clave, activador ni licencia.",
        ],
      },
      {
        title: "Retail no significa licencia gratuita",
        paragraphs: [
          "Retail describe el canal del paquete. No confirma que el equipo tenga una licencia válida ni que una clave de otro canal pueda activar el producto.",
          "Antes de instalar, comprueba con el vendedor, la cuenta Microsoft o el administrador de tu organización qué producto y canal cubre tu licencia.",
        ],
      },
    ],
    questions: [
      { question: "¿ProPlus2024Retail.img es Office LTSC 2024?", answer: "No debe tratarse como el mismo producto. El archivo indica Retail; Office LTSC Professional Plus 2024 pertenece al canal de licencias por volumen." },
      { question: "¿Office 2024 ProPlus incluye Project y Visio?", answer: "No. Project y Visio se descargan e instalan como productos independientes y requieren la licencia correspondiente." },
      { question: "¿Incluye Microsoft Teams?", answer: "Teams no está incluido como aplicación preinstalada en Office LTSC 2024 y se obtiene por separado. La disponibilidad depende de tu cuenta y organización." },
      { question: "¿El instalador incluye una clave?", answer: "No. El archivo contiene el software de instalación, pero no una clave ni derechos de uso." },
    ],
    officialSource: {
      label: "Información general oficial de Office LTSC 2024",
      url: "https://learn.microsoft.com/es-es/office/ltsc/2024/overview",
    },
    relatedSlugs: ["office-2024-vs-microsoft-365", "requisitos-office-2024", "como-instalar-office-2024"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Office 2024",
    slug: "como-instalar-office-2024",
    title: "Cómo instalar Office 2024 desde un archivo IMG",
    shortTitle: "Cómo instalar Office 2024",
    description: "Instala Office 2024 desde un archivo IMG en Windows: prepara el equipo, monta la imagen, elige 32 o 64 bits y completa la activación.",
    eyebrow: "Instalación 2024",
    intro: "El archivo IMG de Office 2024 funciona como una unidad virtual que contiene los instaladores de 32 y 64 bits para Windows.",
    answer: "Descarga el IMG del producto y el idioma correctos, móntalo desde el Explorador de archivos y ejecuta Setup64.exe o Setup32.exe dentro de la carpeta Office. La instalación no incluye licencia y normalmente requiere internet para activar y actualizar.",
    steps: [
      { title: "Comprueba los requisitos", description: "Confirma Windows, espacio disponible, arquitectura y licencia antes de descargar varios gigabytes." },
      { title: "Elige producto e idioma", description: "Selecciona Office 2024 ProPlus, Project o Visio y descarga el IMG en el idioma que vas a usar." },
      { title: "Limpia la instalación anterior", description: "Cierra todas las aplicaciones y elimina versiones o componentes incompatibles antes de cambiar de arquitectura o canal." },
      { title: "Monta el archivo IMG", description: "Haz doble clic en el archivo o usa Montar para abrirlo como una unidad virtual en Windows." },
      { title: "Ejecuta Setup", description: "Abre la carpeta Office y usa Setup64.exe para la mayoría de equipos actuales o Setup32.exe cuando sea necesario." },
      { title: "Activa y actualiza", description: "Abre una aplicación, utiliza una licencia válida y busca actualizaciones cuando termine la instalación." },
    ],
    sections: [
      {
        title: "Antes de ejecutar el instalador",
        bullets: [
          "Verifica que la descarga terminó y conserva la extensión .img.",
          "Comprueba que el producto coincide con tu licencia: Office, Project o Visio.",
          "No mezcles componentes de Office de 32 y 64 bits.",
          "Guarda tus documentos y cierra Word, Excel, Outlook y otras aplicaciones de Office.",
        ],
      },
      {
        title: "Si ya tienes otra versión de Office",
        paragraphs: [
          "Las instalaciones Click-to-Run pueden entrar en conflicto cuando pertenecen a arquitecturas o canales diferentes. Si el instalador detecta una incompatibilidad, desinstala la versión anterior, reinicia Windows y vuelve a ejecutar Setup.",
          "Project y Visio deben usar una arquitectura compatible con el resto de componentes de Office instalados en el equipo.",
        ],
      },
      {
        title: "La descarga y la activación son pasos distintos",
        paragraphs: [
          "OfiVault enlaza el archivo de instalación alojado en la red de distribución de Microsoft. Para usar Office necesitas una licencia válida que corresponda a la edición y al canal instalados.",
        ],
      },
    ],
    questions: [
      { question: "¿Cuál archivo debo ejecutar, Setup32 o Setup64?", answer: "Usa Setup64.exe en la mayoría de equipos modernos de 64 bits. Elige Setup32.exe si Windows es de 32 bits o dependes de complementos antiguos de esa arquitectura." },
      { question: "¿Puedo instalar Office 2024 sin internet?", answer: "Puedes ejecutar la instalación desde el IMG sin volver a descargar archivos, pero necesitas internet para obtener el IMG y normalmente para activar y actualizar Office." },
      { question: "¿Por qué Office 2024 no se instala?", answer: "Las causas habituales son una versión anterior incompatible, mezcla de arquitecturas, falta de espacio, descarga incompleta o una edición de Windows no compatible." },
      { question: "¿Puedo borrar el IMG después?", answer: "Sí, después de comprobar que Office está instalado, activado y actualizado. También puedes conservarlo para reinstalar la misma edición." },
    ],
    officialSource: {
      label: "Guía oficial para descargar e instalar Office 2024",
      url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/download-install-or-reinstall-microsoft-365-or-office-2024-on-a-pc-or-mac",
    },
    relatedSlugs: ["requisitos-office-2024", "office-2024-professional-plus", "como-instalar-archivo-img-office", "limpiar-office-antes-de-instalar", "solucionar-problemas-instalacion-office"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Soporte",
    slug: "fin-soporte-office-2021",
    title: "Fin del soporte de Office 2021: qué cambia y qué hacer",
    shortTitle: "Fin del soporte de Office 2021",
    description: "Office 2021 pierde el soporte de Microsoft el 13 de octubre de 2026. Qué deja de recibir, si seguirá funcionando y qué opciones tienes.",
    eyebrow: "Ciclo de vida",
    intro: "Microsoft retira Office 2021, Office LTSC 2021, Project 2021 y Visio 2021 el 13 de octubre de 2026. Si usas alguna de estas versiones, conviene decidir antes de esa fecha si la mantienes, la actualizas o te cambias a una suscripción.",
    answer: "Después del 13 de octubre de 2026, Office 2021 seguirá abriéndose y funcionando, pero Microsoft dejará de publicar actualizaciones de seguridad y correcciones para esa versión. Si trabajas con documentos o correos de terceros, lo prudente es pasar a Office 2024, que tiene soporte hasta el 9 de octubre de 2029, o a Microsoft 365.",
    steps: [
      { title: "Comprueba tu versión", description: "Abre Word o Excel, entra en Archivo y después en Cuenta. En Información del producto verás si tienes Office 2021, Office 2024 o Microsoft 365." },
      { title: "Identifica tu licencia", description: "Distingue si es una compra de pago único, una licencia por volumen de tu organización (LTSC) o una suscripción de Microsoft 365." },
      { title: "Decide el camino", description: "Puedes seguir con Office 2021 asumiendo el riesgo, pasar a Office 2024 con una licencia nueva o usar Microsoft 365." },
      { title: "Haz una copia de seguridad", description: "Guarda tus documentos, plantillas y, si usas Outlook, tus archivos de datos antes de desinstalar nada." },
      { title: "Desinstala antes de instalar", description: "Quita Office 2021 y reinicia Windows antes de instalar la versión nueva, para evitar conflictos entre versiones o arquitecturas." },
    ],
    sections: [
      {
        title: "Qué pasa el 13 de octubre de 2026",
        bullets: [
          "Office 2021 no se desinstala ni se bloquea: seguirás pudiendo abrir y editar tus archivos.",
          "Microsoft deja de publicar actualizaciones de seguridad para esa versión.",
          "Tampoco habrá correcciones de errores ni soporte técnico de Microsoft para Office 2021.",
          "El riesgo crece con el tiempo, sobre todo si abres archivos adjuntos o documentos que recibes de otras personas.",
        ],
      },
      {
        title: "Qué productos se ven afectados",
        paragraphs: [
          "Según el ciclo de vida publicado por Microsoft, la misma fecha aplica a Office 2021 para consumidores (Hogar y Estudiantes, Hogar y Empresa, Professional), a Office LTSC 2021 para organizaciones, a Project 2021 y a Visio 2021.",
          "No se ven afectados Office 2024 ni Office LTSC 2024, que tienen soporte hasta el 9 de octubre de 2029, ni Microsoft 365, que sigue recibiendo actualizaciones mientras la suscripción esté activa.",
        ],
        callout: {
          tone: "info",
          title: "Office 2016 y 2019 ya no tienen soporte",
          text: "Si todavía usas Office 2016 u Office 2019, su soporte terminó el 14 de octubre de 2025. Las opciones de esta guía también aplican a esas versiones.",
        },
      },
      {
        title: "Tus opciones",
        paragraphs: [
          "Seguir con Office 2021: es posible, pero solo lo recomendamos en equipos con poco riesgo, por ejemplo sin correo ni archivos de terceros. No tendrás parches para vulnerabilidades nuevas.",
          "Pasar a Office 2024: es la opción más parecida a lo que ya tienes. Se paga una vez, funciona sin suscripción y tiene soporte hasta el 9 de octubre de 2029. Necesitas una licencia nueva de Office 2024; la de Office 2021 no sirve.",
          "Cambiarte a Microsoft 365: se paga por suscripción, recibe funciones nuevas de forma continua y, según el plan, incluye servicios como OneDrive. Tiene sentido si ya pagas un plan de Microsoft 365 o necesitas trabajar en varios dispositivos.",
        ],
      },
      {
        title: "Cómo pasar de Office 2021 a Office 2024",
        bullets: [
          "Consigue una licencia válida de Office 2024 por un canal oficial.",
          "Haz una copia de seguridad de tus documentos y de los datos de Outlook.",
          "Desinstala Office 2021 desde Configuración > Aplicaciones y reinicia Windows.",
          "Descarga el IMG de Office 2024 en tu idioma, móntalo y ejecuta el instalador de la misma arquitectura que usabas.",
          "Abre cualquier aplicación e inicia sesión o introduce la clave para activar Office 2024.",
        ],
      },
    ],
    questions: [
      { question: "¿Office 2021 dejará de funcionar el 13 de octubre de 2026?", answer: "No. Las aplicaciones seguirán abriéndose y funcionando. Lo que termina es el soporte: no habrá más actualizaciones de seguridad ni correcciones." },
      { question: "¿Office LTSC 2021 tiene la misma fecha?", answer: "Sí. Microsoft indica el 13 de octubre de 2026 como fin del soporte de Office LTSC 2021, igual que Office 2021, Project 2021 y Visio 2021." },
      { question: "¿Mi licencia de Office 2021 sirve para instalar Office 2024?", answer: "No. Son versiones con licencias distintas. Para usar Office 2024 necesitas una licencia de Office 2024 o una suscripción de Microsoft 365." },
      { question: "¿Hasta cuándo tiene soporte Office 2024?", answer: "Hasta el 9 de octubre de 2029, según el ciclo de vida de Microsoft. Lo mismo aplica a Office LTSC 2024." },
      { question: "¿Puedo tener Office 2021 y Office 2024 instalados a la vez?", answer: "No lo recomendamos. Las instalaciones de distintas versiones suelen generar conflictos. Desinstala Office 2021 antes de instalar Office 2024." },
    ],
    officialSource: {
      label: "Ciclo de vida de Office 2021 en Microsoft Learn",
      url: "https://learn.microsoft.com/es-es/lifecycle/products/office-2021",
    },
    officialSources: [
      { label: "Ciclo de vida de Office LTSC 2021", url: "https://learn.microsoft.com/es-es/lifecycle/products/office-ltsc-2021" },
      { label: "Ciclo de vida de Project 2021", url: "https://learn.microsoft.com/es-es/lifecycle/products/project-2021" },
      { label: "Ciclo de vida de Visio 2021", url: "https://learn.microsoft.com/es-es/lifecycle/products/visio-2021" },
      { label: "Ciclo de vida de Office 2024", url: "https://learn.microsoft.com/es-es/lifecycle/products/office-2024" },
    ],
    relatedSlugs: ["office-2024-vs-microsoft-365", "como-instalar-office-2024", "limpiar-office-antes-de-instalar", "requisitos-office-2024"],
    updatedAt: "2026-09-26",
  },
  {
    category: "Instalación",
    slug: "instalador-offline-office",
    title: "Instalar Office sin conexión: qué funciona y qué no",
    shortTitle: "Qué significa instalar Office sin conexión",
    description: "Aclara qué puedes hacer con un instalador offline de Office y qué partes todavía necesitan conexión, como la activación y las actualizaciones.",
    eyebrow: "Instalación offline",
    intro: "Un instalador offline evita descargar de nuevo los archivos durante la instalación, pero no convierte Office 2024 en un producto completamente desconectado.",
    answer: "Necesitas internet para descargar el IMG y, en Office 2024, para activar, reactivar periódicamente y actualizar las aplicaciones. La instalación de los archivos puede ejecutarse desde la imagen local.",
    steps: [
      { title: "Descarga el IMG", description: "Guarda la imagen completa en una unidad con espacio suficiente y conserva su extensión .img." },
      { title: "Instala desde la imagen local", description: "Monta el IMG y ejecuta el instalador adecuado sin depender de una descarga adicional durante ese paso." },
      { title: "Conecta para activar", description: "Office 2024 necesita internet para comprobar derechos, activar y mantener el producto en estado válido." },
      { title: "Busca actualizaciones", description: "Después de instalar y activar, comprueba que Office puede recibir actualizaciones de seguridad y calidad." },
    ],
    sections: [
      {
        title: "Qué resuelve un instalador offline",
        bullets: [
          "La conexión es lenta, inestable o tiene límites de datos.",
          "Necesitas reinstalar la misma edición sin volver a descargarla.",
          "Preparas una instalación local para un equipo que ya tiene una licencia correspondiente.",
        ],
      },
      {
        title: "Qué sigue necesitando internet",
        bullets: [
          "Descargar el archivo IMG.",
          "Comprobar los derechos de Office 2024 y asociar la compra a la cuenta o dispositivo cuando corresponda.",
          "Activar y reactivar periódicamente Office 2024.",
          "Obtener actualizaciones de seguridad y calidad.",
        ],
      },
      {
        title: "Preparación recomendada",
        paragraphs: [
          "Antes de montar la imagen, confirma el producto, el idioma, la arquitectura y la licencia. Si ya existe otra instalación de Office, Project o Visio, revisa la guía de limpieza para evitar conflictos.",
          "OfiVault organiza enlaces de descarga; no distribuye claves, activadores ni mecanismos para omitir la licencia.",
        ],
      },
    ],
    questions: [
      { question: "¿Puedo instalar Office completamente sin internet?", answer: "Puedes ejecutar los archivos de instalación desde el IMG sin conexión, pero Office 2024 necesita internet para activar, reactivar periódicamente y actualizarse." },
      { question: "¿El instalador incluye una licencia?", answer: "No. La descarga contiene archivos de instalación. Necesitas una licencia válida asociada al producto que vas a usar." },
      { question: "¿Puedo guardar el archivo para otra instalación?", answer: "Sí. Puedes conservar la imagen en una unidad externa, siempre que cada equipo o usuario tenga la licencia que corresponda y el producto siga siendo compatible." },
    ],
    officialSource: {
      label: "Guía oficial de Microsoft sobre el instalador sin conexión",
       url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/use-the-office-offline-installer",
    },
    relatedSlugs: ["como-instalar-archivo-img-office", "office-32-o-64-bits"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Instalación",
    slug: "office-32-o-64-bits",
    title: "Office de 32 o 64 bits: cuál elegir",
    shortTitle: "Elegir Office de 32 o 64 bits",
    description: "Descubre si necesitas Office de 32 o 64 bits, qué versión conviene para tu equipo y cómo evitar errores por arquitecturas incompatibles.",
    eyebrow: "Compatibilidad",
    intro: "Para la mayoría de los equipos actuales con Windows de 64 bits, Office de 64 bits es la opción recomendada.",
    answer: "Elige 32 bits si tu Windows es de 32 bits o si dependes de complementos, controles o aplicaciones antiguas de 32 bits. No puedes mezclar componentes de Office de ambas arquitecturas.",
    steps: [
      { title: "Comprueba Windows", description: "Abre Configuración, Sistema y Acerca de para consultar el tipo de sistema y procesador." },
      { title: "Revisa tus complementos", description: "Confirma si utilizas complementos COM, controles, macros o aplicaciones MAPI antiguas de 32 bits." },
      { title: "Elige 64 bits cuando sea posible", description: "Es la mejor opción para archivos grandes, conjuntos de datos extensos y equipos modernos con Windows x64." },
      { title: "Mantén una sola arquitectura", description: "Si ya tienes componentes de Office, instala la misma arquitectura o desinstálalos antes de cambiar." },
    ],
    sections: [
      {
        title: "Cuándo elegir 64 bits",
        bullets: [
          "Trabajas con libros de Excel, bases de datos o presentaciones de gran tamaño.",
          "Usas Project con archivos grandes o numerosos subproyectos.",
          "Tu equipo ejecuta Windows x64 y no depende de complementos antiguos de 32 bits.",
        ],
      },
      {
        title: "Cuándo elegir 32 bits",
        bullets: [
          "El sistema operativo es Windows de 32 bits.",
          "Necesitas complementos COM, controles o bibliotecas heredadas de 32 bits.",
          "Tu organización utiliza integraciones que todavía no tienen una versión de 64 bits.",
        ],
      },
      {
        title: "Cómo evitar el error de arquitectura",
        paragraphs: [
          "Windows no permite instalar Office de 64 bits mientras conserva componentes de Office de 32 bits, ni al contrario. Desinstala primero la arquitectura anterior y reinicia el equipo antes de ejecutar el nuevo instalador.",
        ],
      },
    ],
    questions: [
      { question: "¿Qué es mejor, Office de 32 o 64 bits?", answer: "Office de 64 bits suele ser mejor en equipos actuales. Office de 32 bits sigue siendo necesario cuando Windows o algún complemento solo admite esa arquitectura." },
      { question: "¿Cómo puedo saber si mi Office es de 32 o 64 bits?", answer: "Abre una aplicación de Office, entra en Archivo, Cuenta y Acerca de. La ventana muestra la versión y la arquitectura instalada." },
      { question: "¿Puedo tener Office de 32 y 64 bits al mismo tiempo?", answer: "No. Los componentes de Office instalados en el mismo equipo deben utilizar una sola arquitectura." },
      { question: "¿La arquitectura cambia el idioma o la licencia?", answer: "No. El idioma y la licencia son decisiones separadas de la arquitectura del instalador." },
    ],
    officialSource: {
      label: "Guía oficial de Microsoft para elegir 32 o 64 bits",
       url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/choose-between-the-64-bit-or-32-bit-version-of-office",
    },
    relatedSlugs: ["instalador-offline-office", "como-instalar-archivo-img-office"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Instalación",
    slug: "como-instalar-archivo-img-office",
    title: "Cómo abrir e instalar un archivo IMG de Office en Windows",
    shortTitle: "Instalar un archivo IMG de Office",
    description: "Aprende a montar una imagen IMG de Office en Windows, abrir la unidad virtual y ejecutar el instalador correcto de 32 o 64 bits.",
    eyebrow: "Archivo de imagen",
    intro: "Un archivo IMG es una imagen de disco que Windows puede montar como una unidad virtual sin instalar programas adicionales.",
    answer: "Haz doble clic en el archivo IMG, abre la nueva unidad virtual y ejecuta el instalador correspondiente. En las imágenes confirmadas con ambas arquitecturas, los archivos están dentro de la carpeta Office.",
    steps: [
      { title: "Localiza la descarga", description: "Abre la carpeta Descargas y verifica que el archivo conserve la extensión .img." },
      { title: "Monta el archivo", description: "Haz doble clic o selecciona Montar desde el menú contextual de Windows." },
      { title: "Abre la unidad virtual", description: "En el Explorador de archivos aparecerá una nueva unidad con los archivos de instalación." },
      { title: "Entra en la carpeta Office", description: "En las imágenes que incluyen ambas arquitecturas encontrarás Setup32.exe y Setup64.exe." },
      { title: "Ejecuta la opción adecuada", description: "Utiliza 64 bits para la mayoría de los equipos actuales o 32 bits cuando tu sistema o complementos lo requieran." },
      { title: "Desmonta la imagen", description: "Cuando termine la instalación, haz clic derecho en la unidad virtual y selecciona Expulsar." },
    ],
    sections: [
      {
        title: "Si Windows no abre el archivo IMG",
        bullets: [
          "Confirma que la descarga terminó y que el archivo no tiene una extensión adicional.",
          "Haz clic derecho, elige Abrir con y selecciona Explorador de Windows.",
          "Comprueba que tienes espacio disponible y permisos para montar unidades virtuales.",
        ],
      },
      {
        title: "Antes de ejecutar Setup",
        paragraphs: [
          "Cierra Word, Excel, Outlook y cualquier aplicación de Office. Si vas a cambiar entre 32 y 64 bits, desinstala primero los componentes de la arquitectura anterior.",
          "Office 2013 se mantiene fuera de las afirmaciones sobre instaladores dobles hasta que su imagen se verifique de forma independiente.",
        ],
      },
    ],
    questions: [
      { question: "¿Necesito grabar el archivo IMG en un disco?", answer: "No. Windows puede montarlo directamente como una unidad virtual. También puedes conservar una copia en una unidad externa." },
      { question: "¿Qué diferencia hay entre abrir y montar un IMG?", answer: "Montar crea una unidad virtual que presenta el contenido como si fuera un disco insertado. Es la forma adecuada de ejecutar el instalador." },
      { question: "¿Puedo borrar el archivo después de instalar?", answer: "Sí, cuando Office esté instalado y activado. Consérvalo si planeas reinstalar la misma edición más adelante." },
    ],
    officialSource: {
      label: "Instrucciones oficiales de Microsoft para imágenes IMG",
       url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/use-the-office-offline-installer",
    },
    relatedSlugs: ["instalador-offline-office", "office-32-o-64-bits"],
    updatedAt: "2026-07-29",
  },
  {
    category: "Instalación",
    slug: "limpiar-office-antes-de-instalar",
    title: "Cómo limpiar Office antes de instalar otra versión",
    shortTitle: "Limpiar Office antes de instalar",
    description: "Desinstala versiones anteriores de Office, Project y Visio y elimina una clave de volumen concreta cuando una instalación nueva encuentra conflictos.",
    eyebrow: "Preparación y licencias",
    intro: "La forma segura de preparar una instalación nueva es identificar primero el tipo de Office, desinstalar los productos incompatibles y reservar la limpieza de licencias para los casos en los que realmente exista un problema de activación.",
    answer: "Empieza por desinstalar Office, Project y Visio desde Windows y reinicia el equipo. Solo si confirmas una instalación por volumen o una clave antigua que interfiere, consulta su estado con ospp.vbs y elimina la clave concreta usando sus últimos cinco caracteres.",
    steps: [
      { title: "Guarda tus documentos y cierra Office", description: "Cierra Word, Excel, Outlook, Project, Visio y cualquier proceso de instalación antes de modificar el equipo." },
      { title: "Identifica la instalación", description: "En una aplicación, abre Archivo, Cuenta y Acerca de para revisar versión, arquitectura y canal. En equipos administrados, consulta al área de TI." },
      { title: "Desinstala los productos incompatibles", description: "Quita Office, Project y Visio anteriores desde Aplicaciones instaladas o Panel de control. Si son MSI, la herramienta RemoveMSI puede formar parte de una implementación administrada." },
      { title: "Reinicia Windows", description: "El reinicio permite completar la eliminación de servicios y componentes que podrían bloquear la instalación siguiente." },
      { title: "Limpia una clave de volumen solo si hace falta", description: "Usa ospp.vbs para comprobar el estado y elimina únicamente la clave asociada al producto que presenta el conflicto." },
      { title: "Instala el producto compatible", description: "Comprueba que producto, canal, idioma y arquitectura coinciden con la licencia que vas a utilizar." },
    ],
    sections: [
      {
        title: "Primero desinstala; no borres el registro por defecto",
        paragraphs: [
          "Desinstalar las aplicaciones elimina el software, pero no necesariamente todos los tokens, credenciales o claves de activación. Eso no significa que debas borrar carpetas o claves del registro como primer paso.",
          "Para la mayoría de los usuarios, la ruta correcta es desinstalar, reiniciar, instalar la nueva edición y activar con la cuenta o licencia correspondiente. La limpieza avanzada se reserva para errores persistentes o equipos administrados.",
        ],
        callout: {
          tone: "warning",
          title: "No uses slmgr /upk como solución para Office",
          text: "slmgr.vbs gestiona principalmente la licencia de Windows. Un uso genérico de /upk puede eliminar claves de Windows y dejar el sistema sin activar.",
        },
      },
      {
        title: "Si la instalación es Volume, KMS o legacy",
        paragraphs: [
          "Microsoft proporciona ospp.vbs para administrar productos de Office con licencia por volumen, incluidos Project y Visio. Ejecuta el símbolo del sistema como administrador y usa la ruta que corresponda a la arquitectura instalada.",
        ],
        codeBlocks: [
          {
            label: "Office de 64 bits en Windows de 64 bits",
            code: 'cd "C:\\Program Files\\Microsoft Office\\root\\Office16"\ncscript ospp.vbs /dstatus',
            note: "En algunas instalaciones antiguas la carpeta puede no incluir root.",
          },
          {
            label: "Office de 32 bits en Windows de 64 bits",
            code: 'cd "C:\\Program Files (x86)\\Microsoft Office\\root\\Office16"\ncscript ospp.vbs /dstatus',
            note: "Anota los últimos cinco caracteres de la clave del producto que vas a retirar.",
          },
          {
            label: "Eliminar una clave concreta",
            code: "cscript ospp.vbs /unpkey:XXXXX",
            note: "Sustituye XXXXX por los últimos cinco caracteres mostrados por /dstatus. Repite el proceso solo para las claves que realmente correspondan al producto antiguo.",
          },
        ],
      },
      {
        title: "Si tienes Microsoft 365",
        paragraphs: [
          "ospp.vbs no es la herramienta adecuada para las aplicaciones de suscripción de Microsoft 365. Usa el solucionador de activación de Microsoft o las herramientas oficiales de limpieza de licencias cuando el problema persista.",
          "La limpieza puede afectar cuentas almacenadas, credenciales y tokens de Office. Ten preparada la cuenta correcta antes de ejecutarla y no borres identidades de un equipo administrado sin consultar al administrador.",
        ],
        callout: {
          tone: "info",
          title: "Limpieza avanzada",
          text: "OLicenseCleanup y la limpieza de WAM son procedimientos para problemas de activación o migraciones, no pasos obligatorios antes de cada instalación.",
        },
      },
      {
        title: "MSI y Click-to-Run no se eliminan igual",
        bullets: [
          "RemoveMSI elimina versiones antiguas instaladas con Windows Installer, como Office 2007, 2010, 2013 y 2016, además de Project y Visio MSI.",
          "RemoveMSI no elimina instalaciones Click-to-Run. Esas deben quitarse desde Windows, Panel de control o mediante el elemento Remove del Office Deployment Tool.",
          "No fuerces el cierre de aplicaciones si hay documentos sin guardar; Microsoft advierte que FORCEAPPSHUTDOWN puede provocar pérdida de datos.",
        ],
      },
      {
        title: "Comprueba que el equipo está listo",
        bullets: [
          "Office, Project y Visio antiguos ya no aparecen entre las aplicaciones instaladas, salvo los productos que decidiste conservar.",
          "Windows se reinició después de la desinstalación.",
          "La nueva edición coincide con la licencia: Retail, Microsoft 365 o Volume.",
          "Todos los productos utilizan una arquitectura compatible de 32 o 64 bits.",
          "Tienes la cuenta, clave o asistencia del administrador necesaria para activar el producto legítimamente.",
        ],
      },
    ],
    questions: [
      { question: "¿Tengo que borrar la licencia anterior antes de instalar Office 2024?", answer: "No siempre. Normalmente basta con desinstalar la aplicación incompatible, reiniciar e instalar el producto que corresponde a tu licencia. La limpieza de claves o tokens se reserva para errores de activación o migraciones." },
      { question: "¿Puedo usar ospp.vbs con Microsoft 365?", answer: "No como regla general. Microsoft indica que ospp.vbs no funciona con las aplicaciones de suscripción de Microsoft 365; utiliza sus herramientas de activación y limpieza específicas." },
      { question: "¿Debo eliminar todas las claves que aparezcan en /dstatus?", answer: "No. Elimina únicamente la clave del producto que estás retirando y conserva las claves de productos que sigues utilizando." },
      { question: "¿La limpieza elimina mi licencia de la cuenta Microsoft?", answer: "No. Quitar una instalación, clave local o token del equipo no cancela una compra ni elimina una licencia asociada a tu cuenta." },
    ],
    officialSource: {
      label: "Herramientas oficiales para administrar la activación por volumen de Office",
       url: "https://learn.microsoft.com/es-es/office/volume-license-activation/tools-to-manage-volume-activation-of-office",
    },
    officialSources: [
       { label: "Desinstalar Microsoft 365 u Office de un PC", url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/uninstall-microsoft-365-or-office-from-a-pc" },
       { label: "Restablecer el estado de activación de Microsoft 365", url: "https://learn.microsoft.com/es-es/previous-versions/troubleshoot/microsoft-365/microsoft-365-apps/activation/reset-office-365-proplus-activation-state" },
       { label: "Eliminar versiones MSI anteriores con Office Deployment Tool", url: "https://learn.microsoft.com/es-es/microsoft-365-apps/deploy/upgrade-from-msi-version" },
    ],
    relatedSlugs: ["como-instalar-office-2024", "office-32-o-64-bits", "solucionar-problemas-instalacion-office"],
    updatedAt: "2026-07-30",
  },
  {
    category: "Instalación",
    slug: "solucionar-problemas-instalacion-office",
    title: "Office no se instala: conflictos y soluciones",
    shortTitle: "Resolver errores de instalación de Office",
    description: "Soluciona los problemas más habituales al instalar Office, Project o Visio: arquitectura, canal, instalaciones anteriores, IMG incompleto y activación.",
    eyebrow: "Solución de problemas",
    intro: "Los errores de instalación suelen aparecer cuando quedan componentes antiguos, se mezclan arquitecturas o el instalador no corresponde al producto y canal de la licencia.",
    answer: "Antes de volver a descargar o ejecutar activadores, identifica el error, desinstala los componentes incompatibles, reinicia Windows y confirma que el nuevo instalador coincide con la arquitectura y el canal que necesitas.",
    steps: [
      { title: "Anota el mensaje exacto", description: "Guarda el código o texto del error y comprueba si el problema aparece durante la descarga, la instalación o la activación." },
      { title: "Cierra Office y reinicia", description: "Cierra todas las aplicaciones de Office, Project y Visio y reinicia Windows antes de repetir la instalación." },
      { title: "Comprueba arquitectura y canal", description: "No mezcles 32 y 64 bits ni Retail, Microsoft 365 y Volume sin una instalación compatible." },
      { title: "Revisa instalaciones anteriores", description: "Desinstala versiones antiguas o productos independientes que puedan bloquear la nueva instalación." },
      { title: "Valida el IMG", description: "Confirma que la descarga terminó, conserva la extensión .img y vuelve a descargarla si el archivo está incompleto." },
      { title: "Activa con la vía correcta", description: "Usa la cuenta, clave o administración de licencias que corresponda al producto instalado; la instalación no incluye derechos de uso." },
    ],
    sections: [
      {
        title: "El error indica que ya hay otra versión instalada",
        paragraphs: [
          "Desinstala la suite anterior y también las instalaciones independientes de Project o Visio. Office 2024 usa Click-to-Run y no siempre puede convivir con componentes anteriores de otra arquitectura o tecnología.",
          "Reinicia Windows después de desinstalar y vuelve a ejecutar el instalador solo cuando las aplicaciones anteriores ya no bloqueen el equipo.",
        ],
      },
      {
        title: "El error menciona 32 y 64 bits",
        paragraphs: [
          "Todos los componentes de Office instalados en el equipo deben utilizar una arquitectura compatible. Si necesitas cambiar, desinstala la arquitectura anterior, reinicia y vuelve a instalar una sola arquitectura.",
        ],
      },
      {
        title: "La instalación termina, pero aparece Producto sin licencia",
        bullets: [
          "Comprueba que la cuenta Microsoft o profesional utilizada corresponde al producto adquirido o asignado.",
          "Confirma que Retail, Microsoft 365 o Volume coincide con el canal de tu licencia.",
          "Si el equipo pertenecía a una organización, consulta al administrador antes de retirar credenciales o licencias.",
          "No confundas instalar los archivos con activar el producto: son pasos distintos.",
        ],
        callout: {
          tone: "warning",
          title: "No uses activadores para diagnosticar",
          text: "Los activadores y KMS no autorizados pueden cambiar la configuración de licencia, instalar software no confiable y dificultar la solución del problema original.",
        },
      },
      {
        title: "El archivo IMG no monta o no ejecuta Setup",
        bullets: [
          "Comprueba que el archivo conserva exactamente la extensión .img y que la descarga no se interrumpió.",
          "Verifica que la unidad tenga espacio suficiente para la imagen y la instalación.",
          "Monta el archivo desde el Explorador de archivos de Windows y abre la unidad virtual nueva.",
          "Si el archivo sigue sin abrirse, descarga de nuevo desde el enlace oficial del producto.",
        ],
      },
      {
        title: "Cuándo dejar de probar soluciones locales",
        paragraphs: [
          "Contacta con Microsoft o con el administrador de la organización si el equipo está unido a Microsoft Entra, utiliza activación compartida, tiene políticas de empresa o sigue mostrando errores después de una desinstalación limpia.",
          "En esos escenarios, borrar manualmente el registro o las credenciales puede eliminar el inicio de sesión único y la administración del dispositivo.",
        ],
      },
    ],
    questions: [
      { question: "¿Por qué Office 2024 no se instala si el IMG se descargó bien?", answer: "Las causas más comunes son una arquitectura incompatible, restos de Office, Project o Visio, un canal de licencia distinto, falta de espacio o una versión de Windows no compatible." },
      { question: "¿Puedo tener Office 2021 y Office 2024 juntos?", answer: "Depende de la tecnología, edición, canal y arquitectura. Para evitar conflictos, la opción segura es desinstalar la instalación anterior antes de instalar la nueva." },
      { question: "¿Qué hago si la instalación funciona pero no se activa?", answer: "Comprueba la cuenta o licencia, el canal del producto y la conexión. Si el equipo pertenece a una organización, consulta al administrador en lugar de borrar credenciales por tu cuenta." },
      { question: "¿Tengo que reinstalar Windows?", answer: "No como primer paso. Antes prueba una desinstalación completa de Office, Project y Visio, reinicia y confirma la arquitectura y el canal correctos." },
    ],
    officialSource: {
      label: "Descargar, instalar o reinstalar Microsoft 365 u Office 2024",
      url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/download-install-or-reinstall-microsoft-365-or-office-2024-on-a-pc-or-mac",
    },
    officialSources: [
       { label: "Elegir entre Office de 32 o 64 bits", url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/choose-between-the-64-bit-or-32-bit-version-of-office" },
       { label: "Desinstalar Microsoft 365 u Office de un PC", url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/uninstall-microsoft-365-or-office-from-a-pc" },
      { label: "Solucionar problemas de instalación de Office", url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/troubleshoot-installing-office" },
    ],
    relatedSlugs: ["limpiar-office-antes-de-instalar", "office-32-o-64-bits", "como-instalar-office-2024"],
    updatedAt: "2026-07-30",
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
