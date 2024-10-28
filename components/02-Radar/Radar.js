import {
  Canvas,
  DashPathEffect,
  Line,
  Path,
  Skia,
  vec,
  useImage,
  RadialGradient,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Dimensions, View, Image } from "react-native";

const Radar = () => {
  const { width, height } = Dimensions.get("window");
  const radius = 200;
  const center = vec(radius, radius);
  const arcAngle = 60;

  // Define concentric circles with a fading effect
  const circles = Array.from({ length: 8 }, (_, i) => {
    const r = (radius / 8) * (i + 1); // Spread out the rings
    const path = Skia.Path.Make();
    path.addCircle(center.x, center.y, r);
    return path;
  });

  // Define a path for the radar chart
  const radius2 = 170;
  const strokeWidth2 = 15;
  const innerRadius2 = radius2 - strokeWidth2 / 2;
  const path2 = Skia.Path.Make();
  path2.addCircle(radius, radius, innerRadius2);

  const radius3 = 150;
  const lines = [];

  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    lines.push({ p1: center, p2: vec(x, y) });
  }

  const [angle, setAngle] = useState(0);
  const [visibleSignals, setVisibleSignals] = useState([]);

  useEffect(() => {
    const animate = () => {
      setAngle((prevAngle) => {
        const newAngle = (prevAngle + 5) % 360;
        updateSignals(newAngle); // Update visible signals based on new angle
        return newAngle;
      });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const endX = center.x + radius3 * Math.cos((angle * Math.PI) / 180);
  const endY = center.y + radius3 * Math.sin((angle * Math.PI) / 180);
  const endPoint = vec(endX, endY);

  const createPizzaSlicePath = (center, endPoint) => {
    const path = Skia.Path.Make();
    path.moveTo(center.x, center.y);
    path.lineTo(endPoint.x, endPoint.y);

    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x =
        center.x + radius3 * Math.cos((angle + t * arcAngle) * (Math.PI / 180));
      const y =
        center.y + radius3 * Math.sin((angle + t * arcAngle) * (Math.PI / 180));
      path.lineTo(x, y);
    }

    path.lineTo(center.x, center.y);
    path.close();
    return path;
  };

  const pizzaSlicePath = createPizzaSlicePath(center, endPoint);

  // Define static signal positions
  const staticSignalPositions = [
    { angle: 30, distance: 100 },
    { angle: 90, distance: 120 },
    { angle: 90, distance: 80 },
    { angle: 94, distance: 90 },
    { angle: 290, distance: 110 },
  ];

  // Update visible signals based on the scanner's current angle
  const updateSignals = (currentAngle) => {
    const newVisibleSignals = staticSignalPositions.reduce(
      (acc, { angle: signalAngle, distance }) => {
        // Check if the signal is within the current scanning arc
        if (isAngleInRange(signalAngle, currentAngle)) {
          const signalX =
            center.x + distance * Math.cos((signalAngle * Math.PI) / 180);
          const signalY =
            center.y + distance * Math.sin((signalAngle * Math.PI) / 180);
          acc.push(vec(signalX, signalY)); // Add signal to visible signals
        }
        return acc;
      },
      []
    );

    setVisibleSignals(newVisibleSignals); // Update visible signals state
  };

  // Function to check if an angle is within the scanning arc
  const isAngleInRange = (signalAngle, currentAngle) => {
    const adjustedSignalAngle = (signalAngle + 360) % 360; // Normalize angle
    const startAngle = currentAngle;
    const endAngle = (startAngle + arcAngle) % 360;

    return (
      (startAngle < endAngle &&
        adjustedSignalAngle >= startAngle &&
        adjustedSignalAngle <= endAngle) ||
      (startAngle > endAngle &&
        (adjustedSignalAngle >= startAngle || adjustedSignalAngle <= endAngle))
    );
  };


  return (
    <View
      style={{
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Canvas style={{ width: radius * 2, height: radius * 2 }}>
        {circles.map((path, index) => (
          <Path
            key={index}
            path={path}
            strokeWidth={2}
            style="stroke"
            color={`rgba(0, 77, 102, ${(8 - index) / 8})`}
          />
        ))}

        {lines.map((line, index) => (
          <Line
            key={index}
            p1={line.p1}
            p2={line.p2}
            color="#004d66"
            style="stroke"
            strokeWidth={1}
          />
        ))}

        <Path path={pizzaSlicePath} style="fill">
          <RadialGradient
            c={center}
            r={radius3}
            colors={["rgba(0, 200, 255, 255)", "rgba(0, 200, 255, 0)"]}
          />
        </Path>

        <Path
          path={path2}
          strokeWidth={strokeWidth2}
          style="stroke"
          color={"#006492"}
          strokeCap="butt"
          start={0}
          end={1}
          {...{
            children: <DashPathEffect intervals={[2, 10]} phase={15} />,
          }}
        />

        <Line
          p1={center}
          p2={endPoint}
          color="rgba(0, 200, 255, 0.4)"
          style="stroke"
          strokeWidth={2}
        />

        {visibleSignals.map((signal, index) => (
          <Path
            key={index}
            path={Skia.Path.Make().addCircle(signal.x, signal.y, 5)}
            style="fill"
            color="#00C8FF"
          />
        ))}
      </Canvas>
      <Image
        source={require("../../assets/worldTexture.png")}
        style={{
          width: radius + 50,
          height: radius + 50,
          position: "absolute",
          opacity: 0.2,
        }}
      />
    </View>
  );
};

export default Radar;
