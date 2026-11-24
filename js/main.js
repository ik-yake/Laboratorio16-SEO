"use strict";
(() => {
  const menu = document.querySelector("#menu");
  const nav = document.querySelector("#nav");
  function setMenu(open) {
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  }
  if (menu && nav) {
    menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menu.focus();
      }
    });
  }
  const form = document.querySelector("#inquiry");
  if (!form) return;
  const fields = form.elements;
  const status = document.querySelector("#form-status");
  const controls = Array.from(form.querySelectorAll("input,select,textarea"));
  const properties = window.urbanProperties || [];
  properties.forEach(({slug, name}) => fields.propiedad.add(new Option(name, slug)));
  const selected = new URLSearchParams(location.search).get("propiedad");
  if (properties.some(property => property.slug === selected)) {
    fields.motivo.value = "propiedad";
    fields.propiedad.value = selected;
  }
  function updateRequirement() {
    fields.propiedad.required = ["visita", "propiedad"].includes(fields.motivo.value);
    document.querySelector("#property-hint").textContent = fields.propiedad.required ? "(obligatoria)" : "(opcional)";
  }
  updateRequirement();
  function errorFor(field) {
    const value = field.value.trim();
    if (field.name === "acepto") return field.checked ? "" : "Acepta la política de privacidad para continuar.";
    if (field.required && !value) return "Completa este campo.";
    if (field.name === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Escribe un correo como nombre@ejemplo.com.";
    if (field.name === "telefono" && (!/^\+?[\d\s()-]+$/.test(value) || !/^\d{7,15}$/.test(value.replace(/\D/g, "")))) return "Escribe un teléfono de 7 a 15 dígitos. Puedes incluir el prefijo del país.";
    return "";
  }
  function validate(field) {
    const message = errorFor(field);
    field.setAttribute("aria-invalid", String(Boolean(message)));
    document.getElementById(field.name + "-error").textContent = message;
    return !message;
  }
  controls.forEach(field => {
    const error = document.createElement("small");
    error.className = "field-error";
    error.id = field.name + "-error";
    field.setAttribute("aria-describedby", error.id);
    field.closest("label").append(error);
  });
  form.addEventListener("input", event => {
    status.textContent = "";
    if (event.target.getAttribute("aria-invalid") === "true") validate(event.target);
  });
  fields.motivo.addEventListener("change", () => {
    updateRequirement();
    if (fields.propiedad.getAttribute("aria-invalid") === "true") validate(fields.propiedad);
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const invalid = controls.filter(field => !validate(field));
    if (invalid.length) {
      status.textContent = "Revisa los campos indicados.";
      invalid[0].focus();
      return;
    }
    status.textContent = "Consulta validada. La demostración ha finalizado. No se ha enviado ningún mensaje.";
  });
  form.querySelector('[type="submit"]').disabled = false;
})();if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    }
  });
  document.querySelectorAll(".section").forEach(section => observer.observe(section));
}
