import canvasSketch from "canvas-sketch";
import { useEffect, useRef } from "react";
import { random } from "canvas-sketch-util";

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class AgentDot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 5);
    context.fill();
    context.stroke();
    context.restore();
  }

  bounce(width, height) {
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

const Scketch_06 = () => {
  const settings = {
    dimensions: [2048, 2048],
    animate: true,
  };

  const canvasRef = useRef(null);
  const agentsRef = useRef([]);

  const createDots = (width, height) => {
    const agents = [];

    for (let i = 0; i < 40; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height);

      agents.push(new AgentDot(x, y));
    }
    agentsRef.current = agents;
  };

  useEffect(() => {
    const width = 2048;
    const height = 2048;

    createDots(width, height);

    const sketch = () => {
      return ({ context, width, height }) => {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);

        agentsRef.current.forEach((agent) => {
          agent.update();
          agent.draw(context);
          agent.bounce(width, height);
        });
      };
    };

    canvasSketch(sketch, {
      ...settings,
      canvas: canvasRef.current,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};
export default Scketch_06;
