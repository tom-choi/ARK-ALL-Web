import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";

export function Map(){
  const planeRef1 = useRef(); // Add ref for the first plane
  const planeRef2 = useRef(); // Add ref for the second plane

  const [map, busm] = useLoader(TextureLoader,[
    "img/90304.png",
    "img/543bus.png",
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get the elapsed time
  
  });

  return(
    <>
      <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45}/>
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>

      <mesh ref={planeRef1} position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[5.05, 11.72]} /> {/* Set the size of the first plane */}
        <meshBasicMaterial map={map} /> {/* Assign the texture to the first plane */}
      </mesh>

      <mesh ref={planeRef2} position={[0, 0, -5]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[19.50, 33.50]} /> {/* Set the size of the second plane */}
        <meshBasicMaterial 
        map={busm}
        alphaTest={true} /> {/* Assign the texture to the second plane */}
      </mesh>
    </>
  )
}
