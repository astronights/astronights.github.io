import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import { Skills } from '../types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const SkillNet = (props: { skills: Skills; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const graphRef = useRef<ForceGraphMethods>();
  const [width, setWidth] = useState(0);
  const { isDark } = useTheme();

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    graphRef.current?.d3Force('charge')?.strength(-12);
    graphRef.current?.d3Force('link')?.distance((link: any) =>
      link.level === 1 ? 10 : link.level === 2 ? 15 : link.level === 3 ? 20 : 25
    );
    graphRef.current?.d3ReheatSimulation();
    graphRef.current?.cameraPosition({ x: 20, y: 0, z: 320 }, { x: 0, y: 0, z: 0 }, 1000);
    graphRef.current?.zoomToFit(1500, 1500);
  }, [graphRef]);

  return (
    <div ref={ref}>
      <ForceGraph3D
        ref={graphRef}
        graphData={props.skills.graph}
        nodeAutoColorBy="group"
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 10;
          return sprite;
        }}
        linkWidth={isDark ? 0.2 : 0.9}
        linkColor={isDark ? '#52525b' : '#d4d4d8'}
        backgroundColor={isDark ? '#09090b' : '#f4f4f5'}
        height={window.visualViewport!.height / 1.3}
        width={width > 0 ? width : 800}
      />
    </div>
  );
};

export default SkillNet;
