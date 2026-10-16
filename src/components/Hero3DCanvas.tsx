import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { THEME } from '../theme';

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
            color={THEME.accent}
            wireframe
            emissive={THEME.accent}
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Solid Stark Copper Core */}
        <mesh ref={innerMesh}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color={THEME.accent2}
            emissive={THEME.accent2}
            emissiveIntensity={0.85}
            roughness={0.15}
            metalness={0.85}
            wireframe={false}
          />
        </mesh>

        {/* Orbiting Gyroscope Ring 1 (Gold) */}
        <mesh ref={ring1}>
          <torusGeometry args={[3.0, 0.035, 16, 100]} />
          <meshBasicMaterial color={THEME.accent} />
        </mesh>

        {/* Orbiting Gyroscope Ring 2 (Copper/Plasma Accent) */}
        <mesh ref={ring2}>
          <torusGeometry args={[3.45, 0.02, 16, 100]} />
          <meshBasicMaterial color={THEME.accent2} />
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
        color={THEME.accent}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export const Hero3DCanvas: React.FC<{ className?: string }> = ({ className = 'min-h-[220px] max-h-[260px]' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [particleCount, setParticleCount] = useState(180);

  useEffect(() => {
    // 1. Check WebGL support
    setHasWebGL(checkWebGLSupport());

    // 2. Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // 3. Adapt particle count for low-end / mobile hardware
    const isLowPower = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || window.innerWidth < 768;
    setParticleCount(isLowPower ? 50 : 180);

    // 4. Pause rendering when tab is hidden or canvas scrolled out of view
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Static Fallback for reduced motion or no WebGL
  if (!hasWebGL || reducedMotion) {
    return (
      <div ref={containerRef} className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}>
        <img
          src="./jarvis-core.png"
          alt="J.A.R.V.I.S. Arc Reactor Hologram Core"
          className="w-48 h-48 object-contain arc-glow rounded-full opacity-90"
          width="192"
          height="192"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`w-full h-full relative pointer-events-auto ${className}`}>
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.8} color={THEME.accent} />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color={THEME.accent2} />
          <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
          
          <Stars radius={45} depth={40} count={particleCount * 4} factor={3} saturation={0.4} fade speed={1} />
          <ParticleField count={particleCount} reducedMotion={false} />
          <QuantumCore reducedMotion={false} />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#07080d]/60">
          <div className="w-16 h-16 rounded-full border border-amber-400/20 flex items-center justify-center text-xs font-mono text-[#9a9aa8]">
            STANDBY
          </div>
        </div>
      )}
    </div>
  );
};
