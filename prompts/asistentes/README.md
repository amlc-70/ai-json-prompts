# 🤖 Catálogo de Asistentes IA

Esta carpeta contiene los *system prompts* estructurados en formato JSON para diferentes asistentes especializados.

## ☀️ VoltIA (`voltia_sistema_fotovoltaico.json`)

* **Descripción:** Asesor experto, paciente, empático y altamente didáctico en sistemas fotovoltaicos y almacenamiento de energía con baterías.
* **Objetivo:** Guiar paso a paso a usuarios sin conocimientos técnicos previos para dimensionar correctamente un banco de baterías.
* **Características del Motor de Cálculo:**
  * Cálculo de energía de carga y capacidad del banco en Wh y Ah.
  * Factores de corrección por temperatura ambiental (frío extremo, clima templado y calor extremo).
  * Estimación de corriente continua y **corriente de pico de arranque** para motores y compresores.
  * Criterios de selección para tecnologías de baterías (Plomo-ácido, AGM, Gel y Litio LiFePO4).
  * Pautas de cableado y protecciones de seguridad.
* **Flujo Conversacional:** Diseñado para interactuar de forma progresiva (sin abrumar al usuario con todos los datos de golpe).

---

## ⚡ ElecIA (`elecia_calculos_electricos.json`)

* **Descripción:** Asistente técnico experto, riguroso y didáctico especializado en ingeniería eléctrica, modelado de circuitos y resolución analítica de redes bajo normativas internacionales.
* **Objetivo:** Guiar en el dimensionamiento y cálculo de parámetros eléctricos fundamentales (corriente, tensión, impedancia y potencia) para infraestructuras monofásicas y trifásicas.
* **Fundamentos del Motor de Cálculo y Normativa:**
  * **Leyes Fundamentales:** Aplicación estricta de la Ley de Ohm y las Leyes de Kirchhoff (LKC y LVT) para resolución de nodos y mallas.
  * **Análisis de Potencia:** Cálculo detallado de potencia activa ($P$), reactiva ($Q$) y aparente ($S$) tanto en corriente alterna monofásica como trifásica simétrica.
  * **Criterios y Estandarización IEEE:** Integración de los lineamientos recomendados por el estándar **IEEE Std 141 (Red Book)** para sistemas de distribución industrial y **IEEE Std 241 (Gray Book)** para instalaciones comerciales, vigilando factores críticos como la regulación y caída de tensión admisible.
* **Metodología Interactiva:** Flujo de trabajo conversacional guiado por etapas que evita errores de dimensionamiento, exigiendo parámetros de entrada precisos y priorizando siempre las directrices de seguridad eléctrica.

---

## 💡 LumIA (`lumia_calculo_luminarias.json`)

* **Descripción:** Asistente técnico experto, metódico y didáctico especializado en ingeniería de iluminación, diseño lumínico y cálculo de niveles de iluminancia para entornos residenciales, comerciales e industriales.
* **Objetivo:** Guiar en el dimensionamiento preciso del flujo luminoso, cantidad de luminarias y distribución espacial mediante el método de los lúmenes y el cálculo del índice de local.
* **Fundamentos del Motor de Cálculo y Normativa:**
  * **Método de los Lúmenes:** Aplicación de fórmulas para el flujo total, cálculo del coeficiente de utilización ($CU$) según reflectancias, y factor de mantenimiento ($FM$).
  * **Niveles de Referencia (Luxes):** Estándares adaptados para espacios residenciales, comerciales (oficinas y vitrinas) e industriales (almacenes y áreas de ensamblaje de precisión).
  * **Normativa Internacional:** Alineación con los criterios y recomendaciones de la **IESNA** e **ISO 8995** para asegurar confort visual, uniformidad y seguridad ocupacional.
* **Metodología Interactiva:** Flujo conversacional progresivo que solicita las dimensiones del recinto, el tipo de actividad y las características de las luminarias para ofrecer un reporte técnico limpio y estructurado.
