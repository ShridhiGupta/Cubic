'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface CubePieceProps {
  position: [number, number, number];
  color: string;
  onClick: () => void;
}

function CubePiece({ position, color, onClick }: CubePieceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial 
        color={color}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}

interface RubiksCubeProps {
  onFaceClick?: (face: string, position: number) => void;
}

export function RubiksCube({ onFaceClick }: RubiksCubeProps) {
  // Default cube state - each face has 9 pieces
  const [cubeState] = useState({
    // Front face (white)
    front: Array(9).fill('#ffffff'),
    // Back face (yellow)
    back: Array(9).fill('#ffff00'),
    // Top face (blue)
    top: Array(9).fill('#0000ff'),
    // Bottom face (green)
    bottom: Array(9).fill('#00ff00'),
    // Left face (orange)
    left: Array(9).fill('#ff8800'),
    // Right face (red)
    right: Array(9).fill('#ff0000'),
  });

  const handlePieceClick = (face: string, index: number) => {
    if (onFaceClick) {
      onFaceClick(face, index);
    }
  };

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Front face */}
        {cubeState.front.map((color, index) => {
          const x = (index % 3) - 1;
          const y = Math.floor(index / 3) - 1;
          return (
            <CubePiece
              key={`front-${index}`}
              position={[x, y, 1.5]}
              color={color}
              onClick={() => handlePieceClick('front', index)}
            />
          );
        })}

        {/* Back face */}
        {cubeState.back.map((color, index) => {
          const x = (index % 3) - 1;
          const y = Math.floor(index / 3) - 1;
          return (
            <CubePiece
              key={`back-${index}`}
              position={[-x, y, -1.5]}
              color={color}
              onClick={() => handlePieceClick('back', index)}
            />
          );
        })}

        {/* Top face */}
        {cubeState.top.map((color, index) => {
          const x = (index % 3) - 1;
          const z = (Math.floor(index / 3) - 1) * -1;
          return (
            <CubePiece
              key={`top-${index}`}
              position={[x, 1.5, z]}
              color={color}
              onClick={() => handlePieceClick('top', index)}
            />
          );
        })}

        {/* Bottom face */}
        {cubeState.bottom.map((color, index) => {
          const x = (index % 3) - 1;
          const z = Math.floor(index / 3) - 1;
          return (
            <CubePiece
              key={`bottom-${index}`}
              position={[x, -1.5, z]}
              color={color}
              onClick={() => handlePieceClick('bottom', index)}
            />
          );
        })}

        {/* Left face */}
        {cubeState.left.map((color, index) => {
          const z = (index % 3) - 1;
          const y = Math.floor(index / 3) - 1;
          return (
            <CubePiece
              key={`left-${index}`}
              position={[-1.5, y, z]}
              color={color}
              onClick={() => handlePieceClick('left', index)}
            />
          );
        })}

        {/* Right face */}
        {cubeState.right.map((color, index) => {
          const z = (Math.floor(index / 3) - 1) * -1;
          const y = Math.floor(index / 3) - 1;
          return (
            <CubePiece
              key={`right-${index}`}
              position={[1.5, y, z]}
              color={color}
              onClick={() => handlePieceClick('right', index)}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
