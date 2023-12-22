import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("🚀 Supercharged Productivity 💪")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 AI-Powered Insights 🧠")
          .pauseFor(1000)
          .deleteAll()
          .typeString("⚡ Lightning Fast Development ⏩")
          .pauseFor(1000)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
