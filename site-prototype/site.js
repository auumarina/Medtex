const defaultBusinessData = {
  phoneDisplay: "+7 (495) 000-00-00",
  phoneHref: "tel:+74950000000",
  emailDisplay: "info@medtehmaks.ru",
  emailHref: "mailto:info@medtehmaks.ru",
  whatsappHref: "https://wa.me/74950000000",
  telegramHref: "https://t.me/medtehmaks",
  responseTime: "до 15 минут",
  deliveryRegion: "по России"
};

const externalConfig = window.MEDTEHMAKS_SITE_CONFIG || {};
const businessData = {
  ...defaultBusinessData,
  ...(externalConfig.businessData || {})
};
const productCatalog = externalConfig.products || {};

const scenarioContent = {
  oxygen_home: {
    title: "Кислородный концентратор для домашнего использования",
    text:
      "Если задача связана с восстановлением дома, длительным использованием или важен тихий бытовой сценарий, человеку лучше сразу идти в узкую ветку по концентраторам, а не блуждать по общему каталогу.",
    bullets: [
      "Помощь в выборе под квартиру, шум и режим использования",
      "Узкая посадочная под рекламный и горячий спрос",
      "Переход к карточке товара и сравнению вариантов"
    ],
    primaryLabel: "Открыть подбор по концентраторам",
    primaryHref: "./landing-oxygen-home.html",
    secondaryLabel: "Смотреть категорию",
    secondaryHref: "./category-oxygen.html"
  },
  nebulizer_child: {
    title: "Небулайзер для ребенка или для всей семьи",
    text:
      "Если покупатель ищет решение для домашней терапии, важны возраст, частота использования и бытовой комфорт. Правильный маршрут здесь — не общая витрина, а понятная семейная ветка с объяснением различий.",
    bullets: [
      "Отдельный маршрут под детский и семейный спрос",
      "Блоки сравнения по сценарию использования",
      "Переход к карточке товара и консультации"
    ],
    primaryLabel: "Открыть подбор по небулайзерам",
    primaryHref: "./landing-nebulizer-kid.html",
    secondaryLabel: "Смотреть категорию",
    secondaryHref: "./category-nebulizers.html"
  },
  recirculator_room: {
    title: "Рециркулятор под квартиру, детскую или кабинет",
    text:
      "Когда человек выбирает рециркулятор, ему важны площадь помещения, уровень шума и формат размещения. Поэтому полезнее сразу показать подходящий сценарий под комнату, а не только перечень технических параметров.",
    bullets: [
      "Подбор по площади и бытовому формату помещения",
      "Сравнение сценариев для квартиры, детской и кабинета",
      "Переход к карточке товара и категории"
    ],
    primaryLabel: "Открыть подбор по рециркуляторам",
    primaryHref: "./landing-recirculator-home.html",
    secondaryLabel: "Смотреть категорию",
    secondaryHref: "./category-recirculators.html"
  },
  pulseoximeter_parent: {
    title: "Пульсоксиметр или тонометр для дома и родителей",
    text:
      "Если прибор нужен для ежедневного домашнего контроля, на первый план выходят простота использования, читаемость экрана и понятность для пожилого пользователя. Здесь нужна ветка с акцентом на удобство, а не на перегруз функциями.",
    bullets: [
      "Сценарий под семью и пожилых пользователей",
      "Узкая посадочная под домашний контроль показателей",
      "Быстрый переход к сравнению и консультации"
    ],
    primaryLabel: "Открыть подбор по домашнему контролю",
    primaryHref: "./landing-pulseoximeter-home.html",
    secondaryLabel: "Смотреть категорию",
    secondaryHref: "./category-monitoring.html"
  },
  home_care_kit: {
    title: "Комплект для домашнего ухода и восстановления",
    text:
      "Если задача связана с уходом после операции, за пожилым родственником или при длительном домашнем использовании, человеку часто нужен не один товар, а связка решений. Значит, маршрут должен вести в комплексную ветку ухода.",
    bullets: [
      "Подбор не одного товара, а решения под ситуацию",
      "Маршрут к посадочной по уходу и восстановлению",
      "Сравнение сценариев после операции и для длительного ухода"
    ],
    primaryLabel: "Открыть подбор по домашнему уходу",
    primaryHref: "./landing-med-bed-home.html",
    secondaryLabel: "Смотреть категорию",
    secondaryHref: "./category-home-care.html"
  }
};

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
        "<strong>Нужно заполнить все поля.</strong><p>Имя, контакт и короткое описание задачи нужны, чтобы быстро вернуть человеку правильный маршрут и не задавать лишние уточнения.</p>"
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
