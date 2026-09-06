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


/* PROJECT NAVIGATION */

document
  .querySelectorAll(".project-row")
  .forEach((project) => {

    project.addEventListener(
      "click",
      () => {

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

        projectPage.scrollTop =
          0;

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


/* CUSTOM DESKTOP CURSOR */

const cursorDot =
  document.getElementById("cursorDot");

const cursorRing =
  document.getElementById("cursorRing");

const rocketCursor =
  document.getElementById("rocketCursor");

const rocketExhaust =
  Array.from(
    document.querySelectorAll("#rocketExhaust span")
  );

const cursorChoices =
  Array.from(
    document.querySelectorAll(".cursor-choice")
  );

const cursorModes =
  ["orbit", "rocket", "native"];

const finePointerQuery =
  window.matchMedia("(pointer: fine)");

let selectedCursor = "orbit";

try {

  const savedCursor =
    window.localStorage.getItem("portfolio-cursor");

  if (savedCursor === "comet") {
    selectedCursor = "rocket";
  } else if (cursorModes.includes(savedCursor)) {
    selectedCursor = savedCursor;
  }

} catch (error) {
  selectedCursor = "orbit";
}

let activeCursor = "native";
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
let pointerStarted = false;
let pointerSpeed = 0;
let rocketAngle = 0;
let lastMoveTime = 0;
let trailEnergy = 0;

const dustPositions =
  rocketExhaust.map((element, index) => ({
    x: 0,
    y: 0,
    lane: (index % 5 - 2) / 2
  }));

function setCursorMode(mode, saveChoice = true) {

  const requestedMode =
    cursorModes.includes(mode) ? mode : "orbit";

  selectedCursor = requestedMode;
  activeCursor =
    finePointerQuery.matches ? requestedMode : "native";

  document.body.classList.remove(
    "cursor-mode-orbit",
    "cursor-mode-rocket",
    "cursor-mode-native",
    "cursor-active"
  );

  document.body.classList.add(
    `cursor-mode-${activeCursor}`
  );

  document.documentElement.classList.toggle(
    "custom-cursor-enabled",
    activeCursor !== "native"
  );

  cursorChoices.forEach((choice) => {
    choice.setAttribute(
      "aria-pressed",
      String(choice.dataset.cursor === selectedCursor)
    );
  });

  if (
    pointerStarted &&
    activeCursor !== "native"
  ) {
    document.body.classList.add("cursor-active");
  }

  if (saveChoice) {
    try {
      window.localStorage.setItem(
        "portfolio-cursor",
        selectedCursor
      );
    } catch (error) {
      // The cursor still works when storage is unavailable.
    }
  }

  if (activeCursor !== "rocket") {
    rocketExhaust.forEach((particle) => {
      particle.style.opacity = "0";
    });
  }

}


cursorChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    setCursorMode(choice.dataset.cursor);
  });
});


if (
  cursorDot &&
  cursorRing &&
  rocketCursor
) {

  setCursorMode(selectedCursor, false);


  document.addEventListener(
    "mousemove",
    (event) => {

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      const movementSpeed =
        Math.min(Math.hypot(deltaX, deltaY), 64);

      if (pointerStarted) {
        pointerSpeed = Math.max(
          pointerSpeed,
          movementSpeed
        );

        trailEnergy = Math.max(
          trailEnergy,
          Math.min(movementSpeed / 38, 1)
        );
      }

      lastMoveTime = performance.now();

      if (
        pointerStarted &&
        Math.abs(deltaX) + Math.abs(deltaY) > 2
      ) {
        rocketAngle =
          Math.atan2(deltaY, deltaX);

        rocketCursor.style.transform =
          `translate(-50%, -50%) rotate(${rocketAngle * 180 / Math.PI}deg)`;

      }

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (
        pointerStarted &&
        movementSpeed > 2
      ) {

        const actualSpeed =
          Math.max(Math.hypot(deltaX, deltaY), 1);

        const directionX = deltaX / actualSpeed;
        const directionY = deltaY / actualSpeed;

        dustPositions
          .slice(0, 6)
          .forEach((point, index) => {
            const distance = 13 + index * 6;
            point.x = mouseX - directionX * distance;
            point.y = mouseY - directionY * distance;
          });

      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      rocketCursor.style.left = `${mouseX}px`;
      rocketCursor.style.top = `${mouseY}px`;

      if (!pointerStarted) {
        pointerStarted = true;
        ringX = mouseX;
        ringY = mouseY;

        dustPositions.forEach((point) => {
          point.x = mouseX;
          point.y = mouseY;
        });
      }

      if (activeCursor !== "native") {
        document.body.classList.add("cursor-active");
      }

    }
  );


  document.addEventListener(
    "mouseout",
    (event) => {

      if (!event.relatedTarget) {
        document.body.classList.remove("cursor-active");
      }
    }
  );


  document
    .querySelectorAll("a, button, summary")
    .forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("is-hovering");
        cursorDot.classList.add("is-hovering");
        rocketCursor.classList.add("is-hovering");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("is-hovering");
        cursorDot.classList.remove("is-hovering");
        rocketCursor.classList.remove("is-hovering");
      });

    }
  );


  function animateCursor() {

    if (pointerStarted) {

      pointerSpeed *= 0.9;

      const speedRatio =
        Math.min(pointerSpeed / 28, 1);

      const timeSinceMove =
        performance.now() - lastMoveTime;

      const fadeDuration =
        700 + trailEnergy * 2300;

      const trailFade =
        timeSinceMove <= 120
          ? 1
          : Math.max(
              1 - (timeSinceMove - 120) / fadeDuration,
              0
            );

      const visualPower =
        Math.max(speedRatio, trailEnergy * trailFade);

      const visibleParticles =
        Math.round(8 + visualPower * 20);

      document.body.style.setProperty(
        "--exhaust-strength",
        String(0.82 + visualPower * 0.38)
      );

      document.body.style.setProperty(
        "--rocket-glow",
        `${3 + visualPower * 6}px`
      );

      document.body.style.setProperty(
        "--flame-scale",
        String(0.72 + visualPower * 1.45)
      );

      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      if (timeSinceMove < 200) {

        dustPositions.forEach((point, index) => {

          const target =
            index === 0
              ? { x: mouseX, y: mouseY }
              : dustPositions[index - 1];

          const ease =
            index === 0 ? 0.42 : 0.31;

          point.x += (target.x - point.x) * ease;
          point.y += (target.y - point.y) * ease;

        });

      }

      const sideX = -Math.sin(rocketAngle);
      const sideY = Math.cos(rocketAngle);

      dustPositions.forEach((point, index) => {

        const progress =
          index / Math.max(visibleParticles - 1, 1);

        const taper =
          Math.max(1 - progress, 0);

        const spread =
          point.lane * taper * visualPower * 10;

        const particleSize =
          1.2 + taper * (1.3 + visualPower * 5.8);

        const opacity =
          activeCursor === "rocket" &&
          index < visibleParticles
            ? trailFade * (0.18 + taper * 0.72)
            : 0;

        rocketExhaust[index].style.left =
          `${point.x + sideX * spread}px`;
        rocketExhaust[index].style.top =
          `${point.y + sideY * spread}px`;
        rocketExhaust[index].style.width =
          `${particleSize}px`;
        rocketExhaust[index].style.height =
          `${particleSize}px`;
        rocketExhaust[index].style.opacity =
          String(opacity);
        rocketExhaust[index].style.setProperty(
          "--trail-glow",
          `${2 + taper * visualPower * 8}px`
        );

      });

      if (trailFade === 0) {
        trailEnergy = 0;
      }

    }

    requestAnimationFrame(animateCursor);

  }


  animateCursor();

  finePointerQuery.addEventListener("change", () => {
    setCursorMode(selectedCursor, false);
  });

}
