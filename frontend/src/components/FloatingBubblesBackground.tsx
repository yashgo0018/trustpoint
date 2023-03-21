import React, { useEffect, useRef } from "react";

function randomFromRange(a: number, b: number) {
  return a + Math.floor(Math.random() * (b - a));
}

function randomFromArray(arr: any[]) {
  return arr[randomFromRange(0, arr.length)];
}

function getRandomThematicColor() {
  return randomFromArray([
    "#009900",
    "#009966",
    "#009949",
    "#00998c",
    "#006633",
    "#006626",
    "#006659",
    "#00663c",
    "#003300",
    "#003333",
    "#003346",
    "#003349",
    "#00338c",
    "#00332f",
    "#00cc9c",
  ]);
}

const bubbleCount = 24;
const velocityRange = [1.75, 2.5];
const sizeRange = [200, 400];

export default function FloatingBubblesBackground() {
  const canvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    let ctx = canvas.current.getContext("2d") as CanvasRenderingContext2D;
    canvas.current.width = canvas.current.offsetWidth;
    canvas.current.height = canvas.current.offsetHeight;

    let bubbles: Bubble[] = [];

    const [canvasWidth, canvasHeight] = [
      canvas.current.width,
      canvas.current.height,
    ];

    class Bubble {
      constructor(
        public x: number = 0,
        public y: number = 0,
        public vx: number = velocityRange[0],
        public vy: number = velocityRange[0],
        public size: number = sizeRange[0],
        public color: string = "#aaff33"
      ) {}

      update() {
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        this.update();
        ctx.beginPath();
        ctx.arc(
          this.x - this.size / 2,
          this.y - this.size / 2,
          this.size / 2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < bubbleCount; i++) {
        const newBubble = new Bubble(
          randomFromRange(0, canvasWidth),
          randomFromRange(0, canvasHeight),
          randomFromArray([-1, 1]) *
            randomFromRange(velocityRange[0], velocityRange[1]),
          randomFromArray([-1, 1]) *
            randomFromRange(velocityRange[0], velocityRange[1]),
          randomFromRange(sizeRange[0], sizeRange[1]),
          getRandomThematicColor()
        );

        bubbles.push(newBubble);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let b of bubbles) {
        b.draw();
        if (b.x <= 0 && b.vx <= 0) {
          b.vx = randomFromRange(velocityRange[0], velocityRange[1]);
        }
        if (b.x >= canvasWidth && b.vx >= 0) {
          b.vx = -1 * randomFromRange(velocityRange[0], velocityRange[1]);
        }
        if (b.y <= 0 && b.vy <= 0) {
          b.vy = randomFromRange(velocityRange[0], velocityRange[1]);
        }
        if (b.y >= canvasHeight && b.vy >= 0) {
          b.vy = -1 * randomFromRange(velocityRange[0], velocityRange[1]);
        }
      }

      window.requestAnimationFrame(draw);
    }

    init();
    draw();
  }, []);

  return <canvas ref={canvas} className="w-full h-full" />;
}
