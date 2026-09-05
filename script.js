document.getElementById("year").textContent =
  new Date().getFullYear();

/*
  Prevent placeholder projects from
  jumping to the top of the page.
*/
document
  .querySelectorAll(".project-row.coming")
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
      }
    );

  });
