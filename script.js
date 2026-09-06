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
  document.getElementById("rocketExhaust");

const exhaustContext =
  rocketExhaust?.getContext("2d");

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

const trailPoints = [];

const trailLifetime = 2400;

function sizeExhaustCanvas() {

  if (!rocketExhaust || !exhaustContext) return;

  const pixelRatio =
    Math.min(window.devicePixelRatio || 1, 2);

  rocketExhaust.width =
    Math.round(window.innerWidth * pixelRatio);
  rocketExhaust.height =
    Math.round(window.innerHeight * pixelRatio);

  exhaustContext.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

}

function addTrailPath(startX, startY, endX, endY) {

  const distance =
    Math.hypot(endX - startX, endY - startY);

  const steps =
    Math.max(Math.ceil(distance / 4), 1);

  const createdAt = performance.now();

  for (let step = 1; step <= steps; step += 1) {
    const progress = step / steps;

    trailPoints.unshift({
      x: startX + (endX - startX) * progress,
      y: startY + (endY - startY) * progress,
      createdAt,
      speed: Math.min(distance / 30, 1)
    });
  }

  trailPoints.length =
    Math.min(trailPoints.length, 520);

}


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

}


cursorChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    setCursorMode(choice.dataset.cursor);
  });
});


if (
  cursorDot &&
  cursorRing &&
  rocketCursor &&
  rocketExhaust &&
  exhaustContext
) {

  setCursorMode(selectedCursor, false);
  sizeExhaustCanvas();


  document.addEventListener(
    "mousemove",
    (event) => {

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      pointerSpeed = Math.max(
        pointerSpeed,
        Math.min(Math.hypot(deltaX, deltaY), 48)
      );

      if (
        pointerStarted &&
        Math.abs(deltaX) + Math.abs(deltaY) > 2
      ) {
        rocketAngle =
          Math.atan2(deltaY, deltaX);

        rocketCursor.style.transform =
          `translate(-50%, -50%) rotate(${rocketAngle * 180 / Math.PI}deg)`;

        const directionX = Math.cos(rocketAngle);
        const directionY = Math.sin(rocketAngle);
        const nozzleX = event.clientX - directionX * 12;
        const nozzleY = event.clientY - directionY * 12;

        const previousPoint =
          trailPoints[0] || {
            x: mouseX - directionX * 12,
            y: mouseY - directionY * 12
          };

        addTrailPath(
          previousPoint.x,
          previousPoint.y,
          nozzleX,
          nozzleY
        );
      }

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      rocketCursor.style.left = `${mouseX}px`;
      rocketCursor.style.top = `${mouseY}px`;

      if (!pointerStarted) {
        pointerStarted = true;
        ringX = mouseX;
        ringY = mouseY;

        trailPoints.unshift({
          x: mouseX,
          y: mouseY,
          createdAt: performance.now(),
          speed: 0
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

      pointerSpeed *= 0.88;

      const speedRatio =
        Math.min(pointerSpeed / 28, 1);

      document.body.style.setProperty(
        "--rocket-glow",
        `${3 + speedRatio * 5}px`
      );

      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      const now = performance.now();

      exhaustContext.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      while (
        trailPoints.length &&
        now - trailPoints[trailPoints.length - 1].createdAt >
          trailLifetime
      ) {
        trailPoints.pop();
      }

      if (activeCursor === "rocket") {
        exhaustContext.lineCap = "round";
        exhaustContext.lineJoin = "round";

        for (
          let index = trailPoints.length - 1;
          index > 0;
          index -= 1
        ) {
          const older = trailPoints[index];
          const newer = trailPoints[index - 1];
          const age = now - newer.createdAt;
          const fade = Math.max(1 - age / trailLifetime, 0);
          const proximity = 1 - index / trailPoints.length;
          const baseWidth =
            1.2 + Math.pow(proximity, 2.2) * 10.8;

          exhaustContext.beginPath();
          exhaustContext.moveTo(older.x, older.y);
          exhaustContext.lineTo(newer.x, newer.y);
          exhaustContext.lineWidth = baseWidth;
          exhaustContext.strokeStyle =
            `rgba(214, 238, 71, ${fade * (0.2 + proximity * 0.68)})`;
          exhaustContext.shadowColor =
            `rgba(214, 238, 71, ${fade * 0.55})`;
          exhaustContext.shadowBlur = 3 + proximity * 8;
          exhaustContext.stroke();
        }
      }

    }

    requestAnimationFrame(animateCursor);

  }


  animateCursor();

  finePointerQuery.addEventListener("change", () => {
    setCursorMode(selectedCursor, false);
  });

  window.addEventListener("resize", sizeExhaustCanvas);

}
