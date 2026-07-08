const defaultB2bData = {
  managerPhoneDisplay: "+7 (495) 000-00-01",
  managerPhoneHref: "tel:+74950000001",
  b2bEmailDisplay: "b2b@medtehmaks.ru",
  b2bEmailHref: "mailto:b2b@medtehmaks.ru",
  accountingEmailDisplay: "buh@medtehmaks.ru",
  accountingEmailHref: "mailto:buh@medtehmaks.ru",
  whatsappHref: "https://wa.me/74950000001",
  telegramHref: "https://t.me/medtehmaks_b2b",
  legalName: "Наталья Александровна Максимова",
  inn: "525903934776",
  edoOperator: "Указать оператора ЭДО",
  edoIdentifier: "Указать идентификатор участника ЭДО",
  nds: "работаем с НДС",
  responseTimeB2B: "до 1 рабочего дня",
  freeDeliveryThreshold: "от 150 000 ₽",
  regionsServed: "по России и СНГ"
};

const externalB2bConfig =
  (window.MEDTEHMAKS_SITE_CONFIG && window.MEDTEHMAKS_SITE_CONFIG.b2bData) || {};
const b2bData = { ...defaultB2bData, ...externalB2bConfig };

function hydrateB2bPhones() {
  document.querySelectorAll("[data-b2b-phone]").forEach((link) => {
    link.setAttribute("href", b2bData.managerPhoneHref);
    if (/\+7\s*\(495\)/.test(link.textContent)) {
      link.textContent = b2bData.managerPhoneDisplay;
    }
  });
}

function hydrateB2bEmails() {
  document.querySelectorAll("[data-b2b-email]").forEach((link) => {
    link.setAttribute("href", b2bData.b2bEmailHref);
    link.textContent = b2bData.b2bEmailDisplay;
  });

  document.querySelectorAll("[data-b2b-accounting-email]").forEach((link) => {
    link.setAttribute("href", b2bData.accountingEmailHref);
    link.textContent = b2bData.accountingEmailDisplay;
  });
}

function hydrateB2bMessengers() {
  document.querySelectorAll('#b2b-contacts a, .messenger-row a, .link-chip-row a').forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes("whatsapp")) {
      link.setAttribute("href", b2bData.whatsappHref);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    }
    if (text.includes("telegram")) {
      link.setAttribute("href", b2bData.telegramHref);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    }
  });
}

function hydrateB2bTextTokens() {
  document.querySelectorAll("[data-nds]").forEach((node) => {
    node.textContent = b2bData.nds;
  });
  document.querySelectorAll("[data-response-time-b2b]").forEach((node) => {
    node.textContent = b2bData.responseTimeB2B;
  });
  document.querySelectorAll("[data-free-delivery-threshold]").forEach((node) => {
    node.textContent = b2bData.freeDeliveryThreshold;
  });
  document.querySelectorAll("[data-regions-served]").forEach((node) => {
    node.textContent = b2bData.regionsServed;
  });
}

hydrateB2bPhones();
hydrateB2bEmails();
hydrateB2bMessengers();
hydrateB2bTextTokens();
