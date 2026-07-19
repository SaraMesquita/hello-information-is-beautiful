"use strict";

const waveText = document.querySelector(".beautiful-wave");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (waveText && !prefersReducedMotion.matches) {
  const duration = 3000;
  const delay = 450;

  const numberOfPoints = 18;
  const waveAmplitude = 3.2;
  const waveFrequency = 2.3;

  let animationStart = null;

  /**
   * Keeps a number within a defined range.
   */
  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  /**
   * Smooth easing:
   * starts gently, accelerates, then slows toward the end.
   */
  function easeInOutCubic(value) {
    if (value < 0.5) {
      return 4 * value * value * value;
    }

    return 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  /**
   * Creates the polygon used to reveal the coloured text.
   *
   * The right-hand edge is made from several points with
   * slightly different horizontal positions, producing an
   * organic wave rather than a straight vertical wipe.
   */
  function createWavePolygon(progress, elapsedTime) {
    const points = ["0% 0%"];

    for (let index = 0; index <= numberOfPoints; index += 1) {
      const verticalPosition =
        (index / numberOfPoints) * 100;

      const phase =
        index * 0.72 +
        elapsedTime * 0.004 * waveFrequency;

      const primaryWave =
        Math.sin(phase) * waveAmplitude;

      const secondaryWave =
        Math.sin(phase * 0.47 + 1.6) *
        waveAmplitude *
        0.45;

      const leadingEdge =
        progress * 118 - 9;

      const horizontalPosition = clamp(
        leadingEdge + primaryWave + secondaryWave,
        -12,
        112
      );

      points.push(
        `${horizontalPosition.toFixed(2)}% ` +
        `${verticalPosition.toFixed(2)}%`
      );
    }

    points.push("0% 100%");

    return `polygon(${points.join(", ")})`;
  }

  function animateWave(timestamp) {
    if (animationStart === null) {
      animationStart = timestamp;
    }

    const elapsedTime = timestamp - animationStart;
    const animationTime = elapsedTime - delay;

    if (animationTime < 0) {
      waveText.style.setProperty(
        "--wave-progress",
        "0"
      );

      requestAnimationFrame(animateWave);
      return;
    }

    const rawProgress = clamp(
      animationTime / duration,
      0,
      1
    );

    const easedProgress =
      easeInOutCubic(rawProgress);

    const polygon = createWavePolygon(
      easedProgress,
      animationTime
    );

    waveText.style.setProperty(
      "--wave-progress",
      easedProgress.toString()
    );

    waveText.style.setProperty(
      "--wave-polygon",
      polygon
    );

    /*
      Pseudo-elements cannot be selected directly in JavaScript,
      so the polygon is passed through a CSS custom property.
    */

    if (rawProgress < 1) {
      requestAnimationFrame(animateWave);
    }
  }

  requestAnimationFrame(animateWave);
}
