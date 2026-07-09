const defaultBusinessData = {
  brandNameDisplay: "МедТехМакс",
  brandDescriptor: "компрессия, бандажи и послеоперационные товары рядом с Блохиным",
  logoMarkPath: "./assets/logo-lockup-medtehmax.svg",
  phoneDisplay: "+7 (916) 927-76-82",
  phoneHref: "tel:+79169277682",
  emailDisplay: "info@medtehmaks.ru",
  emailHref: "mailto:info@medtehmaks.ru",
  whatsappHref: "https://wa.me/79169277682",
  telegramHref: "https://t.me/medtehmaks",
  addressDisplay: "Москва, Каширское шоссе, 23",
  addressHref:
    "https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9A%D0%B0%D1%88%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%2023",
  mapsHref:
    "https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9A%D0%B0%D1%88%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5%2C%2023",
  responseTime: "до 15 минут",
  deliveryRegion: "по Москве и России",
  ratingDisplay: "4.3",
  ratingSource: "Яндекс Карты"
};

const externalConfig = window.MEDTEHMAKS_SITE_CONFIG || {};
const businessData = {
  ...defaultBusinessData,
  ...(externalConfig.businessData || {})
};
const productCatalog = externalConfig.products || {};

const scenarioContent = {
  mastectomy_care: {
    title: "После мастэктомии и лимфостаза",
    text:
      "Если нужны рукав, компрессия, белье или товары для восстановления после лечения, лучше сразу перейти на страницу с понятными подсказками и быстрым способом связаться.",
    bullets: [
      "Подходит для пациента и родственников",
      "Помогает быстрее понять, что искать",
      "Можно сразу уточнить наличие и задать вопрос"
    ],
    primaryLabel: "Открыть страницу",
    primaryHref: "./landing-mastectomy-care.html",
    secondaryLabel: "Связаться",
    secondaryHref: "./contacts-company.html"
  },
  compression_nearby: {
    title: "Компрессионный трикотаж рядом с Блохиным",
    text:
      "Если компрессия нужна рядом и без лишних поисков, удобнее сразу открыть страницу с подсказками по размеру, наличию и способу быстро связаться.",
    bullets: [
      "Быстрый вход без длинного каталога",
      "Можно уточнить размер и наличие",
      "Есть звонок, WhatsApp и резерв"
    ],
    primaryLabel: "Открыть страницу",
    primaryHref: "./landing-compression-blokhina.html",
    secondaryLabel: "Нужна помощь с выбором",
    secondaryHref: "./selection-help.html"
  },
  discharge_home: {
    title: "Уход дома после выписки",
    text:
      "Когда семья готовится к выписке, обычно нужно быстро понять, какие товары для восстановления понадобятся в первую очередь и где их проще получить.",
    bullets: [
      "Компрессия, бандажи, опоры и домашний контроль",
      "Подходит для родственников и семьи",
      "Можно быстро согласовать наличие и доставку"
    ],
    primaryLabel: "Открыть страницу",
    primaryHref: "./landing-discharge-home.html",
    secondaryLabel: "Нужна помощь с выбором",
    secondaryHref: "./selection-help.html"
  },
  home_care_kit: {
    title: "Нужны товары для восстановления дома",
    text:
      "Если нужно сразу несколько товаров для восстановления дома, удобнее сначала описать ситуацию и получить короткий список подходящих вариантов.",
    bullets: [
      "Бандажи, ортезы, опоры и домашние приборы",
      "Без лишних поисков по каталогу",
      "Есть быстрый переход к консультации"
    ],
    primaryLabel: "Открыть подбор",
    primaryHref: "./selection-help.html",
    secondaryLabel: "Нужна помощь с выбором",
    secondaryHref: "./selection-help.html"
  },
  clinics_org: {
    title: "Для клиник и организаций",
    text:
      "Если вы подбираете товары для клиники, службы ухода или организации, здесь удобнее оставить рабочий запрос и получить ответ по делу.",
    bullets: [
      "Для клиник, служб ухода и НКО",
      "Подходит для разовых и регулярных запросов",
      "Есть отдельная форма для организаций"
    ],
    primaryLabel: "Открыть страницу",
    primaryHref: "./for-clinics-organizations.html",
    secondaryLabel: "Связаться",
    secondaryHref: "./contacts-company.html"
  }
};

function hydrateBrandSystem() {
  document.querySelectorAll(".brand-mark").forEach((node) => {
    node.innerHTML = `<img src="${businessData.logoMarkPath}" alt="${businessData.brandNameDisplay}" loading="eager" decoding="async" />`;
    node.closest(".brand-block")?.classList.add("brand-lockup-only");
  });

  document.querySelectorAll(".brand-name").forEach((node) => {
    node.textContent = businessData.brandNameDisplay;
  });

  document.querySelectorAll(".brand-subtitle").forEach((node) => {
    node.textContent = businessData.brandDescriptor;
  });
}

function mountScenarioPlanner(planner) {
  const buttons = planner.querySelectorAll("[data-scenario]");
  const title = planner.querySelector("[data-scenario-title]");
  const text = planner.querySelector("[data-scenario-text]");
  const bullets = planner.querySelector("[data-scenario-bullets]");
  const primary = planner.querySelector("[data-scenario-primary]");
  const secondary = planner.querySelector("[data-scenario-secondary]");

  function renderScenario(key) {
    const content = scenarioContent[key];
    if (!content) return;

    buttons.forEach((button) => {
      const isActive = button.dataset.scenario === key;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (title) title.textContent = content.title;
    if (text) text.textContent = content.text;
    if (bullets) {
      bullets.innerHTML = "";
      content.bullets.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        bullets.appendChild(li);
      });
    }
    if (primary) {
      primary.textContent = content.primaryLabel;
      primary.setAttribute("href", content.primaryHref);
    }
    if (secondary) {
      secondary.textContent = content.secondaryLabel;
      secondary.setAttribute("href", content.secondaryHref);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => renderScenario(button.dataset.scenario));
  });

  renderScenario(planner.dataset.defaultScenario || buttons[0]?.dataset.scenario);
}

document.querySelectorAll("[data-scenario-planner]").forEach(mountScenarioPlanner);

function hydrateBusinessData() {
  hydrateBrandSystem();

  document.querySelectorAll('a[href="tel:+74950000000"]').forEach((link) => {
    link.setAttribute("href", businessData.phoneHref);
    if (link.classList.contains("phone-link") || /\+7\s*\(495\)/.test(link.textContent)) {
      link.textContent = businessData.phoneDisplay;
    }
  });

  document.querySelectorAll('a[href="mailto:info@medtehmaks.ru"]').forEach((link) => {
    link.setAttribute("href", businessData.emailHref);
    link.textContent = businessData.emailDisplay;
  });

  document.querySelectorAll('a[href="#contacts"]').forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes("whatsapp")) {
      link.setAttribute("href", businessData.whatsappHref);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    }
    if (text.includes("telegram")) {
      link.setAttribute("href", businessData.telegramHref);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    }
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.setAttribute("href", businessData.whatsappHref);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });

  document.querySelectorAll("[data-address-link]").forEach((link) => {
    link.setAttribute("href", businessData.mapsHref || businessData.addressHref);
    link.textContent = businessData.addressDisplay;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });

  document.querySelectorAll("[data-address-text]").forEach((node) => {
    node.textContent = businessData.addressDisplay;
  });

  document.querySelectorAll("[data-maps-link]").forEach((link) => {
    link.setAttribute("href", businessData.mapsHref || businessData.addressHref);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });

  document.querySelectorAll("[data-rating-value]").forEach((node) => {
    node.textContent = businessData.ratingDisplay;
  });

  document.querySelectorAll("[data-rating-source]").forEach((node) => {
    node.textContent = businessData.ratingSource;
  });

  document.querySelectorAll("[data-response-time]").forEach((node) => {
    node.textContent = businessData.responseTime;
  });

  document.querySelectorAll("[data-delivery-region]").forEach((node) => {
    node.textContent = businessData.deliveryRegion;
  });
}

hydrateBusinessData();

function hydrateProducts() {
  document.querySelectorAll("[data-product-card]").forEach((card) => {
    const product = productCatalog[card.dataset.productCard];
    if (!product) return;

    const title = card.querySelector("[data-product-title]");
    const short = card.querySelector("[data-product-short]");
    const price = card.querySelector("[data-product-price]");
    const availability = card.querySelector("[data-product-availability]");

    if (title) title.textContent = product.title;
    if (short) short.textContent = product.short;
    if (price) price.textContent = product.price;
    if (availability) availability.textContent = product.availability;
  });

  document.querySelectorAll("[data-product-view]").forEach((view) => {
    const product = productCatalog[view.dataset.productView];
    if (!product) return;

    const title = view.querySelector("[data-product-title]");
    const short = view.querySelector("[data-product-short]");
    const price = view.querySelector("[data-product-price]");
    const priceNote = view.querySelector("[data-product-price-note]");
    const availability = view.querySelector("[data-product-availability]");

    if (title) title.textContent = product.title;
    if (short) short.textContent = product.short;
    if (price) price.textContent = product.price;
    if (priceNote) priceNote.textContent = product.priceNote;
    if (availability) availability.textContent = product.availability;
  });
}

hydrateProducts();

function mountReviewCarousel(carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const cards = Array.from(carousel.querySelectorAll(".review-card"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dots = carousel.querySelector("[data-carousel-dots]");

  if (!track || cards.length === 0) return;

  let currentPage = 0;
  let pageCount = 1;

  function getVisibleCount() {
    const value = window.getComputedStyle(track).getPropertyValue("--review-visible");
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }

  function getOffsetForPage(page) {
    const visibleCount = getVisibleCount();
    const startIndex = Math.min(page * visibleCount, Math.max(cards.length - 1, 0));
    return cards[startIndex]?.offsetLeft || 0;
  }

  function renderDots() {
    if (!dots) return;
    dots.innerHTML = "";

    for (let index = 0; index < pageCount; index += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `carousel-dot${index === currentPage ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `Показать отзывы ${index + 1}`);
      dot.addEventListener("click", () => {
        currentPage = index;
        update();
      });
      dots.appendChild(dot);
    }
  }

  function update() {
    const visibleCount = getVisibleCount();
    pageCount = Math.max(1, Math.ceil(cards.length / visibleCount));
    currentPage = Math.min(currentPage, pageCount - 1);

    track.style.transform = `translateX(-${getOffsetForPage(currentPage)}px)`;

    if (prevButton) prevButton.disabled = currentPage === 0;
    if (nextButton) nextButton.disabled = currentPage >= pageCount - 1;

    if (dots) {
      dots.toggleAttribute("hidden", pageCount <= 1);
      renderDots();
    }
    if (prevButton?.parentElement) {
      prevButton.parentElement.toggleAttribute("hidden", pageCount <= 1);
    }
  }

  prevButton?.addEventListener("click", () => {
    if (currentPage === 0) return;
    currentPage -= 1;
    update();
  });

  nextButton?.addEventListener("click", () => {
    if (currentPage >= pageCount - 1) return;
    currentPage += 1;
    update();
  });

  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(update);
  });

  update();
}

document.querySelectorAll("[data-review-carousel]").forEach(mountReviewCarousel);

function persistLead(payload) {
  const key = "medtehmaks_leads";
  const current = JSON.parse(window.localStorage.getItem(key) || "[]");
  current.unshift(payload);
  window.localStorage.setItem(key, JSON.stringify(current.slice(0, 30)));
}

function ensureFormMeta(form) {
  if (!form.querySelector(".form-note")) {
    const note = document.createElement("p");
    note.className = "form-note";
    note.textContent =
      "После отправки покажем следующий шаг: куда вас лучше перевести — в звонок, мессенджер или точечный подбор.";
    form.appendChild(note);
  }

  let feedback = form.querySelector(".form-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "form-feedback";
    form.appendChild(feedback);
  }
  return feedback;
}

function setLeadFeedback(feedback, type, html) {
  feedback.className = `form-feedback is-${type}`;
  feedback.innerHTML = html;
}

function mountLeadForm(form) {
  const feedback = ensureFormMeta(form);
  const textInputs = form.querySelectorAll('input[type="text"]');
  const nameInput = textInputs[0];
  const contactInput = textInputs[1];
  const taskInput = form.querySelector("textarea");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput?.value.trim() || "";
    const contact = contactInput?.value.trim() || "";
    const task = taskInput?.value.trim() || "";
    const context = form.dataset.leadContext || document.title;

    if (!name || !contact || !task) {
      setLeadFeedback(
        feedback,
        "error",
        "<strong>Нужно заполнить все поля.</strong><p>Имя, контакт и короткое описание задачи нужны, чтобы быстрее помочь с выбором и не задавать лишние уточнения.</p>"
      );
      return;
    }

    const leadPayload = {
      createdAt: new Date().toISOString(),
      page: window.location.pathname.split("/").pop() || "index.html",
      context,
      name,
      contact,
      task
    };

    persistLead(leadPayload);

    setLeadFeedback(
      feedback,
      "success",
      `<strong>Заявка зафиксирована.</strong>
      <p><span>Контекст:</span> ${context}</p>
      <p><span>Следующий шаг:</span> связаться по указанному контакту, уточнить 1-2 детали и показать человеку 2-3 подходящих варианта вместо общего каталога.</p>
      <div class="feedback-actions">
        <a class="secondary-button" href="${businessData.phoneHref}">Позвонить сразу</a>
        <a class="secondary-button" href="./contacts-company.html">Открыть контакты</a>
      </div>`
    );

    form.classList.add("is-submitted");
    nameInput.value = "";
    contactInput.value = "";
    taskInput.value = "";
    if (submitButton) submitButton.textContent = "Заявка отправлена";
    window.setTimeout(() => {
      if (submitButton) submitButton.textContent = "Получить подбор";
    }, 2400);
  });
}

document.querySelectorAll("[data-lead-form]").forEach(mountLeadForm);
