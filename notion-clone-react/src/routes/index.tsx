import Link from "@mui/material/Link";
import TypewriterTitle from "../components/TypewriterTitle";
import Button from "@mui/material/Button";
import { ArrowRight } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

export default function IndexPage() {
  const getStartedColor = pink["A200"];
  return (
    <div className="bg-gradient-to-r min-h-screen grainy from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI <span className="text-green-600 font-bold">note taking</span>{" "}
          assistant.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button
              variant="contained"
              style={{ backgroundColor: getStartedColor, color: "white" }}
              startIcon={<ArrowRight />}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
