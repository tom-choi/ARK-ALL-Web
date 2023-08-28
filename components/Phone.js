import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export function Phone(){
  const boxref1 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get the elapsed time
  
    // Calculate the rotation
    // boxref1.current.rotation.y += 0.01;
  });

  const fbx = useLoader(FBXLoader, '/model/91-21-iphonex/Iphone seceond version finished.fbx')

  return(
    <>
      <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45}/>
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>

      <spotLight 
        color={[1, 1, 0]}
        intensity={1555.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 5]}
        castShadow
        shadowBias={-0.0001}
      />
      <primitive object={fbx} position={[5,5,5]}/>
    </>
  )
}
