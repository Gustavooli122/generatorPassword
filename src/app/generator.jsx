import { useEffect, useRef, useState } from "react";

export default function Slider({ value, setValue }) {
  const min = 0;
  const max = 30;

  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  function updateValue(clientX) {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();

    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));

    const newValue = Math.round(
      (x / rect.width) * (max - min) + min
    );

    setValue(newValue);
  }

  useEffect(() => {
    function handleMouseMove(e) {
      if (!dragging) return;
      updateValue(e.clientX);
    }

    function handleMouseUp() {
      setDragging(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="w-full py-2">
      <div
        ref={sliderRef}
        onClick={(e) => updateValue(e.clientX)}
        className="
          relative
          h-[6px]
          w-full
          rounded-full
          bg-[#d6dde0]
          cursor-pointer
        "
      >
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            rounded-full
            bg-[#58f47b]
          "
          style={{ width: `${percentage}%` }}
        />

        <div
          onMouseDown={() => setDragging(true)}
          className="
            absolute
            top-1/2
            h-5
            w-5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#58f47b]
            shadow-[0_0_15px_rgba(88,244,123,0.35)]
            cursor-grab
            transition-transform
            hover:scale-110
            active:cursor-grabbing
            active:scale-95
          "
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
}