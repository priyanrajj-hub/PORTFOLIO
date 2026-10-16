import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Interactive Quantum Core Geometry
function QuantumCore() {
  const outerMesh = useRef<THREE.Mesh>(null!);
  const innerMesh = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (outerMesh.current) {
      outerMesh.current.rotation.x += delta * 0.2;
      outerMesh.current.rotation.y += delta * 0.3;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.x -= delta * 0.4;
      innerMesh.current.rotation.z += delta * 0.35;
    }
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.5;
      ring1.current.rotation.y += delta * 0.25;
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.3;
      ring2.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
      <group position={[0, 0, 0]}>
        {/* Core Icosahedron Wireframe */}
        <mesh ref={outerMesh}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Solid Pulsing Crystal */}
        <mesh ref={innerMesh}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#9333ea"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Orbiting Gyroscope Ring 1 */}
        <mesh ref={ring1}>
          <torusGeometry args={[3.0, 0.03, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" wireframe={false} />
        </mesh>

        {/* Orbiting Gyroscope Ring 2 */}
        <mesh ref={ring2}>
          <torusGeometry args={[3.4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ec4899" wireframe={false} />
        </mesh>
      </group>
    </Float>
  );
}

// Dynamic Floating Particle Swarm
function ParticleField({ count = 250 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#38bdf8"
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export const Hero3DCanvas: React.FC<{ className?: string }> = ({ className = 'min-h-[420px] lg:min-h-[560px]' }) => {
  return (
    <div className={`w-full h-full relative pointer-events-auto ${className}`}>

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#c084fc" />
        <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
        
        <Stars radius={50} depth={50} count={1500} factor={4} saturation={0.5} fade speed={1.5} />
        <ParticleField count={300} />
        <QuantumCore />
      </Canvas>
    </div>
  );
};
