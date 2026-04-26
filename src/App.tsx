import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const NeobrutalistGrid: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div className={`h-full w-full border-[1px] grid grid-cols-6 grid-rows-6 ${color === 'white' ? 'border-white/20' : 'border-black/20'}`}>
      {[...Array(36)].map((_, i) => (
        <div key={i} className={`border-[0.5px] ${color === 'white' ? 'border-white/10' : 'border-black/10'}`} />
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const huehausEditorialRef = useRef<HTMLDivElement>(null);
  const brandingSectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const layeredRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scrolling initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // SECTION 2: IRONHAUS METHOD (Brutalist Poster Redesign)
      if (huehausEditorialRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: huehausEditorialRef.current,
            start: "top top",
            end: "+=500%",
            pin: true,
            scrub: 1,
          }
        })
        .to(".editorial-poster", { scale: 1.1, duration: 2 }, 0)
        .to(".editorial-poster-image", { y: -50, duration: 2 }, 0)
        .to(".parallax-bg-text-1", { xPercent: -20, duration: 3 }, 0)
        .to(".parallax-bg-text-2", { xPercent: 20, duration: 3 }, 0)
        .to(".parallax-bg-text-3", { xPercent: -10, duration: 3 }, 0)
        .to(".editorial-poster", { y: -20, duration: 1 }, 2)
        .to(".editorial-card-text-1", { opacity: 0, y: -20, duration: 1 }, 2)
        .to(".editorial-card-text-2", { opacity: 1, y: 0, duration: 1 }, 2.5);
      }

      // SECTION 3: LAYERED REVEAL (Neobrutalist Reveal)
      if (layeredRef.current) {
        const panels = gsap.utils.toArray<HTMLElement>('.layered-panel');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: layeredRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
          }
        });

        panels.forEach((panel, i) => {
          if (i === 0) {
            gsap.fromTo(panel.querySelector('h1'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 });
            return;
          }
          tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 1.5, ease: "none" });
          tl.fromTo(panel.querySelector('h1'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5");
        });
      }

      // SECTION 4: Pinned Horizontal Gallery
      if (horizontalRef.current && horizontalSectionRef.current) {
        const slides = gsap.utils.toArray<HTMLElement>('.gallery-slide');
        gsap.to(slides, {
          xPercent: -100 * (slides.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: "top top",
            end: () => `+=${horizontalRef.current?.offsetWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-white selection:text-black">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" src="/gym_video.mp4" />
        <nav className="absolute z-50 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3">
             <svg viewBox="0 0 256 256" className="h-5 w-5 fill-white">
              <rect x="48" y="64" width="24" height="128" rx="4" />
              <rect x="184" y="64" width="24" height="128" rx="4" />
              <rect x="72" y="112" width="112" height="32" rx="2" />
              <rect x="16" y="80" width="32" height="96" rx="4" />
              <rect x="208" y="80" width="32" height="96" rx="4" />
            </svg>
            <span className="text-white text-sm font-bold tracking-tight uppercase">ironhaus</span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
            {['method', 'performance', 'virtual', 'training'].map((link) => (
              <a key={link} href={`#${link}`} className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full uppercase tracking-tighter">{link}</a>
            ))}
          </div>
          <button className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors uppercase tracking-widest">join now</button>
        </nav>
        <div className="relative h-full w-full z-10 pointer-events-none">
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%]">forge</h1>
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%]">your</h1>
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%]">strength</h1>
          <p className="absolute left-6 md:left-10 top-[46%] max-w-[280px] text-[15px] leading-snug text-white/90">push your limits, redefine your strength, and achieve the elite physique you've always desired.</p>
          <div className="absolute right-6 md:right-24 top-[14%] flex flex-col items-end">
            <span className="text-4xl md:text-5xl font-medium tracking-tight">+65k</span>
            <span className="text-xs md:text-sm text-white/70 mt-1 uppercase">athletes trained</span>
          </div>
          <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24 flex flex-col">
            <span className="text-4xl md:text-5xl font-medium tracking-tight">+200</span>
            <span className="text-xs md:text-sm text-white/70 mt-1 uppercase tracking-tighter">premium equipment</span>
          </div>
          <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20 flex flex-col items-end">
            <span className="text-4xl md:text-5xl font-medium tracking-tight">+300k</span>
            <span className="text-xs md:text-sm text-white/70 mt-1 uppercase">transformations</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: IRONHAUS METHOD (BRUTALIST POSTER REDESIGN) */}
      <section id="method" ref={huehausEditorialRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-950/50 pointer-events-none" />
        
        {/* Parallax Background Typography Layers (Kinematic Scroll) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <h1 className="parallax-bg-text-1 absolute top-[10%] left-[-10%] text-neutral-800 font-black text-[25vw] leading-[0.7] tracking-[-0.08em] uppercase opacity-30 whitespace-nowrap">
            ELITE PERFORMANCE
          </h1>
          <h1 className="parallax-bg-text-2 absolute bottom-[15%] left-[20%] text-neutral-800 font-black text-[30vw] leading-[0.7] tracking-[-0.08em] uppercase opacity-30 whitespace-nowrap">
            LEGACY
          </h1>
          <h1 className="parallax-bg-text-3 absolute top-[40%] right-[-15%] text-[#fbbf24] font-black text-[20vw] leading-[0.7] tracking-[-0.08em] uppercase opacity-10 whitespace-nowrap">
            PROTOCOLS
          </h1>
        </div>
        
        {/* Horizontal Scrolling Watermarks (Top & Bottom) */}
        <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-white/10 py-2 z-20">
          <div className="flex animate-marquee-slower whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white/20 text-[10px] font-black uppercase tracking-[1em] px-10 select-none">
                IRONHAUS PERFORMANCE UNIT / ELITE ATHLETE PROTOCOLS / LIMITLESS STRENGTH /
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full overflow-hidden border-y border-white/10 py-2 z-20">
          <div className="flex animate-marquee-slower whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-[#fbbf24]/20 text-[10px] font-black uppercase tracking-[1em] px-10 select-none">
                REDEFINE YOUR LIMITS / FORGE THE FUTURE / POWER THROUGH THE GRIND /
              </span>
            ))}
          </div>
        </div>

        {/* Central Poster Container */}
        <div className="editorial-poster relative w-[95%] md:w-[70%] h-[80vh] bg-neutral-900 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center group">
          {/* Gym Interior Background (Image 3 Style) */}
          <img 
            src="/gym_interior.png" 
            className="editorial-poster-image absolute inset-0 w-full h-full object-cover opacity-40 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-50" 
            alt="Gym Interior" 
          />

          {/* Brutalist Typography Layer (Integrated with Image) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
             <h1 className="editorial-poster-bg-text text-white font-black text-[35vw] leading-[0.7] tracking-[-0.08em] uppercase opacity-10 select-none translate-y-10">
               POWER
             </h1>
          </div>
          
          {/* Poster Overlay Text Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-10">
            <div className="editorial-card-text-1 flex flex-col items-center">
              <div className="mb-8 flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-[#fbbf24]" />
                 <span className="text-[12px] font-black uppercase tracking-[0.8em] text-[#fbbf24]">BRUTAL / METHOD</span>
                 <div className="w-12 h-[1px] bg-[#fbbf24]" />
              </div>
              <h2 className="text-6xl md:text-[10vw] font-black leading-[0.8] tracking-[-0.06em] uppercase text-white mb-8 text-center drop-shadow-2xl">
                FORGE <br /> <span className="text-transparent border-b-8 border-white/20 pb-4" style={{ WebkitTextStroke: '2px white' }}>INTENSITY</span>
              </h2>
              <div className="max-w-md text-center bg-black/40 backdrop-blur-sm p-6 border-l-4 border-[#fbbf24]">
                <p className="text-white text-sm md:text-base font-bold uppercase tracking-widest leading-relaxed">
                  Strength. Discipline. Agility. Grit. <br /> 
                  <span className="opacity-50 font-medium">The fundamental architecture of performance.</span>
                </p>
              </div>
            </div>
            
            <div className="editorial-card-text-2 absolute inset-0 p-12 md:p-20 opacity-0 pointer-events-none flex flex-col items-center justify-center bg-[#fbbf24]">
              <span className="text-[12px] font-black uppercase tracking-[0.5em] mb-8 block text-black border-b-2 border-black pb-2">IRONHAUS — PROTOCOL</span>
              <h2 className="text-6xl md:text-[8vw] font-black leading-[0.85] tracking-[-0.06em] uppercase text-black text-center">Form. <br /> Recovery. <br /> Nutrition.</h2>
              <div className="mt-12 w-24 h-24 border-8 border-black flex items-center justify-center">
                 <div className="w-8 h-8 bg-black animate-pulse" />
              </div>
            </div>
          </div>

          {/* Architectural Framing Elements (Image 1 Style) */}
          <div className="absolute inset-4 border border-white/10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-[#fbbf24]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-[#fbbf24]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-[1px] bg-white/20" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-[1px] bg-white/20" />
          
          {/* Corner Details */}
          <div className="absolute top-8 left-8 text-[10px] font-bold text-white/30 uppercase tracking-tighter">Section_02 / Method</div>
          <div className="absolute bottom-8 right-8 text-[10px] font-bold text-white/30 uppercase tracking-tighter">Elite_Performance_Unit</div>
        </div>
      </section>

      {/* SECTION 3: NEOBRUTALIST LAYERED REVEAL (GYM TEXT) */}
      <section id="performance" ref={layeredRef} className="relative h-screen w-full overflow-hidden bg-black">
        {/* Panel 1: Orange - Elite Performance */}
        <div className="layered-panel absolute inset-0 z-10 bg-[#FF5C00] flex flex-col justify-center px-10 md:px-20 overflow-hidden border-t-8 border-black">
          <NeobrutalistGrid color="black" />
          <h1 className="text-black text-[12vw] font-black leading-[0.8] tracking-[-0.05em] uppercase select-none relative z-10">Elite <br /> performance</h1>
          <div className="absolute top-10 right-10 flex gap-2 z-20">
             {['Strength', 'Power', 'Legacy', 'Iron'].map((tab, i) => (
               <div key={i} className={`px-4 py-1 border-2 border-black font-bold uppercase text-[10px] ${i === 0 ? 'bg-white' : i === 2 ? 'bg-blue-600 text-white' : i === 3 ? 'bg-yellow-400' : 'bg-neutral-200'}`}>{tab}</div>
             ))}
          </div>
          <div className="absolute bottom-20 right-10 md:right-20 max-w-lg text-right z-10">
            <p className="text-black text-lg md:text-xl font-bold uppercase leading-none border-t-4 border-black pt-4">Pushing past physical limits through evidence-based strength protocols.</p>
          </div>
        </div>

        {/* Panel 2: Lime - Unrivaled Results */}
        <div className="layered-panel absolute inset-0 z-20 bg-[#DFFF00] flex flex-col justify-center px-10 md:px-20 overflow-hidden border-t-8 border-black">
          <NeobrutalistGrid color="black" />
          <div className="absolute top-4 left-4 font-bold text-black text-xs uppercase tracking-widest">Training Protocol / 1.0</div>
          <h1 className="text-black text-[12vw] font-black leading-[0.8] tracking-[-0.05em] uppercase select-none relative z-10">Unrivaled <br /> results</h1>
          <div className="absolute bottom-20 right-10 flex flex-col items-end z-10">
            <div className="w-32 h-32 border-4 border-black flex items-center justify-center mb-4 bg-white/20">
               <svg viewBox="0 0 24 24" className="w-16 h-16 fill-black"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
            <p className="text-black text-right font-bold uppercase max-w-xs">Data-driven fitness for the modern athlete. we track every rep.</p>
          </div>
        </div>

        {/* Panel 3: Cream - Total Transformation */}
        <div className="layered-panel absolute inset-0 z-30 bg-[#F3F0EA] flex flex-col justify-center px-10 md:px-20 overflow-hidden border-t-8 border-black">
          <NeobrutalistGrid color="black" />
          <h1 className="text-black text-[12vw] font-black leading-[0.8] tracking-[-0.05em] uppercase select-none relative z-10">Total <br /> transformation</h1>
          <div className="mt-12 border-l-8 border-black pl-8 max-w-2xl">
            <p className="text-black text-2xl font-black uppercase italic">Our members see an average 32% increase in lean muscle mass within just 12 weeks.</p>
          </div>
          <div className="absolute bottom-10 right-10 grid grid-cols-3 gap-2">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-8 h-8 bg-black" />
             ))}
          </div>
        </div>

        {/* Panel 4: Dark - Join the Elite Gym */}
        <div className="layered-panel absolute inset-0 z-40 bg-[#1A1A1A] flex flex-col justify-center px-10 md:px-20 overflow-hidden border-t-8 border-[#DFFF00]">
          <NeobrutalistGrid color="#DFFF00" />
          <div className="text-center w-full relative z-10">
            <h1 className="text-[#DFFF00] text-[12vw] font-black leading-[0.8] tracking-[-0.05em] uppercase select-none">Ready to join <br /> the elite gym</h1>
          </div>
          <div className="absolute bottom-4 left-4 text-[#DFFF00] font-bold text-[8px] uppercase">© Ironhaus Performance 2026 / Built for athletes</div>
        </div>
      </section>

      {/* SECTION 4: PINNED HORIZONTAL GALLERY (RE-TITLED: GYM VIRTUAL) */}
      <section id="virtual" ref={horizontalSectionRef} className="relative h-screen w-full overflow-hidden bg-black">
        <div ref={horizontalRef} className="flex h-full w-[400vw]">
          <div className="gallery-slide relative h-full w-screen flex flex-col bg-black border-r border-white/5">
            <div className="grid grid-cols-12 h-[60%] w-full">
               {[...Array(60)].map((_, i) => (
                 <div key={i} className={`border-[0.5px] border-white/5 ${i % 7 === 0 ? 'bg-neutral-800' : i % 5 === 0 ? 'bg-neutral-900' : i % 3 === 0 ? 'bg-neutral-950' : 'bg-black'}`} />
               ))}
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <h1 className="text-white text-[15vw] leading-[0.8] font-serif brutalist-pixel italic select-none">Gym Virtual</h1>
               <span className="text-white/40 text-sm font-medium tracking-widest mt-4 uppercase">(experience ironhaus anywhere)</span>
            </div>
          </div>
          {[
            { img: "/curl_corner.png", label: "Remote", title: "Global Coaching Elite" },
            { img: "/red_light_gym.png", label: "Workshops", title: "Live Technique Masterclasses" }
          ].map((slide, i) => (
            <div key={i} className="gallery-slide relative h-full w-screen bg-black flex items-center justify-center p-10">
              <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/5">
                <img src={`${slide.img}?auto=format&fit=crop&q=80&w=2070`} className="absolute inset-0 w-full h-full object-cover opacity-60" alt={slide.title} />
                <div className="absolute bottom-10 left-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block opacity-40">0{i+1} — {slide.label}</span>
                  <h2 className="text-4xl font-medium tracking-tight">{slide.title}</h2>
                </div>
              </div>
            </div>
          ))}
          <div className="gallery-slide relative h-full w-screen bg-black flex items-center justify-center p-10">
             <div className="relative w-full h-full flex flex-col justify-center items-center text-white text-center">
                <h1 className="text-[12vw] leading-none font-serif brutalist-pixel italic mb-8">Virtual</h1>
                <p className="text-xl max-w-xl opacity-80 uppercase tracking-tighter">Your training, your terms. The architecture of strength, delivered globally.</p>
                <button className="mt-12 px-10 py-4 border border-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Join Virtual</button>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRAINING PROGRAMS */}
      <section id="training" ref={brandingSectionRef} className="relative min-h-screen w-full bg-black flex flex-col font-readex overflow-hidden">
        <div className="flex-1 border-t border-white/10 flex flex-col">
          <div className="h-[20vh] flex border-b border-white/10">
            <div className="flex-1 relative overflow-hidden border-r border-white/10">
               <svg className="absolute inset-0 w-full h-full text-white/5" preserveAspectRatio="none" viewBox="0 0 100 100"><line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" /></svg>
            </div>
            <div className="w-40 flex items-start justify-end p-6">
              <button className="px-5 py-2 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Programs</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-20 border-b border-white/10">
            <h1 className="text-white text-[20vw] md:text-[18vw] leading-[0.8] font-serif tracking-tighter mb-12 select-none italic brutalist-pixel uppercase">Training</h1>
            <p className="text-white/80 text-lg md:text-2xl max-w-2xl leading-tight font-medium uppercase">Premium coaching for dedicated individuals that reflects the quality of your commitment and the ambitions of your goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 min-h-[30vh]">
            <div className="border-r border-white/10 p-8 flex flex-col justify-between group overflow-hidden">
               <div className="flex justify-between items-start mb-12">
                  <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">01 PROGRAMS</span>
                  <div className="w-[1px] h-4 bg-white/20" />
               </div>
               <div className="relative overflow-hidden w-full whitespace-nowrap">
                 <div className="flex animate-marquee-slower items-center gap-12 py-4">
                    {['Powerlifting', 'Bodybuilding', 'HIIT', 'Strength & Conditioning'].map((s, i) => (
                      <span key={i} className="text-white text-4xl md:text-5xl font-medium tracking-tight uppercase shrink-0">{s}</span>
                    ))}
                    {['Powerlifting', 'Bodybuilding', 'HIIT', 'Strength & Conditioning'].map((s, i) => (
                      <span key={i} className="text-white text-4xl md:text-5xl font-medium tracking-tight uppercase shrink-0">{s}</span>
                    ))}
                 </div>
               </div>
            </div>
            <div className="border-r border-white/10 p-8 flex flex-col justify-between">
               <div className="flex justify-between items-start mb-12"><span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">02 DURATION</span></div>
               <h3 className="text-white text-4xl md:text-5xl font-medium tracking-tight leading-none uppercase">12 weeks program</h3>
            </div>
            <div className="p-8 flex flex-col justify-between group cursor-pointer hover:bg-white/5 transition-colors duration-500">
               <div className="flex justify-between items-start mb-12"><span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">03 STARTING @ 99/MO</span></div>
               <div className="flex justify-between items-end">
                  <h3 className="text-white text-4xl md:text-5xl font-medium tracking-tight leading-none uppercase">See pricing</h3>
                  <svg className="w-8 h-8 text-white/40 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
               </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="h-[40vh] bg-black flex flex-col items-center justify-center gap-8 border-t border-white/5">
         <div className="w-16 h-px bg-white/20" />
         <span className="text-white/20 text-xs tracking-widest uppercase tracking-[0.3em]">© ironhaus performance 2026</span>
         <div className="flex gap-12">
            {['Instagram', 'Twitter', 'YouTube'].map(social => (
              <a key={social} href="#" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest">{social}</a>
            ))}
         </div>
      </footer>
    </div>
  );
};

export default App;
