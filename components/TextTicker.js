import { useState, useEffect } from 'react';

const TextTicker = ({ text }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition - 1;
        return newPosition < -text.length * 20 ? 0 : newPosition;
      });
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return (
    <div className="w-full overflow-hidden bg-blue-200">
      <div
        className="inline-block whitespace-nowrap"
        style={{ transform: `translateX(${position}px)` }}
      >
       <span  className="px-4 text-5xl font-serif ">{text}</span> 
      
      </div>
    </div>
  );
};

export default TextTicker;
