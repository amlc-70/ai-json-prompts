/**
 * AI JSON Prompts - Lógica Principal (Vanilla JS)
 * Autor: amlc-70
 * Licencia: GNU GPL3
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. CATÁLOGO DE PROMPTS DEL REPOSITORIO
  // =========================================================================
  const PROMPTS_CATALOG = [
    // Categoría: Asistentes Técnicos
    {
      id: "voltia",
      category: "asistentes",
      categoryLabel: "Asistentes Técnicos",
      file: "prompts/asistentes/voltia_sistema_fotovoltaico.json",
      fallbackTitle: "VoltIA",
      fallbackDesc: "Experto en sistemas fotovoltaicos, dimensionamiento solar y bancos de baterías."
    },
    {
      id: "elecia",
      category: "asistentes",
      categoryLabel: "Asistentes Técnicos",
      file: "prompts/asistentes/elecia_calculos_electricos.json",
      fallbackTitle: "ElecIA",
      fallbackDesc: "Experto en ingeniería eléctrica, Ley de Ohm/Kirchhoff y cálculo de conductores."
    },
    {
      id: "lumia",
      category: "asistentes",
      categoryLabel: "Asistentes Técnicos",
      file: "prompts/asistentes/lumia_calculo_luminarias.json",
      fallbackTitle: "LumIA",
      fallbackDesc: "Experto en ingeniería de iluminación y cálculo mediante el método de los lúmenes."
    },
    // Categoría: Creatividad y Organización
    {
      id: "docuia",
      category: "creatividad",
      categoryLabel: "Creatividad y Documentación",
      file: "prompts/creatividad/docu_asistente_tecnico.json",
      fallbackTitle: "DocuIA",
      fallbackDesc: "Especialista en redacción de manuales, especificaciones y documentación técnica."
    },
    {
      id: "filofaxia",
      category: "creatividad",
      categoryLabel: "Creatividad y Documentación",
      file: "prompts/creatividad/filofax_asistente_organizacion.json",
      fallbackTitle: "FilofaxIA",
      fallbackDesc: "Asistente de productividad, planificación y sincronización Keep/Calendar."
    },
    // Categoría: Desarrollo de Software
    {
      id: "phpia",
      category: "desarrollo",
      categoryLabel: "Desarrollo Backend y Web",
      file: "prompts/desarrollo/php.json",
      fallbackTitle: "PhpIA",
      fallbackDesc: "Arquitectura limpia, refactorización y buenas prácticas en PHP 8.4+."
    },
    {
      id: "pythonia",
      category: "desarrollo",
      categoryLabel: "Desarrollo Backend y Web",
      file: "prompts/desarrollo/python.json",
      fallbackTitle: "PythonIA",
      fallbackDesc: "Desarrollo en Python moderno, tipado estático y automatización CLI."
    },
    {
      id: "jsia",
      category: "desarrollo",
      categoryLabel: "Desarrollo Backend y Web",
      file: "prompts/desarrollo/javascript.json",
      fallbackTitle: "JsIA",
      fallbackDesc: "Desarrollo asíncrono, ES2024+ y arquitectura modular en JavaScript puro."
    }
  ];

  // Almacén en memoria de los JSON cargados
  const loadedPromptsData = new Map();

  // =========================================================================
  // 2. CARGA DINÁMICA DE ARCHIVOS JSON Y RENDERIZADO DE TARJETAS
  // =========================================================================
  const promptsGrid = document.getElementById("prompts-grid");
  const filterButtons = document.querySelectorAll("[data-filter]");

  async function initPrompts() {
    if (!promptsGrid) return;

    promptsGrid.innerHTML = `<p>Cargando asistentes desde el repositorio...</p>`;

    const fetchPromises = PROMPTS_CATALOG.map(async (item) => {
      try {
        const response = await fetch(item.file);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const jsonData = await response.json();
        loadedPromptsData.set(item.id, { meta: item, data: jsonData });
      } catch (error) {
        // Si se abre localmente sin servidor HTTP (file://) o falla la ruta, guarda respaldo
        console.warn(`No se pudo cargar ${item.file} vía fetch:`, error.message);
        loadedPromptsData.set(item.id, {
          meta: item,
          data: {
            nombre: item.fallbackTitle,
            descripcion: item.fallbackDesc,
            archivo: item.file,
            nota: "Ejecuta en un servidor web (GitHub Pages o Apache local) para inspeccionar el JSON completo."
          }
        });
      }
    });

    await Promise.all(fetchPromises);
    renderCards("all");
  }

  function renderCards(filterCategory = "all") {
    if (!promptsGrid) return;
    promptsGrid.innerHTML = "";

    loadedPromptsData.forEach(({ meta, data }, id) => {
      if (filterCategory !== "all" && meta.category !== filterCategory) return;

      // Extrae dinámicamente nombre y descripción sin importar las claves exactas del JSON
      const title = data.nombre || data.name || data.rol || meta.fallbackTitle;
      const description = data.descripcion || data.description || data.objetivo || meta.fallbackDesc;

      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <header class="card-header">
          <h3 class="card-header-title">${escapeHTML(title)}</h3>
          <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">
            ${escapeHTML(meta.categoryLabel)}
          </span>
        </header>
        <div class="card-content">
          <p>${escapeHTML(description)}</p>
          <p style="margin-top: 10px; font-size: 0.8rem; color: #7a7a7a;">
            <code>${escapeHTML(meta.file)}</code>
          </p>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <button type="button" class="btn-3d btn-inspect" data-id="${id}">
              Ver JSON
            </button>
          </div>
          <div class="card-footer-item">
            <button type="button" class="btn-3d btn-copy" data-id="${id}" style="background-color: var(--dark); box-shadow: 0 4px 0 #1a1a1a;">
              Copiar
            </button>
          </div>
        </footer>
      `;

      promptsGrid.appendChild(card);
    });

    bindCardEvents();
  }

  function bindCardEvents() {
    document.querySelectorAll(".btn-inspect").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entry = loadedPromptsData.get(btn.dataset.id);
        if (entry) {
          openModal(
            entry.data.nombre || entry.meta.fallbackTitle,
            JSON.stringify(entry.data, null, 2)
          );
        }
      });
    });

    document.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const entry = loadedPromptsData.get(btn.dataset.id);
        if (!entry) return;

        try {
          await navigator.clipboard.writeText(JSON.stringify(entry.data, null, 2));
          const originalText = btn.textContent;
          btn.textContent = "¡Copiado!";
          btn.style.backgroundColor = "var(--success)";
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "var(--dark)";
          }, 1800);
        } catch (err) {
          console.error("Error al copiar al portapapeles:", err);
        }
      });
    });
  }

  // Filtros por categoría
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderCards(btn.dataset.filter);
    });
  });

  // =========================================================================
  // 3. GESTIÓN DEL MODAL ADAPTATIVO
  // =========================================================================
  const modal = document.getElementById("prompt-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close");
  const modalCopyBtn = document.getElementById("modal-copy-btn");

  function openModal(title, jsonString) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.textContent = jsonString;
    modal.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-active")) {
      closeModal();
    }
  });

  if (modalCopyBtn && modalBody) {
    modalCopyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(modalBody.textContent);
      modalCopyBtn.textContent = "¡JSON Copiado!";
      setTimeout(() => {
        modalCopyBtn.textContent = "Copiar JSON";
      }, 1800);
    });
  }

  // =========================================================================
  // 4. CARRUSEL DE IMÁGENES
  // =========================================================================
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  let currentSlide = 0;

  function updateCarousel() {
    if (!track || slides.length === 0) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  // =========================================================================
  // 5. MEJORA RESPONSIVE DE TABLAS (Inyección automática de data-label)
  // =========================================================================
  function enhanceResponsiveTables() {
    const tables = document.querySelectorAll(".table");
    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
        th.textContent.trim()
      );
      const rows = table.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, index) => {
          if (headers[index]) {
            cell.setAttribute("data-label", headers[index]);
          }
        });
      });
    });
  }

  // =========================================================================
  // 6. FORMULARIO DE CONTACTO CON EMAILJS
  // =========================================================================
  const contactForm = document.getElementById("contact-form");
  const btnSubmit = document.getElementById("btn-submit");
  const statusText = document.getElementById("form-status");

  // Reemplaza estos valores con tus IDs públicos de EmailJS
  const EMAILJS_CONFIG = {
    publicKey: "TU_PUBLIC_KEY",
    serviceID: "TU_SERVICE_ID",
    templateID: "TU_TEMPLATE_ID"
  };

  if (typeof emailjs !== "undefined" && EMAILJS_CONFIG.publicKey !== "TU_PUBLIC_KEY") {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (typeof emailjs === "undefined") {
        if (statusText) {
          statusText.textContent = "Error: El SDK de EmailJS no está cargado.";
          statusText.style.color = "var(--danger)";
        }
        return;
      }

      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";
      }
      if (statusText) statusText.textContent = "";

      emailjs
        .sendForm(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, this)
        .then(() => {
          if (statusText) {
            statusText.textContent = "Consulta enviada correctamente. ¡Gracias por escribir!";
            statusText.style.color = "var(--success)";
          }
          contactForm.reset();
        })
        .catch((error) => {
          if (statusText) {
            statusText.textContent = "No se pudo enviar el mensaje. Verifica tu configuración de EmailJS.";
            statusText.style.color = "var(--danger)";
          }
          console.error("EmailJS Error:", error);
        })
        .finally(() => {
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = "Enviar consulta";
          }
        });
    });
  }

  // =========================================================================
  // 7. UTILIDADES E INICIALIZACIÓN
  // =========================================================================
  function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Arrancar módulos
  initPrompts();
  enhanceResponsiveTables();
});
