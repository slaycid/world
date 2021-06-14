let canvas = document.getElementById("scene");
let ctx = canvas.getContext("2d");
let particles = [];

function drawScene() {
  particles = [];
  canvas.width = png.width*6;
  canvas.height = png.height*6;

  ctx.drawImage(png, 0, 0);

  const data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "white";
  
  for (let y = 0, y2 = data.height; y < y2; y++) {
    for (let x = 0, x2 = data.width; x < x2; x++) {
      if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
        const particle = {
          x0: x,
          y0: y,
          x1: png.width / 2,
          y1: png.height / 2,
          speed: Math.random() * 4 + 2
        };
        gsap.to(particle, {
          duration: particle.speed,
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 30,
          ease: Elastic.easeOut
        });
        particles.push(particle);
      }
    }
  }

  requestAnimationFrame(render);
}
const render = function() {
  requestAnimationFrame(render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0, j = particles.length; i < j; i++) {
    const particle = particles[i];
    ctx.fillRect(particle.x1 * 6, particle.y1 * 6, 3,3);
  }
};

const png = new Image();
png.onload = () => {
  drawScene();
  window.addEventListener('click', drawScene);
};
png.src = "data:image/png;base64,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";
