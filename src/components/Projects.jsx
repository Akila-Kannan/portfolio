import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Spin & Roll",
    url: "https://play.google.com/store/apps/details?id=com.hungamagamestudio.bb",
    image: "projects/spin_roll.png",
    description: "3d betting game with coins",
  },
  {
    title: "Jio Immersive",
    url: "https://play.google.com/store/apps/details?id=com.jiotesseract.mr.jxr&hl=en&gl=US",
    image: "projects/jio.png",
    description: "MR project includes jio cinema",
  },
  {
    title: "Ancient Thunder",
    url: "https://drive.google.com/file/d/1D4x0lRBk_X55zx5hAbGLFIEjfIMdsfjC/view?usp=sharing",
    image: "projects/ancient_thunder.png",
    description: "This is the keno game",
  },
 
  {
    title: "Stairs Runner",
    url: "https://drive.google.com/file/d/1oaqLzGEObqoAxfQubrmFlFmMMLj5vqDu/view?usp=drive_link",
    image: "projects/stair_runner.png",
    description: "Create a loading screen for your r3f projects",
  },
  {
    title: "Git HUB",
    url: "https://github.com/Akila-Kannan",
    image: "projects/github.png",
    description: "Use React Three Fiber to create a 3D game",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
