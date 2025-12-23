import { motion } from "framer-motion";

interface OrbitRingProps {
  radius: number;
  speed: number;
  icons: React.ReactNode[];
  reverse?: boolean;
}

export function OrbitRing({
  radius,
  speed,
  icons,
  reverse = false,
}: Readonly<OrbitRingProps>) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {/* RING */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
        conic-gradient(
          from 0deg,
          rgba(167,139,250,0.35) 0deg,
          rgba(167,139,250,0.95) 60deg,
          rgba(167,139,250,1) 140deg,
          rgba(167,139,250,0.95) 220deg,
          rgba(167,139,250,0.65) 300deg,
          rgba(167,139,250,0) 360deg
        )
      `,
          maskImage: "radial-gradient(circle, transparent 70%, black 72%)",
        }}
      />

      {/* ICONS */}
      {icons.map((icon, index) => {
        const angle = (360 / icons.length) * index;
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `
                rotate(${angle}deg)
                translate(${radius}px)
                rotate(-${angle}deg)
              `,
            }}
          >
            <div className="text-xl text-violet-300/90">{icon}</div>
          </div>
        );
      })}
    </motion.div>
  );
}
