import { useEffect, useRef, useState } from "react";

export default function Slider({ value, setValue }) {
  const min = 0;
  const max = 30;

  // Referência para a barra
  const sliderRef = useRef(null);

  // Indica se o usuário está arrastando a bolinha
  const [dragging, setDragging] = useState(false);

  // Calcula a porcentagem da bolinha
  const percentage = ((value - min) / (max - min)) * 100;

  // Atualiza o valor do slider
  function updateValue(clientX) {
    const rect = sliderRef.current.getBoundingClientRect();

    // Distância do mouse até o início da barra
    let x = clientX - rect.left;

    // Impede passar das extremidades
    x = Math.max(0, Math.min(x, rect.width));

    // Converte pixels em um valor entre min e max
    const newValue = Math.round((x / rect.width) * (max - min) + min);

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

    // Escuta os eventos na janela inteira
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Remove os eventos quando o componente desmontar
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="w-full">
      {/* Barra */}
      <div
        ref={sliderRef}
        onClick={(e) => updateValue(e.clientX)}
        className="relative h-2 bg-gray-300 rounded-full cursor-pointer"
      >
        {/* Parte preenchida */}
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />

        {/* Bolinha */}
        <div
          onMouseDown={() => setDragging(true)}
          className="absolute w-5 h-5 bg-blue-500 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${percentage}%` }}
        />
      </div>

     
    </div>
  );
}