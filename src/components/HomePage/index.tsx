import { ChatBox } from "../ChatBox";

export default function HomePage() {
  return (
    <>
      <div className="text-center relative z-10">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Tension of Missing Out
        </h1>
        <p className="text-senary dark:text-gray-400 mb-8 max-w-[70%] mx-auto word-wrap break-words">
          There&apos;s always a chance to chase the &quot;asteroids&quot; that
          you may miss out.
        </p>
        <div className="flex justify-center mx-auto w-[70%] max-w-8xl my-8">
          <ChatBox />
        </div>
      </div>
    </>
  );
}
