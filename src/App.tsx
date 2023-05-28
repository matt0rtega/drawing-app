import "./styles.css";
import { useRef, useEffect, useState } from "react";
import * as React from "react";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLCanvasElement>(null);

  const [currentColor, setCurrentColor] = useState("rgba(255, 0, 0, 0.5)");
  const [alpha, setAlpha] = useState(0.5);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const lerpAmount = 0.1; // Adjust the value to control the interpolation speed

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const main = mainRef.current;
    const mctx = main.getContext("2d");
    main.width = window.innerWidth;
    main.height = window.innerHeight;

    mctx.globalAlpha = alpha;

    // Enable antialiasing
    ctx.imageSmoothingEnabled = true;
    mctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = "high";

    // Set line properties
    ctx.lineCap = "round"; // Rounded line endings
    ctx.lineJoin = "round"; // Rounded corners
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
    setTargetX(e.nativeEvent.offsetX);
    setTargetY(e.nativeEvent.offsetY);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx.lineCap = "round"; // Rounded line endings
  };

  const drawLine = (e) => {
    if (!isDrawing) return;

    // Interpolate the target position
    setTargetX(targetX + (e.nativeEvent.offsetX - targetX) * lerpAmount);
    setTargetY(targetY + (e.nativeEvent.offsetY - targetY) * lerpAmount);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const main = mainRef.current;
    const mctx = main.getContext("2d");
    mctx.globalAlpha = alpha;

    let gradient = ctx.createLinearGradient(100, 50, 200, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1.0, "red");

    ctx?.beginPath();
    ctx?.moveTo(lastX, lastY);
    ctx?.lineTo(targetX, targetY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;
    ctx.strokeStyle = currentColor;
    ctx?.stroke();

    setLastX(targetX);
    setLastY(targetY);
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const main = mainRef.current;
    const mctx = main.getContext("2d");
    ctx.lineCap = "round"; // Rounded line endings

    mctx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, draft.width, draft.height);

    setIsDrawing(false);
  };

  return (
    <div className="h-screen">
      {/* Canvas */}
      <div className="sandwich">
        <canvas id="main" ref={mainRef} width={400} height={400} />
        <canvas
          id="draft"
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={drawLine}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          style={{ opacity: alpha }}
        />
      </div>

      <div>
        <ColorPicker />
      </div>
    </div>
  );
}

function ColorPicker() {
  return (
    <div className="flex gap-2">
      <div
        className="h-12 w-12 rounded-lg"
        style={{ backgroundColor: "red" }}
        onClick={() => {
          setCurrentColor("rgba(255, 0, 0)");
        }}
      ></div>
      <div
        className="h-12 w-12 rounded-lg"
        style={{ backgroundColor: "green" }}
        onClick={() => {
          setCurrentColor("green");
        }}
      ></div>
      <div
        className="h-12 w-12 rounded-lg"
        style={{ backgroundColor: "blue" }}
        onClick={() => {
          setCurrentColor("blue");
        }}
      ></div>
    </div>
  );
}

function Controls(){
  return(
    
  )
}

