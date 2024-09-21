import FontCircle from "./FontCircle";

const HeroSection = ({
  startVideo,
  modelStatus,
}: {
  startVideo: unknown;
  modelStatus: string;
}) => {
  return (
    <div className="w-full md:px-20 px-10 py-10 flex flex-col bg-red md:flex-row justify-between md:items-center     ">
      <div className="w-full md:w-[40%]">
        <FontCircle />
        <h1 className="text-4xl md:text-5xl md:text-6xl lg:text-7xl font-bold mt-10 leading-tight">
          Control Scroll with <br /> Hand gesture
        </h1>
        <div className="py-4 md:py-10">
          <h1>Scroll using hand gestures!</h1>
          <ul className="list-disc list-inside">
            <li>show an open palm to the camera to scroll up.</li>
            <li>Pinch your thumb and index finger together to scroll down.</li>
          </ul>
          <p>Current scroll position: {window.pageYOffset}px</p>
        </div>

        <button
          onClick={startVideo as () => void}
          disabled={modelStatus !== "Loaded"}
          className={`bg-black text-white text-lg px-8 py-4 rounded-full hover:bg-gray-800 transition duration-300`}
        >
          {modelStatus === "Loaded" ? "Start Video" : "Loading model..."}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
