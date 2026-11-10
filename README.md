# 🤖 AI JSON Prompts Repository

Repositorio centralizado para el almacenamiento, gestión y control de versiones de *system prompts* y plantillas de instrucciones estructuradas en formato **JSON**, diseñadas para alimentar agentes de inteligencia artificial y LLMs especializados.

---

## 🎯 ¿Por qué utilizar Prompts en formato JSON?

---

En el desarrollo de aplicaciones basadas en IA y la interacción avanzada con modelos de lenguaje, los prompts estáticos en texto plano suelen quedarse cortos. Centralizar y estructurar los prompts en archivos JSON ofrece ventajas fundamentales:

* **Separación de responsabilidades:** Separa la lógica de la aplicación y los datos de la ingeniería de prompts, facilitando su mantenimiento.
* **Estructura enriquecida:** Permite encapsular metadatos críticos como el rol del asistente, el tono, estilos, variables requeridas, parámetros de cálculo interno y reglas de oro en un solo objeto organizado.
* **Portabilidad e Interoperabilidad:** Facilita la ingesta automática de los prompts por parte de scripts, APIs o frameworks de IA (como LangChain, LlamaIndex o scripts personalizados en Python/Node.js).
* **Control de versiones preciso:** Gracias a Git, podemos rastrear cada modificación, mejora o ajuste fino en los comportamientos de nuestros agentes de IA a lo largo del tiempo.

---

## 📂 Estructura del Repositorio

---

El repositorio se encuentra organizado por categorías y utilidades específicas:

ai-json-prompts/
├── prompts/
│   ├── desarrollo/          # Prompts enfocados en ingeniería de software, refactorización y código
│   ├── productividad/       # Prompts para optimización de tareas y gestión de tiempo
│   ├── creatividad/         # Prompts para ideación, redacción y contenido creativo
│   └── asistentes/          # System prompts avanzados para agentes conversacionales especializados
├── .gitignore
└── README.md

---

Lista Actualizada

  * `prompts/asistentes/` - Asistentes técnicos especializados en cálculos y dimensionamiento.
  * `voltia_sistema_fotovoltaico.json` - Experto en sistemas fotovoltaicos y baterías (VoltIA).
  * `elecia_calculos_electricos.json` - Experto en ingeniería eléctrica y Ley de Ohm/Kirchhoff (ElecIA).
  * `lumia_calculo_luminarias.json` - Experto en ingeniería de iluminación y método de los lúmenes (LumIA).
  * `prompts/creatividad/` - Asistentes enfocados en redacción técnica, documentación y gestión del tiempo.
  * `docu_asistente_tecnico.json` - Experto en redacción de manuales y especificaciones técnicas (DocuIA).
  * `filofax_asistente_organizacion.json` - Experto en planificación, agendas y sincronización Keep/Calendar (FilofaxIA).

---

## 🚀 Cómo Utilizar estos Prompts

---

Puedes utilizar estos archivos JSON directamente en tus desarrollos o integraciones con LLMs mediante un script de carga. Por ejemplo, en **Python**:

# 🤖 ai-json-prompts

Repositorio profesional de *system prompts* estandarizados y modulares en formato JSON para asistentes de IA especializados en ingeniería, arquitectura técnica, documentación y organización personal.

---

## 🚀 Automatización y Control de Calidad

* **Validación CI/CD:** El repositorio incluye flujos de trabajo en **GitHub Actions** (`.github/workflows/validador_json.yml`) que verifican automáticamente la sintaxis JSON en cada `push` o `pull_request`.
* **Gestor Local:** Cuenta con el script en Python `gestor_asistentes.py` para la detección, carga y consulta dinámica de los perfiles desde la terminal.

---

## 🛠️ Contribución y Estado

---

* **Autor:** amlc-70
* **Entorno de trabajo:** Debian 13 workstation con control de versiones Git y autenticación SSH.
* Las contribuciones y nuevos asistentes especializados son bienvenidos a través de pull requests.


