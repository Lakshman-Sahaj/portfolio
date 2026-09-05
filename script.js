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

const projectCaseStudy =
  document.getElementById("projectCaseStudy");

const projectPlaceholderCanvas =
  document.getElementById("projectPlaceholderCanvas");

const placeholderTitle =
  document.getElementById("placeholderTitle");

const placeholderCategory =
  document.getElementById("placeholderCategory");


document
  .querySelectorAll(".project-row")
  .forEach((project) => {

    project.addEventListener("click", () => {

      const projectNumber =
        project.dataset.project;

      const isAircraftProject =
        projectNumber === "01";


      projectPageIndex.textContent =
        projectNumber;


      if (isAircraftProject) {

        projectCaseStudy.hidden =
          false;

        projectPlaceholderCanvas.hidden =
          true;

        projectPageTitle.textContent =
          project.dataset.title;

        projectPageCategory.textContent =
          project.dataset.category.toUpperCase();

      } else {

        projectCaseStudy.hidden =
          true;

        projectPlaceholderCanvas.hidden =
          false;

        placeholderTitle.textContent =
          project.dataset.title;

        placeholderCategory.textContent =
          project.dataset.category.toUpperCase();

      }


      siteShell.classList.add(
        "project-open"
      );

      projectPage.classList.add(
        "open"
      );

      projectPage.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

      projectPage.scrollTop = 0;

    });

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
