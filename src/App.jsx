import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Text } from "@react-three/drei";
import React, { useRef, useState } from 'react';

function MovableText() {
  const textRef = useRef();
  const [isDragging, setDragging] = useState(false);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
   <group>
     <Text
      ref={textRef}
      position={[0, 2.2, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      fontSize={0.7}
      fontWeight="700"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwOIpWqZPBQ.ttf"
    >
    PortalVerse
    </Text>
     <Text
     ref={textRef}
     position={[0, 1.75, 0]}
     onPointerDown={handlePointerDown}
     onPointerUp={handlePointerUp}
     fontSize={0.25}
     fontWeight="700"
     font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwOIpWqZPBQ.ttf"
   >
   Double click on Card !
   </Text>
   </group>
  );
}

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MovableText/>
      <color attach="background" args={["#4D4855"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
