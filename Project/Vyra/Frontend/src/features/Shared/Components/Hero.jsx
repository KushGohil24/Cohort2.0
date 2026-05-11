import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const createParticles = () => {
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${currentOpacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 169, 110, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw(0);

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className='relative overflow-hidden bg-[#0a0a0a] -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ pointerEvents: 'none' }}
      />

      {/* Spotlight gradient behind centerpiece */}
      <div className='absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full'
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, rgba(201,169,110,0.02) 40%, transparent 70%)',
        }}
      />

      <div className='flex flex-col lg:flex-row min-h-[85vh] items-center relative z-10'>
        {/* Hero Left — Editorial Text */}
        <div className='w-full lg:w-1/2 flex items-center justify-center py-16 lg:py-0 px-8 sm:px-16 lg:px-24'>
          <div className='text-center lg:text-left max-w-lg'>
            {/* Tag */}
            <div className='flex items-center gap-3 justify-center lg:justify-start mb-8 hero-fade-in' style={{ animationDelay: '0.2s' }}>
              <div className='w-12 h-[1px] bg-[#c9a96e]'></div>
              <p className='text-[11px] tracking-[5px] uppercase text-[#c9a96e] font-medium'>Limited Edition 2026</p>
            </div>

            {/* Headline */}
            <h1 className='hero-fade-in' style={{ animationDelay: '0.4s' }}>
              <span className='block text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em]' style={{ fontFamily: 'Playfair Display, serif' }}>
                The Art of
              </span>
              <span className='block text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] mt-2' style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #c9a96e 0%, #e8d5a3 30%, #c9a96e 60%, #a8893e 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 4s ease infinite',
              }}>
                Eternal
              </span>
              <span className='block text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] mt-2' style={{ fontFamily: 'Playfair Display, serif' }}>
                Radiance
              </span>
            </h1>

            {/* Body */}
            <p className='text-[#777] text-[15px] leading-[1.8] mt-8 max-w-md hero-fade-in' style={{ animationDelay: '0.6s', letterSpacing: '0.03em' }}>
              Where centuries of artistry meet modern precision. Each Vyra piece is a testament to the extraordinary — handcrafted for those who seek the exceptional.
            </p>

            {/* CTA */}
            <div className='mt-10 flex items-center gap-6 justify-center lg:justify-start hero-fade-in' style={{ animationDelay: '0.8s' }}>
              <Link to='/collection'>
                <button className='hero-cta-btn group'>
                  <span className='relative z-10'>Explore Collection</span>
                </button>
              </Link>
              <Link to='/about' className='text-[#777] text-xs tracking-[3px] uppercase hover:text-[#c9a96e] transition-colors duration-400'>
                Our Story →
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Right — 3D Diamond Visualization */}
        <div className='w-full lg:w-1/2 h-[50vh] lg:h-[85vh] relative flex items-center justify-center'>
          {/* Outer orbital ring */}
          <div className='absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full border border-[#c9a96e]/10 orbital-ring-1'></div>

          {/* Middle orbital ring */}
          <div className='absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[360px] lg:h-[360px] rounded-full border border-[#c9a96e]/15 orbital-ring-2'></div>

          {/* Inner ring glow */}
          <div className='absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full orbital-ring-3'
            style={{ border: '1px solid rgba(201,169,110,0.25)', boxShadow: '0 0 60px rgba(201,169,110,0.08), inset 0 0 60px rgba(201,169,110,0.05)' }}
          ></div>

          {/* Diamond SVG */}
          <svg className='absolute w-[120px] h-[140px] sm:w-[140px] sm:h-[160px] lg:w-[160px] lg:h-[180px] diamond-float' viewBox='0 0 160 180' fill='none'>
            {/* Diamond top facets */}
            <polygon points='80,8 130,60 80,80' fill='rgba(201,169,110,0.12)' stroke='rgba(201,169,110,0.5)' strokeWidth='0.8' />
            <polygon points='80,8 30,60 80,80' fill='rgba(201,169,110,0.08)' stroke='rgba(201,169,110,0.4)' strokeWidth='0.8' />
            <polygon points='80,8 130,60 155,55' fill='rgba(201,169,110,0.06)' stroke='rgba(201,169,110,0.3)' strokeWidth='0.5' />
            <polygon points='80,8 30,60 5,55' fill='rgba(201,169,110,0.04)' stroke='rgba(201,169,110,0.25)' strokeWidth='0.5' />

            {/* Diamond body - brilliant cut facets */}
            <polygon points='30,60 80,80 80,172' fill='rgba(201,169,110,0.1)' stroke='rgba(201,169,110,0.35)' strokeWidth='0.8' />
            <polygon points='130,60 80,80 80,172' fill='rgba(201,169,110,0.15)' stroke='rgba(201,169,110,0.4)' strokeWidth='0.8' />
            <polygon points='5,55 30,60 80,172' fill='rgba(201,169,110,0.05)' stroke='rgba(201,169,110,0.2)' strokeWidth='0.5' />
            <polygon points='155,55 130,60 80,172' fill='rgba(201,169,110,0.08)' stroke='rgba(201,169,110,0.25)' strokeWidth='0.5' />

            {/* Inner facet lines */}
            <line x1='80' y1='80' x2='55' y2='60' stroke='rgba(201,169,110,0.2)' strokeWidth='0.5' />
            <line x1='80' y1='80' x2='105' y2='60' stroke='rgba(201,169,110,0.2)' strokeWidth='0.5' />
            <line x1='80' y1='80' x2='80' y2='45' stroke='rgba(201,169,110,0.15)' strokeWidth='0.5' />

            {/* Sparkle effects */}
            <circle cx='80' cy='8' r='2' fill='#c9a96e' opacity='0.6'>
              <animate attributeName='opacity' values='0.6;1;0.6' dur='2s' repeatCount='indefinite' />
            </circle>
            <circle cx='155' cy='55' r='1.5' fill='#c9a96e' opacity='0.4'>
              <animate attributeName='opacity' values='0.4;0.8;0.4' dur='2.5s' repeatCount='indefinite' />
            </circle>
            <circle cx='5' cy='55' r='1.5' fill='#c9a96e' opacity='0.3'>
              <animate attributeName='opacity' values='0.3;0.7;0.3' dur='3s' repeatCount='indefinite' />
            </circle>
          </svg>

          {/* Orbiting dots on rings */}
          <div className='absolute w-3 h-3 rounded-full bg-[#c9a96e]/60 orbital-dot-1' style={{ boxShadow: '0 0 12px rgba(201,169,110,0.4)' }}></div>
          <div className='absolute w-2 h-2 rounded-full bg-[#c9a96e]/40 orbital-dot-2' style={{ boxShadow: '0 0 8px rgba(201,169,110,0.3)' }}></div>
          <div className='absolute w-1.5 h-1.5 rounded-full bg-[#c9a96e]/80 orbital-dot-3' style={{ boxShadow: '0 0 6px rgba(201,169,110,0.5)' }}></div>

          {/* Stats / Labels floating */}
          <div className='absolute bottom-20 right-8 sm:right-16 text-right hero-fade-in' style={{ animationDelay: '1s' }}>
            <p className='text-[10px] tracking-[4px] uppercase text-[#c9a96e]/60'>Premium</p>
            <p className='text-white text-2xl mt-1' style={{ fontFamily: 'Playfair Display, serif' }}>Quality</p>
          </div>
          <div className='absolute top-20 left-8 sm:left-16 hero-fade-in' style={{ animationDelay: '1.2s' }}>
            <p className='text-[10px] tracking-[4px] uppercase text-[#c9a96e]/60'>Since</p>
            <p className='text-white text-2xl mt-1' style={{ fontFamily: 'Playfair Display, serif' }}>2020</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-fade-in' style={{ animationDelay: '1.4s' }}>
        <p className='text-[9px] tracking-[4px] uppercase text-[#555]'>Scroll</p>
        <div className='w-[1px] h-8 bg-gradient-to-b from-[#c9a96e]/50 to-transparent scroll-line'></div>
      </div>

      {/* Bottom gold gradient line */}
      <div className='h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent'></div>
    </div>
  )
}

export default Hero
