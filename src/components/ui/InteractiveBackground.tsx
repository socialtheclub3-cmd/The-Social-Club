import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number, isDark: boolean) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    
    // Theme colors: Lavender, Pink, Orange, Mint
    const colors = isDark 
      ? ['rgba(167, 139, 250, 0.6)', 'rgba(255, 143, 177, 0.6)', 'rgba(126, 214, 183, 0.6)'] 
      : ['rgba(167, 139, 250, 0.8)', 'rgba(255, 138, 61, 0.8)', 'rgba(126, 214, 183, 0.8)'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouse: { x: number; y: number; radius: number }) {
    // Collision with mouse (repel effect)
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;
      const directionX = forceDirectionX * force * 3;
      const directionY = forceDirectionY * force * 3;
      this.x -= directionX;
      this.y -= directionY;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    // Bounce off edges
    if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lang } = useApp();
  // We use dark mode detection from classList since context doesn't expose it directly in useApp (unless added)
  // Actually, let's just read document element class
  const isDark = document.documentElement.classList.contains('dark');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Do not run on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height, isDark));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = 
            ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            
            // Re-check theme on each frame for the lines
            const currentIsDark = document.documentElement.classList.contains('dark');
            ctx.strokeStyle = currentIsDark 
              ? `rgba(255, 255, 255, ${opacityValue * 0.08})` 
              : `rgba(0, 0, 0, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouse);
        particlesArray[i].draw(ctx);
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Watch for theme changes to re-init particles with correct colors
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          init();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [lang, isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-70"
    />
  );
};

export default InteractiveBackground;
