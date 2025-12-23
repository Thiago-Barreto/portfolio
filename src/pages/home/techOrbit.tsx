import { motion } from "framer-motion";

interface TechOrbitProps {
  icon: React.ReactNode;
  size?: number;
  speed?: number;
}

export function TechOrbit({
  icon,
  size = 120,
  speed = 20,
}: Readonly<TechOrbitProps>) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {/* Ring */}
      <div
        className="absolute inset-0 rounded-full border border-violet-400/40"
        style={{
          maskImage:
            "conic-gradient(from 0deg, transparent 0deg 40deg, black 40deg 300deg, transparent 300deg 360deg)",
        }}
      />

      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-md" />

      {/* Icon */}
      <div className="relative text-3xl text-violet-300">{icon}</div>
    </motion.div>
  );
}
