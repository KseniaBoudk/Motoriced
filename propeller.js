// Click the propeller: it winds up, spins at full speed for a moment,
// then coasts to a stop. Clicking again while it spins keeps it going.

const propeller = document.querySelector(".propeller");

if (propeller) {
    const MAX_SPEED = 1440;   // degrees per second at full spin (4 turns/s)
    const SPIN_UP = 0.9;      // seconds to reach full speed
    const HOLD = 1.2;         // seconds at full speed
    const FRICTION = 1.1;     // how quickly it slows (higher = stops sooner)

    let angle = 0;
    let speed = 0;            // current speed, degrees per second
    let phase = "idle";       // idle | spinup | hold | spindown
    let phaseTime = 0;
    let lastTime = 0;

    function setPhase(next) {
        phase = next;
        phaseTime = 0;
    }

    function frame(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        phaseTime += dt;

        if (phase === "spinup") {
            // ease-in: starts slowly, then the motor catches
            const t = Math.min(phaseTime / SPIN_UP, 1);
            speed = Math.max(speed, MAX_SPEED * t * t);
            if (t >= 1) setPhase("hold");
        } else if (phase === "hold") {
            speed = MAX_SPEED;
            if (phaseTime >= HOLD) setPhase("spindown");
        } else if (phase === "spindown") {
            // drag (proportional to speed) plus a little constant friction
            speed -= (speed * FRICTION + 40) * dt;
            if (speed <= 0) {
                speed = 0;
                setPhase("idle");
            }
        }

        angle = (angle + speed * dt) % 360;
        const blur = (speed / MAX_SPEED) * 1.5;
        propeller.style.transform = `rotate(${angle}deg)`;
        propeller.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";

        if (phase !== "idle") requestAnimationFrame(frame);
    }

    propeller.addEventListener("click", () => {
        if (phase === "idle") {
            setPhase("spinup");
            lastTime = performance.now();
            requestAnimationFrame(frame);
        } else if (phase === "spindown") {
            setPhase("spinup");   // picks up from its current speed
        } else if (phase === "hold") {
            phaseTime = 0;        // keep it at full speed a bit longer
        }
    });
}
