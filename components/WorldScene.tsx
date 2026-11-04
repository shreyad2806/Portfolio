"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Hotspot = { position: [number, number, number]; label: string; target: string; color: string };

const hotspots: Hotspot[] = [
  { position: [-3.1, 0.25, 0.1], label: "THE BASECAMP", target: "about", color: "#9c83ff" },
  { position: [0.15, 0.45, 0.25], label: "THE BUILD LAB", target: "projects", color: "#72e8f5" },
  { position: [3.15, 0.15, 0.15], label: "THE FRONTIER", target: "focus", color: "#a7b9ff" },
];

function StarField() {
  const points = useMemo(() => {
    const values = new Float32Array(720 * 3);
    for (let i = 0; i < 720; i++) {
      values[i * 3] = (Math.random() - 0.5) * 22;
      values[i * 3 + 1] = (Math.random() - 0.5) * 12;
      values[i * 3 + 2] = -2 - Math.random() * 8;
    }
    return values;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12;
    }
  });
  return <points ref={ref}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry>
    <pointsMaterial color="#cbd8ff" size={0.025} transparent opacity={0.72} sizeAttenuation />
  </points>;
}

function FloatingIsland() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = -0.78 + Math.sin(state.clock.elapsedTime * 0.55) * 0.09;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.045;
    }
  });
  return <group ref={group} position={[0.25, -0.8, 0]}>
    <mesh position={[0, -0.42, 0]} scale={[3.65, 0.58, 1.45]} castShadow receiveShadow>
      <sphereGeometry args={[1, 48, 24]} />
      <meshStandardMaterial color="#27365d" roughness={0.82} metalness={0.18} />
    </mesh>
    <mesh position={[0, -0.12, 0]} scale={[3.7, 0.18, 1.48]} receiveShadow>
      <cylinderGeometry args={[1, 0.94, 0.28, 48]} />
      <meshStandardMaterial color="#56668e" roughness={0.62} metalness={0.22} />
    </mesh>
    <mesh position={[0, 0.04, 0]} scale={[1.6, 0.12, 0.68]}>
      <cylinderGeometry args={[1, 1.08, 0.16, 48]} />
      <meshStandardMaterial color="#8a9bc8" emissive="#3b5488" emissiveIntensity={0.25} />
    </mesh>
    <mesh position={[0.15, 0.65, 0]} castShadow>
      <cylinderGeometry args={[0.78, 1.05, 1.18, 8, 1, false]} />
      <meshStandardMaterial color="#253657" roughness={0.36} metalness={0.34} />
    </mesh>
    <mesh position={[0.15, 1.32, 0]}>
      <sphereGeometry args={[0.78, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial color="#a2e9f7" emissive="#4abbd4" emissiveIntensity={0.22} roughness={0.18} metalness={0.15} transparent opacity={0.78} transmission={0.22} />
    </mesh>
    <mesh position={[0.15, 0.65, 0.79]}>
      <boxGeometry args={[0.22, 0.82, 0.025]} />
      <meshBasicMaterial color="#79e9f5" />
    </mesh>
    <mesh position={[-0.28, 0.65, 0.79]}>
      <boxGeometry args={[0.22, 0.82, 0.025]} />
      <meshBasicMaterial color="#8d7cff" />
    </mesh>
    <mesh position={[-1.72, 0.15, 0.15]} rotation={[0, 0, -0.2]}>
      <boxGeometry args={[0.055, 1.55, 0.055]} />
      <meshBasicMaterial color="#70e8f5" />
    </mesh>
    <mesh position={[1.8, 0.14, -0.1]} rotation={[0, 0, 0.2]}>
      <boxGeometry args={[0.055, 1.3, 0.055]} />
      <meshBasicMaterial color="#a18cff" />
    </mesh>
    <mesh position={[-1.72, 0.95, 0.15]}>
      <sphereGeometry args={[0.11, 16, 12]} />
      <meshBasicMaterial color="#70e8f5" />
    </mesh>
    <mesh position={[1.8, 0.78, -0.1]}>
      <sphereGeometry args={[0.11, 16, 12]} />
      <meshBasicMaterial color="#a18cff" />
    </mesh>
    <mesh rotation={[Math.PI / 2.25, 0.2, 0]} position={[0.15, 0.5, 0]} scale={[2.35, 2.35, 0.035]}>
      <torusGeometry args={[1, 0.006, 8, 100]} />
      <meshBasicMaterial color="#8f9cff" transparent opacity={0.48} />
    </mesh>
  </group>;
}

function FloatingShard({ position, scale, color, speed }: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.002 * speed;
      ref.current.rotation.y += 0.003 * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.12;
    }
  });
  return <mesh ref={ref} position={position} scale={scale}>
    <octahedronGeometry args={[0.42, 0]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} metalness={0.5} roughness={0.25} />
  </mesh>;
}

function Destination({ item, onSelect }: { item: Hotspot; onSelect: (target: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const labelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 96;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = "600 34px ui-monospace, SFMono-Regular, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.shadowColor = item.color;
      context.shadowBlur = 14;
      context.fillStyle = "#f1f5ff";
      context.fillText(item.label, 256, 48);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [item.color, item.label]);
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 1.4 + item.position[0]) * 0.09;
  });
  return <group ref={ref} position={item.position}>
    <mesh
      onClick={(event) => { event.stopPropagation(); onSelect(item.target); }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <sphereGeometry args={[0.22, 20, 20]} />
      <meshBasicMaterial color={item.color} />
    </mesh>
    <mesh scale={hovered ? 1.9 : 1.45}>
      <sphereGeometry args={[0.22, 20, 20]} />
      <meshBasicMaterial color={item.color} transparent opacity={0.12} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[hovered ? 0.44 : 0.34, 0.008, 8, 48]} />
      <meshBasicMaterial color={item.color} transparent opacity={0.75} />
    </mesh>
    <sprite position={[0, -0.43, 0]} scale={[1.8, 0.28, 1]}>
      <spriteMaterial color="#e7efff" transparent opacity={hovered ? 1 : 0.78} />
    </sprite>
  </group>;
}

function SceneContent({ onSelect }: { onSelect: (target: string) => void }) {
  return <>
    <color attach="background" args={["#090d18"]} />
    <fog attach="fog" args={["#11182e", 7, 18]} />
    <ambientLight intensity={0.8} />
    <directionalLight position={[4, 7, 5]} intensity={2.1} color="#c5d5ff" />
    <pointLight position={[-4, 2, 2]} intensity={28} color="#8f70ff" distance={10} />
    <pointLight position={[4, 1, -1]} intensity={25} color="#58dff0" distance={10} />
    <StarField />
    <FloatingIsland />
    <FloatingShard position={[-3.7, 1.25, -0.5]} scale={1.2} color="#7868d9" speed={0.7} />
    <FloatingShard position={[3.8, 1.7, -1]} scale={0.85} color="#5ac8df" speed={0.9} />
    <FloatingShard position={[2.8, -1.2, 1]} scale={0.5} color="#9a83ff" speed={1.2} />
    {hotspots.map((item) => <Destination key={item.label} item={item} onSelect={onSelect} />)}
  </>;
}

export default function WorldScene({ onSelect }: { onSelect: (target: string) => void }) {
  return <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 1.1, 8.5], fov: 42 }}
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    onCreated={({ gl }) => { gl.setClearColor("#090d18", 0); }}
  >
    <SceneContent onSelect={onSelect} />
  </Canvas>;
}
