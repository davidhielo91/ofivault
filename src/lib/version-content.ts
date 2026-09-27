// Editorial content for the category pages of versions other than Office 2024
// (which uses src/lib/office-2024.ts). Support dates come from Microsoft's
// lifecycle pages linked in `source`.

export type VersionFaq = {
  question: string;
  answer: string;
  guideSlug?: string;
  guideLabel?: string;
};

export type VersionContent = {
  summary: string[];
  facts: Array<{ label: string; value: string }>;
  guideSlugs: string[];
  faqs: VersionFaq[];
  source: { label: string; url: string };
};

const installGuideSlugs = [
  "instalador-offline-office",
  "office-32-o-64-bits",
  "como-instalar-archivo-img-office",
  "limpiar-office-antes-de-instalar",
];

const activationFaq: VersionFaq = {
  question: "¿El instalador activa Office?",
  answer: "No. El archivo IMG solo contiene los instaladores. La activación depende de la licencia y del canal donde la obtuviste: una cuenta de Microsoft, una clave de producto o una licencia de tu organización.",
};

const macFaq: VersionFaq = {
  question: "¿Estos archivos IMG sirven para Mac?",
  answer: "No. Los archivos IMG del catálogo contienen instaladores para Windows. Office para Mac utiliza paquetes y licencias propios.",
};

export const versionContent: Record<string, VersionContent> = {
  "office-2013": {
    summary: [
      "Office 2013 llegó en enero de 2013. Microsoft terminó su soporte extendido el 11 de abril de 2023, así que ya no recibe actualizaciones de seguridad ni correcciones.",
      "Hoy tiene sentido sobre todo para equipos antiguos, documentos o macros que dependen de esta versión, o para reinstalar una licencia de Office 2013 que ya tienes. Para uso diario en un equipo con conexión a internet conviene una versión con soporte.",
      "En esta página encontrarás Office Home & Business, Office Professional, Project Pro y Visio Pro. Elige la edición que corresponde a tu licencia y después el idioma.",
    ],
    facts: [
      { label: "Plataforma", value: "Windows" },
      { label: "Formato", value: "Archivo IMG" },
      { label: "Lanzamiento", value: "Enero de 2013" },
      { label: "Soporte", value: "Finalizó en abril de 2023" },
    ],
    guideSlugs: installGuideSlugs,
    faqs: [
      {
        question: "¿Office 2013 sigue recibiendo actualizaciones?",
        answer: "No. El soporte extendido de Office 2013 terminó el 11 de abril de 2023. Seguirá funcionando, pero sin parches de seguridad ni correcciones, algo a tener en cuenta si abres documentos o correos de terceros.",
      },
      {
        question: "¿Qué diferencia hay entre Home & Business y Professional?",
        answer: "Office Home & Business 2013 incluye Word, Excel, PowerPoint, OneNote y Outlook. Office Professional 2013 añade Publisher y Access. Project y Visio son productos independientes con su propia licencia.",
      },
      {
        question: "¿Office 2013 funciona en Windows 10 u 11?",
        answer: "Puede instalarse en sistemas actuales, pero como Office 2013 ya no tiene soporte, Microsoft no corrige los problemas que aparezcan en ninguna versión de Windows. Si tu equipo usa Windows 11, una versión más reciente de Office dará menos problemas.",
      },
      {
        question: "¿Office 2013 es de 32 o 64 bits?",
        answer: "Office 2013 se publicó en ambas arquitecturas. Todavía no hemos verificado de forma independiente qué contiene cada imagen de 2013, así que revisa los archivos al montar el IMG antes de ejecutar el instalador.",
        guideSlug: "office-32-o-64-bits",
        guideLabel: "Elegir entre 32 y 64 bits",
      },
      {
        question: "¿Puedo instalar Office 2013 si ya tengo otra versión de Office?",
        answer: "Puede generar conflictos, sobre todo si las arquitecturas no coinciden. Si el instalador se detiene, desinstala la versión anterior, reinicia Windows y vuelve a intentarlo.",
        guideSlug: "limpiar-office-antes-de-instalar",
        guideLabel: "Limpiar Office antes de instalar",
      },
      activationFaq,
      macFaq,
    ],
    source: {
      label: "Ciclo de vida de Office 2013 en Microsoft Learn",
      url: "https://learn.microsoft.com/es-es/lifecycle/products/microsoft-office-2013",
    },
  },
  "office-2016": {
    summary: [
      "Office 2016 se publicó en septiembre de 2015 como versión perpetua, es decir, de pago único. Su soporte extendido terminó el 14 de octubre de 2025, por lo que ya no recibe actualizaciones de seguridad.",
      "Sigue siendo útil para reinstalar una licencia de Office 2016 que ya tienes o para equipos que necesitan mantener la misma versión. Cada imagen IMG del catálogo incluye Setup32.exe y Setup64.exe, así que puedes elegir la arquitectura al instalar.",
      "En esta página están Office Home & Business, Office ProPlus, Project Pro y Visio Pro. Elige la edición de tu licencia y después el idioma.",
    ],
    facts: [
      { label: "Plataforma", value: "Windows" },
      { label: "Formato", value: "Archivo IMG" },
      { label: "Arquitecturas", value: "32 y 64 bits" },
      { label: "Soporte", value: "Finalizó en octubre de 2025" },
    ],
    guideSlugs: installGuideSlugs,
    faqs: [
      {
        question: "¿Office 2016 sigue teniendo soporte?",
        answer: "No. Microsoft terminó el soporte extendido de Office 2016 el 14 de octubre de 2025. Las aplicaciones siguen funcionando, pero ya no reciben parches de seguridad ni correcciones.",
      },
      {
        question: "¿Qué diferencia hay entre Home & Business y ProPlus?",
        answer: "Office Home & Business 2016 incluye Word, Excel, PowerPoint, OneNote y Outlook. Office Professional Plus 2016 añade Access y Publisher, entre otras aplicaciones. Instala la edición que coincide con tu licencia.",
      },
      {
        question: "¿Qué Windows necesito para Office 2016?",
        answer: "Office 2016 se lanzó para Windows 7 SP1 y versiones posteriores, incluido Windows 10. Como Windows 10 y Office 2016 ya no tienen soporte, lo más estable en un equipo nuevo es usar una versión reciente de ambos.",
      },
      {
        question: "¿Debo instalar Office 2016 de 32 o 64 bits?",
        answer: "En la mayoría de los equipos actuales conviene 64 bits. Usa 32 bits si Windows es de 32 bits o si dependes de complementos antiguos. El IMG incluye ambos instaladores.",
        guideSlug: "office-32-o-64-bits",
        guideLabel: "Elegir la arquitectura correcta",
      },
      {
        question: "¿Puedo tener Office 2016 junto a Microsoft 365 u otra versión?",
        answer: "No se recomienda: las instalaciones Hacer clic y ejecutar de distintas versiones suelen chocar entre sí, y no se pueden mezclar 32 y 64 bits. Desinstala la versión anterior antes de instalar Office 2016.",
        guideSlug: "limpiar-office-antes-de-instalar",
        guideLabel: "Limpiar Office antes de instalar",
      },
      activationFaq,
      macFaq,
    ],
    source: {
      label: "Ciclo de vida de Office 2016 en Microsoft Learn",
      url: "https://learn.microsoft.com/es-es/lifecycle/products/microsoft-office-2016",
    },
  },
  "office-2019": {
    summary: [
      "Office 2019 se publicó en septiembre de 2018 como la versión perpetua posterior a Office 2016. Se distribuye solo con la tecnología Hacer clic y ejecutar y se diseñó para Windows 10. Su soporte extendido terminó el 14 de octubre de 2025.",
      "Es una opción razonable si ya tienes una licencia de Office 2019 y necesitas reinstalarla. Cada imagen IMG incluye Setup32.exe y Setup64.exe para que elijas la arquitectura al instalar.",
      "Además de Office Home & Business y Office ProPlus, en esta versión encontrarás Access 2019 por separado, Project Pro y Visio Pro.",
    ],
    facts: [
      { label: "Plataforma", value: "Windows 10 o posterior" },
      { label: "Formato", value: "Archivo IMG" },
      { label: "Arquitecturas", value: "32 y 64 bits" },
      { label: "Soporte", value: "Finalizó en octubre de 2025" },
    ],
    guideSlugs: installGuideSlugs,
    faqs: [
      {
        question: "¿Office 2019 sigue teniendo soporte?",
        answer: "No. El soporte extendido de Office 2019 terminó el 14 de octubre de 2025, el mismo día que el de Office 2016. Las aplicaciones funcionan, pero ya no reciben actualizaciones de seguridad.",
      },
      {
        question: "¿Office 2019 funciona en Windows 7 u 8.1?",
        answer: "No. Office 2019 se diseñó para Windows 10 y no admite Windows 7 ni Windows 8.1. Si tu equipo usa uno de esos sistemas, la versión más reciente que puedes instalar es Office 2016.",
      },
      {
        question: "¿Qué diferencia hay entre Home & Business y ProPlus?",
        answer: "Office Home & Business 2019 incluye Word, Excel, PowerPoint y Outlook. Office Professional Plus 2019 añade Access y Publisher, entre otras aplicaciones. La composición exacta depende de la edición y del canal de tu licencia.",
      },
      {
        question: "¿Para qué sirve la descarga de Access 2019?",
        answer: "Access 2019 también se vendía como producto independiente. Si tu licencia es solo de Access, descarga esta imagen en lugar de la de Office completo.",
      },
      {
        question: "¿Debo instalar Office 2019 de 32 o 64 bits?",
        answer: "En la mayoría de los equipos conviene 64 bits. Usa 32 bits si Windows es de 32 bits o si necesitas complementos antiguos. No mezcles arquitecturas con otra versión de Office instalada.",
        guideSlug: "office-32-o-64-bits",
        guideLabel: "Elegir la arquitectura correcta",
      },
      activationFaq,
      macFaq,
    ],
    source: {
      label: "Ciclo de vida de Office 2019 en Microsoft Learn",
      url: "https://learn.microsoft.com/es-es/lifecycle/products/microsoft-office-2019",
    },
  },
  "office-2021": {
    summary: [
      "Office 2021 se publicó en octubre de 2021 y es la versión perpetua anterior a Office 2024. Funciona en Windows 10 y Windows 11. Microsoft retira su soporte el 13 de octubre de 2026; a partir de esa fecha dejará de recibir actualizaciones de seguridad.",
      "Si vas a instalar Office en un equipo nuevo y tu licencia te lo permite, conviene valorar Office 2024. Si ya tienes una licencia de Office 2021, aquí encontrarás el instalador para reinstalarla. Cada IMG incluye Setup32.exe y Setup64.exe.",
      "En esta página están Office Home & Business, Office ProPlus, Project Pro y Visio Pro.",
    ],
    facts: [
      { label: "Plataforma", value: "Windows 10 y 11" },
      { label: "Formato", value: "Archivo IMG" },
      { label: "Arquitecturas", value: "32 y 64 bits" },
      { label: "Soporte", value: "Hasta el 13 de octubre de 2026" },
    ],
    guideSlugs: ["office-2024-vs-microsoft-365", ...installGuideSlugs],
    faqs: [
      {
        question: "¿Hasta cuándo tiene soporte Office 2021?",
        answer: "Hasta el 13 de octubre de 2026, según el ciclo de vida de Microsoft. Después seguirá funcionando, pero sin actualizaciones de seguridad.",
      },
      {
        question: "¿Me conviene Office 2021 u Office 2024?",
        answer: "Si empiezas desde cero, Office 2024 tiene soporte durante más tiempo. Office 2021 tiene sentido si ya cuentas con esa licencia o necesitas mantener la misma versión en varios equipos.",
        guideSlug: "office-2024-vs-microsoft-365",
        guideLabel: "Comparar Office 2024 y Microsoft 365",
      },
      {
        question: "¿Qué diferencia hay entre Home & Business y ProPlus?",
        answer: "Office Home & Business 2021 incluye Word, Excel, PowerPoint y Outlook. Office Professional Plus 2021 añade Access y Publisher, entre otras aplicaciones. Instala la edición que corresponde a tu licencia.",
      },
      {
        question: "¿Debo instalar Office 2021 de 32 o 64 bits?",
        answer: "En Windows 10 y 11 de 64 bits, lo habitual es instalar Office de 64 bits. Usa 32 bits solo si Windows es de 32 bits o si necesitas complementos antiguos.",
        guideSlug: "office-32-o-64-bits",
        guideLabel: "Elegir la arquitectura correcta",
      },
      {
        question: "¿Puedo instalar Office 2021 si ya tengo otra versión?",
        answer: "Si ya hay otra versión instalada con otro canal o arquitectura, el instalador puede detenerse. Desinstala la versión anterior, reinicia Windows y vuelve a ejecutar Setup.",
        guideSlug: "solucionar-problemas-instalacion-office",
        guideLabel: "Solucionar problemas de instalación",
      },
      activationFaq,
      macFaq,
    ],
    source: {
      label: "Ciclo de vida de Office 2021 en Microsoft Learn",
      url: "https://learn.microsoft.com/es-es/lifecycle/products/office-2021",
    },
  },
  "office-365": {
    summary: [
      "Office 365 ProPlus es el nombre anterior de Aplicaciones de Microsoft 365 para empresas. Microsoft cambió el nombre en 2020, pero el instalador sigue identificándose como O365ProPlusRetail. Incluye las aplicaciones de escritorio de Office para suscripciones de Microsoft 365.",
      "A diferencia de Office 2016, 2019, 2021 o 2024, no es una licencia perpetua: funciona mientras la cuenta con la que inicias sesión tenga una suscripción activa y recibe actualizaciones de forma continua.",
      "Descarga esta imagen si tu organización o tu plan de Microsoft 365 incluye las aplicaciones de escritorio. Si compraste una licencia de pago único, elige la versión de Office correspondiente.",
    ],
    facts: [
      { label: "Plataforma", value: "Windows" },
      { label: "Formato", value: "Archivo IMG" },
      { label: "Licencia", value: "Suscripción" },
      { label: "Nombre actual", value: "Microsoft 365 Apps" },
    ],
    guideSlugs: ["office-2024-vs-microsoft-365", ...installGuideSlugs],
    faqs: [
      {
        question: "¿Office 365 ProPlus y Microsoft 365 Apps son lo mismo?",
        answer: "Sí. Microsoft indica que Aplicaciones de Microsoft 365 para empresas antes se llamaba Office 365 ProPlus. El producto es el mismo; cambió el nombre.",
      },
      {
        question: "¿Necesito una suscripción para usarlo?",
        answer: "Sí. Después de instalarlo tienes que iniciar sesión con una cuenta que tenga una suscripción de Microsoft 365 con aplicaciones de escritorio. Sin ella, Office funciona en modo de funcionalidad reducida.",
      },
      {
        question: "¿En qué se diferencia de Office 2024?",
        answer: "Office 2024 se paga una vez y, durante su ciclo de soporte, recibe correcciones pero no funciones nuevas. Microsoft 365 se paga por suscripción, recibe funciones nuevas con regularidad e incluye servicios como OneDrive según el plan.",
        guideSlug: "office-2024-vs-microsoft-365",
        guideLabel: "Comparar Office 2024 y Microsoft 365",
      },
      {
        question: "¿Debo instalarlo de 32 o 64 bits?",
        answer: "En la mayoría de los equipos conviene 64 bits. En equipos con procesador ARM, Microsoft solo admite la versión de 64 bits y requiere Windows 11. El IMG incluye ambos instaladores.",
        guideSlug: "office-32-o-64-bits",
        guideLabel: "Elegir la arquitectura correcta",
      },
      {
        question: "¿Puedo instalarlo si ya tengo Office 2016, 2019 o 2021?",
        answer: "Lo recomendable es desinstalar primero la versión perpetua. Las instalaciones de distintas versiones suelen generar conflictos, y no se pueden mezclar 32 y 64 bits.",
        guideSlug: "limpiar-office-antes-de-instalar",
        guideLabel: "Limpiar Office antes de instalar",
      },
      activationFaq,
      macFaq,
    ],
    source: {
      label: "Aplicaciones de Microsoft 365 en Microsoft Learn",
      url: "https://learn.microsoft.com/es-es/lifecycle/products/microsoft-365-apps",
    },
  },
};

export function getVersionContent(softwareSlug: string) {
  return versionContent[softwareSlug];
}
