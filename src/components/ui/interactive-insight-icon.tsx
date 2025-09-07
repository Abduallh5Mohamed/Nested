import TypewriterLoader from "@/components/ui/typewriter-loader";

const InteractiveInsightIcon = () => {
  return (
    <div className="relative w-full h-56 bg-secondary/80 overflow-hidden p-4 flex items-center justify-center group">
        <TypewriterLoader />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-secondary/80 via-secondary/50 to-transparent" />
    </div>
  );
};

export default InteractiveInsightIcon;
