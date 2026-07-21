"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"

function Particles({ count = 120, color = "#3b82f6" }: { count?: number; color?: string }) {
  const points = useRef<THREE.Points>(null!)
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      speeds[i] = 0.2 + Math.random() * 0.6
    }
    return { positions, speeds }
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const arr = points.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      arr[ix + 1] += Math.sin(t * speeds[i] + i) * 0.002
      arr[ix] += Math.cos(t * speeds[i] * 0.7 + i) * 0.0015
    }
    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y = t * 0.04
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function SoftOrb({ color = "#3b82f6" }: { color?: string }) {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    mesh.current.rotation.x = t * 0.15
    mesh.current.rotation.y = t * 0.22
    mesh.current.position.y = Math.sin(t * 0.6) * 0.15
  })

  return (
    <mesh ref={mesh} scale={1.35}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

export type AmbientFieldProps = {
  mode?: "particles" | "orb" | "both"
  color?: string
  className?: string
}

export function AmbientField({
  mode = "both",
  color = "#3b82f6",
}: AmbientFieldProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="h-full w-full"
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={1.2} color={color} />
      {(mode === "particles" || mode === "both") && (
        <Particles color={color} count={mode === "both" ? 90 : 140} />
      )}
      {(mode === "orb" || mode === "both") && <SoftOrb color={color} />}
    </Canvas>
  )
}
