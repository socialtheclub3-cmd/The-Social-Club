import React, { useState, useRef, useEffect } from 'react';

interface DraggableFABProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DraggableFAB: React.FC<DraggableFABProps> = ({ children, className, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStarted = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const clickStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStarted.current) return;
      
      const dx = e.clientX - clickStart.current.x;
      const dy = e.clientY - clickStart.current.y;
      
      // If moved more than 5 pixels, consider it a drag
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isDragging.current = true;
      }

      if (isDragging.current) {
        const newX = e.clientX - startPos.current.x;
        const newY = e.clientY - startPos.current.y;
        currentPos.current = { x: newX, y: newY };
        setPosition({ x: newX, y: newY });
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!dragStarted.current) return;
      dragStarted.current = false;
      
      // If it wasn't a drag (just a click), trigger onClick
      if (!isDragging.current && onClick) {
        onClick();
      }
      
      isDragging.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [onClick]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Prevent default to stop browser interference
    e.preventDefault();
    dragStarted.current = true;
    isDragging.current = false;
    clickStart.current = { x: e.clientX, y: e.clientY };
    startPos.current = {
      x: e.clientX - currentPos.current.x,
      y: e.clientY - currentPos.current.y
    };
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: 'none',
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
      className={className}
    >
      {/* We intercept pointer events on the children so they don't trigger native clicks */}
      <div style={{ pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableFAB;
