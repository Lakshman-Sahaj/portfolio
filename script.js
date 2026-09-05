document.getElementById("year").textContent =
  new Date().getFullYear();

const siteShell =
  document.getElementById("siteShell");

const projectPage =
  document.getElementById("projectPage");

const projectBack =
  document.getElementById("projectBack");

const projectPageIndex =
  document.getElementById("projectPageIndex");

const projectPageTitle =
  document.getElementById("projectPageTitle");

const projectPageCategory =
  document.getElementById("projectPageCategory");

document
  .querySelectorAll(".project-row")
  .forEach((project) => {

    project.addEventListener(
      "click",
      () => {

        projectPageIndex.textContent =
          project.dataset.project;

        projectPageTitle.textContent =
          project.dataset.title;

        projectPageCategory.textContent =
          project.dataset.category.toUpperCase();

        siteShell.classList.add("project-open");

        projectPage.classList.add("open");

        projectPage.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.style.overflow =
          "hidden";

        projectPage.scrollTop = 0;

      }
    );

  });

function closeProject() {

  siteShell.classList.remove(
    "project-open"
  );

  projectPage.classList.remove(
    "open"
  );

  projectPage.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}

projectBack.addEventListener(
  "click",
  closeProject
);

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      projectPage.classList.contains("open")
    ) {
      closeProject();
    }

  }
);
