import { useState, useEffect } from "react";

function DraggableItem() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - startPosition.x;
        const dy = e.clientY - startPosition.y;

        const newPosition = {
          x: position.x + dx,
          y: position.y + dy,
        };

        setPosition(newPosition);
        setStartPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setStartPosition(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, startPosition]);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection

    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="overflow-hidden">
      {" "}
      <div
        className="draggable-item cursor-pointer"
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: "absolute",
        }}
      >
        Drg me
      </div>
    </div>
  );
}

export default DraggableItem;
