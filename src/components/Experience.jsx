import { OrbitControls, useTexture, Environment, MeshPortalMaterial, RoundedBox ,Text, CameraControls, useCursor} from "@react-three/drei";
import * as THREE from 'three';
import { Monk } from "./Monk";
import { Children, useEffect } from "react";
import { Cleric } from "./Cleric";
import { Warrior } from "./Warrior";
import { useState ,useRef} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as easing from "maath/easing";
export const Experience = () => {
  

  const [active , setActive] = useState(null)
  // const [active , setActive] = useState(null)
  // useCursor(hovered)
  const map = useTexture(
    "textures/anime_art_style_a_futuristic_cityscape_with_flying.jpg"
  )
  const controlsRef = useRef();
  const scene = useThree((state)=> state.scene);

  useEffect(()=>{
    if(active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z, 
        true,
      )
    }else{
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true,
      )
    }
      
  },[active])


  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <Environment preset="sunset"/> */}
      <CameraControls ref={controlsRef}  maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6}/>
      <MonsterStage 
      name="Monk"
      color="#50473d"
      texture={"textures/claymation_a_supernatural_story_with_monks_battlin.jpg"}
      active={active}
      setActive={setActive}
       >
        <Monk scale={0.6} position-y={-1}></Monk>
      </MonsterStage>
      <MonsterStage
      name="Cleric"
       color="#947b4a"
       texture={"textures/advanced_no_style_a_coming-of-age_story_about_a_.jpg"} position-x={-2.5} rotation-y={Math.PI / 8}
       active={active}
       setActive={setActive}
        >
        <Cleric scale={0.6} position-y={-1}></Cleric>
      </MonsterStage>

      <MonsterStage 

      name="Warrior"
      color="#7d8587"
      texture={"textures/fantasy_lands_a_fantasy_world_with_warriors_battli.jpg"} position-x={2.5} rotation-y={ -Math.PI / 8} 
      active={active}
      setActive={setActive}
      >
        <Warrior scale={0.6} position-y={-1}></Warrior>
      </MonsterStage>




    </>
  );
};

const MonsterStage = ({ texture,children,name,color,active, setActive, ...props }) => {
  const portalMaterial = useRef();
  useFrame(( _state, delta)=>{
    const worldOpen = active === name ;
    easing.damp(portalMaterial.current , "blend", worldOpen ? 1: 0 , 0.2, delta)
  })

  const map = useTexture(
    texture
  )



  return <group {...props}>
    <Text font="fonts/JANCIENT.TTF"
     fontSize={0.5}
     position={[0,-1.2,0.051 ]}
     anchorY={"bottom"}
     >{name}
     <meshBasicMaterial color={color} toneMapped={false}></meshBasicMaterial>
      </Text>
    <RoundedBox name={name} args={[2, 3, 0.1]} onDoubleClick={()=> setActive(active === name ? null : name)}>
      <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
        <ambientLight intensity={1} />
        {children}
        <mesh>
          <sphereGeometry args={[5, 64, 64]}></sphereGeometry>
          <meshStandardMaterial map={map} side={THREE.BackSide} />
        </mesh>
      </MeshPortalMaterial>
    </RoundedBox>
  </group>
}
