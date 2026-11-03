import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress, total, loaded, item]);

  return (
    <div
      className={`loading-screen pointer-events-none ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="loading-name">
        <div
          className="loading-fill transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        >
          Akila Kannan
        </div>
        <div className="text-white/30">Akila Kannan</div>
      </div>
    </div>
  );
};
