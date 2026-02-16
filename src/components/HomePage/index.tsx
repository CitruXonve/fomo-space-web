import PrimaryBackground from "../Background";
import { ChatBox } from "../ChatBox";
import { cn } from "@/utils/classname";

export default function HomePage() {
  return (
    <>
      <PrimaryBackground />
      <div
        className={cn("text-center relative z-10 top-[60px]", "left-0 mx-auto")}
      >
        <h1 className="text-2xl font-semibold text-white mb-4">
          Tension of Missing Out
        </h1>
        <p className="text-gray-400 dark:text-gray-400 mb-8 max-[800px]:max-w-[80%] mx-auto word-wrap break-words">
          There&apos;s always a chance to chase the &quot;asteroids&quot; that
          you may miss out.
        </p>
        <div className="flex justify-center min-[560px]:mx-auto min-[800px]:w-[70%] min-[560px]:max-w-8xl my-8">
          <ChatBox />
        </div>
      </div>
    </>
  );
}
