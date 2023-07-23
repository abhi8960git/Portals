/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.4 public/models/Warrior.gltf -o src/components/Warrior.jsx -r public
*/

import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Warrior(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Warrior.gltf')
  const { actions } = useAnimations(animations, group)
  console.log(actions);
setTimeout(()=>{
  actions["Sword_Attack"].play({once:true})
  setInterval(() => {
    actions["Sword_Attack"].stop();
  }, 2000);

},2000)
  useEffect(()=>{
    actions["Idle"].reset().fadeIn(0.5).play();
    return ()=> actions["Idle"].fadeOut(0.5);

  },[])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Warrior_Body" geometry={nodes.Warrior_Body.geometry} material={materials.Warrior_Texture} skeleton={nodes.Warrior_Body.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Warrior.gltf')