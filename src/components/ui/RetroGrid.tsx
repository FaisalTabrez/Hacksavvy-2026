export default function RetroGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-full w-full overflow-hidden opacity-60 [perspective:200px] ${className}`}>
      {/* Grid Layer */}
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={`
            animate-retro-grid 
            [background-repeat:repeat] 
            [background-size:60px_60px] 
            [height:300%] 
            [inset:0%_0px] 
            [margin-left:-50%] 
            [transform-origin:100%_0_0] 
            [width:200%]
            [background-image:linear-gradient(to_right,rgba(255,42,42,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,42,42,0.4)_1px,transparent_0)]
          `}
        />
      </div>

      {/* Fade Gradient (Top for horizon fade, Bottom for blending into page) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
    </div>
  );
}
