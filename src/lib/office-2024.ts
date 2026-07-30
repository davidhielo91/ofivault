export type Office2024Faq = {
  question: string;
  answer: string;
  guideSlug?: string;
  guideLabel?: string;
};

export const office2024GuideSlugs = [
  "como-instalar-office-2024",
  "requisitos-office-2024",
  "office-2024-professional-plus",
  "office-2024-vs-microsoft-365",
] as const;

export const office2024Faqs: Office2024Faq[] = [
  {
    question: "¿Office 2024 es gratuito?",
    answer: "No. El archivo de descarga contiene los instaladores. La forma de activar Office 2024 depende de la edición y de las opciones que tengas disponibles.",
  },
  {
    question: "¿Qué diferencia hay entre Office 2024, ProPlus y Office LTSC 2024?",
    answer: "Office 2024 agrupa distintas ediciones. ProPlus identifica una edición amplia; Retail y Volume identifican canales diferentes. Office LTSC 2024 es una versión para organizaciones con licencias por volumen y no es otro nombre para cualquier instalador de Office 2024.",
    guideSlug: "office-2024-professional-plus",
    guideLabel: "Ver diferencias entre ProPlus, Retail y LTSC",
  },
  {
    question: "¿Qué incluye Office 2024 Professional Plus?",
    answer: "Microsoft documenta Word, Excel, PowerPoint, Outlook, OneNote y Access para Office LTSC Professional Plus 2024. La composición y los derechos de uso dependen de la edición y del canal de tu licencia.",
    guideSlug: "office-2024-professional-plus",
    guideLabel: "Consultar aplicaciones y canales",
  },
  {
    question: "¿Office 2024 incluye Teams, Project, Visio o Copilot?",
    answer: "Project y Visio son productos independientes. Teams se obtiene por separado y las funciones de Copilot dependen de planes compatibles de Microsoft 365; no deben asumirse como parte de una licencia clásica de Office 2024.",
  },
  {
    question: "¿Office 2024 funciona en Windows 10 y Windows 11?",
    answer: "Office 2024 para consumidores admite Windows 10 y Windows 11, pero el soporte general de Windows 10 terminó el 14 de octubre de 2025. En 2026 conviene usar Windows 11. Office LTSC tiene una matriz de soporte separada.",
    guideSlug: "requisitos-office-2024",
    guideLabel: "Comprobar todos los requisitos",
  },
  {
    question: "¿Debo instalar Office 2024 de 32 o 64 bits?",
    answer: "Para la mayoría de los equipos actuales conviene 64 bits. Usa 32 bits si Windows es de 32 bits o necesitas complementos antiguos. Los IMG publicados incluyen Setup32.exe y Setup64.exe.",
    guideSlug: "office-32-o-64-bits",
    guideLabel: "Elegir la arquitectura correcta",
  },
  {
    question: "¿Necesito internet para instalar y usar Office 2024?",
    answer: "Necesitas internet para descargar el IMG y normalmente para activar y actualizar Office. Después de instalarlo y activarlo puedes usar Word, Excel y PowerPoint sin conexión, aunque Office puede requerir una reactivación periódica.",
  },
  {
    question: "¿Puedo instalar Office 2024 si ya tengo otra versión?",
    answer: "Depende de la arquitectura y del canal instalados. Si aparece un conflicto, desinstala los componentes anteriores, reinicia Windows y vuelve a ejecutar el instalador. No mezcles Office de 32 y 64 bits.",
    guideSlug: "como-instalar-office-2024",
    guideLabel: "Seguir la instalación paso a paso",
  },
  {
    question: "¿Estos archivos IMG sirven para Mac?",
    answer: "No. Los archivos IMG del catálogo contienen instaladores para Windows. Office 2024 para Mac utiliza paquetes y licencias específicos.",
  },
  {
    question: "¿Cómo instalo Office 2024 en español?",
    answer: "Selecciona Español o Español (México) antes de descargar. El botón se actualizará con el IMG correspondiente al idioma elegido.",
  },
  {
    question: "¿En cuántos equipos puedo instalar Office 2024?",
    answer: "Lo determina tu licencia, no el instalador. Las compras de Office 2024 para consumidores suelen asignarse a un equipo, mientras que las licencias por volumen y las suscripciones tienen condiciones diferentes.",
    guideSlug: "office-2024-vs-microsoft-365",
    guideLabel: "Comparar Office 2024 y Microsoft 365",
  },
  {
    question: "¿Cómo se activa Office 2024?",
    answer: "Usa la cuenta, clave o método de activación proporcionado por el canal donde obtuviste una licencia legítima. El instalador descargado no activa Office por sí mismo.",
  },
];
