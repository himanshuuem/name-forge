document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = "Copied ✓";
  } catch {
    button.textContent = "Copy failed";
  }
  setTimeout(() => { button.textContent = original; }, 1400);
});

// Auto-submit when a different type is picked, for a snappier feel (the button still works without JS).
document.querySelector(".types")?.addEventListener("change", (event) => event.target.form.submit());
