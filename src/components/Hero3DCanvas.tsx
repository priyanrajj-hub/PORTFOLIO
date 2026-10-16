import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Stark Arc Reactor Quantum Core Geometry
function QuantumCore({ reducedMotion }: { reducedMotion: boolean }) {
  const outerMesh = useRef<THREE.Mesh>(null!);
  const innerMesh = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (outerMesh.current) {
      outerMesh.current.rotation.x += delta * 0.18;
      outerMesh.current.rotation.y += delta * 0.25;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.x -= delta * 0.35;
      innerMesh.current.rotation.z += delta * 0.3;
    }
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.45;
      ring1.current.rotation.y += delta * 0.22;
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.28;
      ring2.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 2} rotationIntensity={reducedMotion ? 0 : 0.8} floatIntensity={reducedMotion ? 0 : 1.2}>
      <group position={[0, 0, 0]}>
        {/* Arc Reactor Gold Icosahedron Wireframe */}
        <mesh ref={outerMesh}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial
            color="#ffb703"
            wireframe
            emissive="#ff9e00"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Solid Stark Copper Core */}
        <mesh ref={innerMesh}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#ff6b35"
            emissive="#e85d04"
            emissiveIntensity={0.85}
            roughness={0.15}
            metalness={0.85}
            wireframe={false}
          />
        </mesh>

        {/* Orbiting Gyroscope Ring 1 (Gold) */}
        <mesh ref={ring1}>
          <torusGeometry args={[3.0, 0.035, 16, 100]} />
          <meshBasicMaterial color="#ffb703" />
        </mesh>

        {/* Orbiting Gyroscope Ring 2 (Cyber Cyan Accents) */}
        <mesh ref={ring2}>
          <torusGeometry args={[3.45, 0.02, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </Float>
  );
}

// Dynamic Floating Gold Particle Swarm
function ParticleField({ count = 200, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return;
    points.current.rotation.y += delta * 0.04;
    points.current.rotation.x += delta * 0.015;
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
        size={0.065}
        color="#ffb703"
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

export const Hero3DCanvas: React.FC<{ className?: string }> = ({ className = 'min-h-[220px] max-h-[260px]' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Pause rendering when canvas is scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative pointer-events-auto ${className}`}>
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]} // Capped at 1.5 for optimal 60fps performance on mobile & high-DPI displays
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.8} color="#ffb703" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#ff6b35" />
          <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
          
          <Stars radius={45} depth={40} count={reducedMotion ? 400 : 1000} factor={3} saturation={0.4} fade speed={reducedMotion ? 0 : 1} />
          <ParticleField count={reducedMotion ? 60 : 200} reducedMotion={reducedMotion} />
          <QuantumCore reducedMotion={reducedMotion} />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#07080d]/60">
          <div className="w-16 h-16 rounded-full border border-amber-400/20 flex items-center justify-center text-xs font-mono text-[#9a9aa8]">
            PAUSED
          </div>
        </div>
      )}
    </div>
  );
};
