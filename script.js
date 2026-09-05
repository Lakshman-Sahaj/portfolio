document.getElementById("year").textContent =
  new Date().getFullYear();

const projectPanel =
  document.getElementById("projectPanel");

const projectBack =
  document.getElementById("projectBack");

const panelNumber =
  document.getElementById("panelNumber");

const panelTitle =
  document.getElementById("panelTitle");

const panelCategory =
  document.getElementById("panelCategory");

document
  .querySelectorAll(".project-row")
  .forEach((project) => {
    project.addEventListener("click", () => {
      panelNumber.textContent =
        project.dataset.project;

      panelTitle.textContent =
        project.dataset.title;

      panelCategory.textContent =
        project.dataset.category.toUpperCase();

      projectPanel.classList.add("open");

      document.body.style.overflow =
        "hidden";
    });
  });

projectBack.addEventListener(
  "click",
  () => {
    projectPanel.classList.remove("open");

    document.body.style.overflow =
      "";
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      projectPanel.classList.remove("open");

      document.body.style.overflow =
        "";
    }
  }
);
