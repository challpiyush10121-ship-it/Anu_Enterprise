// Scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
  console.log("Anu Enterprise site loaded with scroll animations");
});

// Particle effect in hero
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero-particles");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const particleCount = 80;
  const goldColors = [
    'rgba(255, 215, 0, ',     // Gold
    'rgba(255, 223, 0, ',     // Bright gold
    'rgba(218, 165, 32, ',    // Goldenrod
    'rgba(184, 134, 11, ',    // Dark goldenrod
    'rgba(255, 248, 220, '    // Cornsilk
  ];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.9 + 0.1,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      pulse: Math.random() * 0.02 + 0.01,
      pulseDirection: Math.random() > 0.5 ? 1 : -1
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      // Pulsing effect
      p.alpha += p.pulse * p.pulseDirection;
      if (p.alpha >= 1 || p.alpha <= 0.1) p.pulseDirection *= -1;
      
      // Draw particle with glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      
      // Create gradient for luxury effect
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, p.color + (p.alpha * 0.8) + ')');
      gradient.addColorStop(1, p.color + '0)');
      
      ctx.fillStyle = gradient;
      
      // Enhanced glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = p.color + '0.6)';
      
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off edges with some randomness
      if (p.x < 0 || p.x > canvas.width) {
        p.speedX *= -1;
        p.speedX += (Math.random() - 0.5) * 0.1;
      }
      if (p.y < 0 || p.y > canvas.height) {
        p.speedY *= -1;
        p.speedY += (Math.random() - 0.5) * 0.1;
      }
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});

// Electric circuit background animation for services section
document.addEventListener("DOMContentLoaded", () => {
  const circuitCanvas = document.getElementById("circuit-canvas");
  if (!circuitCanvas) return;
  
  const ctx = circuitCanvas.getContext("2d");
  const servicesSection = document.getElementById("services");
  
  function resizeCircuitCanvas() {
    circuitCanvas.width = servicesSection.offsetWidth;
    circuitCanvas.height = servicesSection.offsetHeight;
  }
  resizeCircuitCanvas();
  window.addEventListener("resize", resizeCircuitCanvas);
  
  // Circuit paths - like PCB traces
  const circuits = [
    // Horizontal traces
    { x1: 50, y1: 100, x2: 300, y2: 100, glowPhase: 0, glowSpeed: 0.02 },
    { x1: 400, y1: 150, x2: 700, y2: 150, glowPhase: Math.PI, glowSpeed: 0.015 },
    { x1: 100, y1: 250, x2: 500, y2: 250, glowPhase: Math.PI/2, glowSpeed: 0.025 },
    // Vertical traces
    { x1: 200, y1: 50, x2: 200, y2: 200, glowPhase: Math.PI/3, glowSpeed: 0.018 },
    { x1: 600, y1: 80, x2: 600, y2: 280, glowPhase: Math.PI*1.5, glowSpeed: 0.022 },
    // Diagonal traces
    { x1: 50, y1: 300, x2: 250, y2: 200, glowPhase: Math.PI/4, glowSpeed: 0.02 },
    { x1: 500, y1: 50, x2: 700, y2: 180, glowPhase: Math.PI*0.8, glowSpeed: 0.016 }
  ];
  
  // Circuit nodes (connection points)
  const nodes = [
    { x: 200, y: 100, radius: 4, glowIntensity: 0 },
    { x: 600, y: 150, radius: 4, glowIntensity: 0 },
    { x: 300, y: 250, radius: 4, glowIntensity: 0 },
    { x: 500, y: 150, radius: 4, glowIntensity: 0 }
  ];
  
  function animateCircuits() {
    ctx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
    
    // Draw circuit traces
    circuits.forEach((circuit, index) => {
      // Update glow phase
      circuit.glowPhase += circuit.glowSpeed;
      const glowIntensity = (Math.sin(circuit.glowPhase) + 1) / 2;
      
      // Set circuit trace style
      ctx.strokeStyle = `rgba(255, 215, 0, ${0.3 + glowIntensity * 0.5})`;
      ctx.lineWidth = 2 + glowIntensity * 2;
      ctx.shadowBlur = 10 + glowIntensity * 15;
      ctx.shadowColor = "rgba(255, 215, 0, 0.6)";
      
      // Draw the trace
      ctx.beginPath();
      ctx.moveTo(circuit.x1, circuit.y1);
      ctx.lineTo(circuit.x2, circuit.y2);
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    });
    
    // Draw circuit nodes
    nodes.forEach((node, index) => {
      // Update node glow
      node.glowIntensity = (Math.sin(Date.now() * 0.003 + index * 0.5) + 1) / 2;
      
      // Draw node
      ctx.fillStyle = `rgba(255, 215, 0, ${0.6 + node.glowIntensity * 0.4})`;
      ctx.shadowBlur = 8 + node.glowIntensity * 12;
      ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + node.glowIntensity * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    });
    
    requestAnimationFrame(animateCircuits);
  }
  
  animateCircuits();
});

// Custom cursor with hover effects and spark trail
const cursor = document.querySelector(".custom-cursor");
const sparks = [];
const maxSparks = 15;

// Spark trail effect
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
  
  // Create new spark
  const spark = document.createElement("div");
  spark.className = "spark";
  spark.style.left = e.clientX + "px";
  spark.style.top = e.clientY + "px";
  spark.style.position = "fixed";
  spark.style.width = "4px";
  spark.style.height = "4px";
  spark.style.background = "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0) 70%)";
  spark.style.borderRadius = "50%";
  spark.style.pointerEvents = "none";
  spark.style.zIndex = "9998";
  spark.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.6)";
  spark.style.animation = "sparkFade 0.8s ease-out forwards";
  
  document.body.appendChild(spark);
  sparks.push(spark);
  
  // Remove old sparks
  if (sparks.length > maxSparks) {
    const oldSpark = sparks.shift();
    if (oldSpark && oldSpark.parentNode) {
      oldSpark.parentNode.removeChild(oldSpark);
    }
  }
  
  // Remove spark after animation
  setTimeout(() => {
    if (spark && spark.parentNode) {
      spark.parentNode.removeChild(spark);
      const index = sparks.indexOf(spark);
      if (index > -1) sparks.splice(index, 1);
    }
  }, 800);
});

// Add hover detection for interactive elements
document.querySelectorAll('a, .card, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});
