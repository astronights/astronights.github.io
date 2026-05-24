import ReactFlow, { Background, Handle, Position, ReactFlowProvider, useNodesState, useEdgesState } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import { useEffect, useRef, useState } from 'react';
import { Study } from '../types';
import 'reactflow/dist/style.css';

const InstitutionNode = ({ data }: { data: any }) => (
  <div style={{ position: 'relative', width: 44, height: 44 }}>
    <Handle type="target" position={Position.Left} style={{ opacity: 0, pointerEvents: 'none' }} />
    <div style={{
      width: 44, height: 44, borderRadius: '50%', overflow: 'hidden',
      border: `2px solid ${data.active ? (data.dark ? '#a1a1aa' : '#52525b') : (data.dark ? '#3f3f46' : '#d4d4d8')}`,
      background: data.dark ? '#71717a' : 'white',
      boxShadow: data.active ? `0 0 0 3px ${data.dark ? '#52525b' : '#d4d4d8'}` : 'none',
      opacity: data.active ? 1 : 0.25,
      transition: 'all 0.2s',
    }}>
      <img src={data.image} alt={data.label} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
    </div>
    {data.country && (
      <img
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${data.country}.svg`}
        alt={data.country}
        style={{
          position: 'absolute', bottom: 1, right: 0,
          width: 15, height: 10, objectFit: 'cover',
          borderRadius: 2, border: '1px solid rgba(0,0,0,0.15)',
          opacity: data.active ? 1 : 0.25, transition: 'opacity 0.2s',
        }}
      />
    )}
    <Handle type="source" position={Position.Right} style={{ opacity: 0, pointerEvents: 'none' }} />
  </div>
);

const SkillNode = ({ data }: { data: any }) => (
  <div style={{ position: 'relative', width: 72, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="target" position={Position.Left} style={{ opacity: 0, pointerEvents: 'none' }} />
    <div style={{
      width: '100%', textAlign: 'center',
      padding: '2px 0', borderRadius: 99,
      border: `1px solid ${data.active ? (data.dark ? '#71717a' : '#71717a') : (data.dark ? '#3f3f46' : '#e4e4e7')}`,
      background: data.active ? (data.dark ? '#27272a' : '#f4f4f5') : 'transparent',
      fontSize: 10, fontWeight: 500,
      color: data.active ? (data.dark ? '#d4d4d8' : '#27272a') : (data.dark ? '#52525b' : '#a1a1aa'),
      whiteSpace: 'nowrap', userSelect: 'none',
      transition: 'all 0.2s', cursor: 'default',
    }}>
      {data.label}
    </div>
    <Handle type="source" position={Position.Right} style={{ opacity: 0, pointerEvents: 'none' }} />
  </div>
);

const GroupBoxNode = ({ data }: { data: any }) => (
  <div style={{
    width: '100%', height: '100%', borderRadius: 8,
    border: `1px solid ${data.dark ? '#3f3f46' : '#d4d4d8'}`,
    background: data.dark ? 'rgba(39,39,42,0.25)' : 'rgba(244,244,245,0.35)',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden', pointerEvents: 'none',
  }}>
    <div style={{
      textAlign: 'center', padding: '6px 4px 5px',
      borderBottom: `1px solid ${data.dark ? '#3f3f46' : '#d4d4d8'}`,
    }}>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.02em',
        color: data.dark ? '#14b8a6' : '#0d9488',
        userSelect: 'none',
      }}>
        {data.label}
      </span>
    </div>
  </div>
);

const nodeTypes = { institution: InstitutionNode, skill: SkillNode, groupbox: GroupBoxNode };

function buildGraph(
  education: Study[],
  expanded: number[],
  isDark: boolean,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const backbone = education
    .filter(e => Number.isInteger(e.node))
    .sort((a, b) => a.node - b.node);

  if (backbone.length < 1) return { nodes, edges };

  const CW = 125; const CY = 125;
  const EX_GAP = 62; const ACT_GAP = 50;
  const PAD = 6; const HDR = 40; const FOOT = 8; const LIFT = 4;

  const isOn = (n: number) => expanded.includes(n);
  const activeStroke   = isDark ? '#71717a' : '#52525b';
  const inactiveStroke = isDark ? '#3f3f46' : '#d4d4d8';

  const eStyle = (active: boolean) => ({
    stroke: active ? activeStroke : inactiveStroke,
    strokeWidth: 1,
    opacity: active ? 0.7 : 0.18,
  });

  const instData = (edu: Study, active: boolean) => ({
    label: edu.institution, image: edu.image, country: edu.country,
    active, dark: isDark,
  });

  const skillData = (label: string, active: boolean) => ({
    label, active, dark: isDark,
  });

  const actY = (count: number, i: number) =>
    CY - ((count - 1) * ACT_GAP) / 2 + i * ACT_GAP;

  const mkGroup = (id: string, col: number, count: number, label: string) => ({
    id, type: 'groupbox' as const,
    draggable: false, selectable: false,
    position: { x: col * CW - PAD, y: actY(count, 0) - HDR - LIFT },
    style: { width: 72 + PAD * 2, height: (count - 1) * ACT_GAP + 44 + HDR + FOOT, pointerEvents: 'none' as const },
    data: { label, dark: isDark },
  });

  let col = 0;
  let prevActIds: string[] = [];
  let prevAnyActive = false;

  for (const inst of backbone) {
    const id = inst.node.toString();
    const instExchanges = education
      .filter(e => !Number.isInteger(e.node) && Math.floor(e.node) === inst.node)
      .sort((a, b) => a.node - b.node);
    const skills = inst.skills ?? [];
    const isActive = isOn(inst.node);
    const anyInGroup = [inst, ...instExchanges].some(e => isOn(e.node));

    // Place institution node
    nodes.push({ id, type: 'institution', position: { x: col * CW, y: CY }, data: instData(inst, isActive) });

    // Edges: previous activations → this institution
    prevActIds.forEach(actId =>
      edges.push({ id: `${actId}-${id}`, source: actId, target: id, type: 'straight', style: eStyle(prevAnyActive || isActive) })
    );
    col++;

    // Place exchange sub-nodes (if any)
    const exIds: string[] = [];
    if (instExchanges.length > 0) {
      const exStartY = CY - ((instExchanges.length - 1) * EX_GAP) / 2;
      instExchanges.forEach((ex, i) => {
        const exId = ex.node.toString();
        nodes.push({ id: exId, type: 'institution', position: { x: col * CW, y: exStartY + i * EX_GAP }, data: instData(ex, isOn(ex.node)) });
        edges.push({ id: `${id}-${exId}`, source: id, target: exId, type: 'straight', style: eStyle(isActive || isOn(ex.node)) });
        exIds.push(exId);
      });
      col++;
    }

    // Place skill activations (if any)
    const isFirstBackbone = backbone.indexOf(inst) === 0;
    if (skills.length > 0) {
      if (!isFirstBackbone) nodes.push(mkGroup(`group_${id}`, col, skills.length, inst.netLabel ?? inst.title));
      const actIds: string[] = [];
      const sources = exIds.length > 0 ? exIds : [id];
      skills.forEach((sk, i) => {
        const actId = `a${inst.node}_${i}`;
        nodes.push({ id: actId, type: 'skill', position: { x: col * CW, y: actY(skills.length, i) }, data: skillData(sk, anyInGroup) });
        sources.forEach(src =>
          edges.push({ id: `${src}-${actId}`, source: src, target: actId, type: 'straight', style: eStyle(anyInGroup) })
        );
        actIds.push(actId);
      });
      prevActIds = actIds;
      prevAnyActive = anyInGroup;
      col++;
    } else {
      prevActIds = [id];
      prevAnyActive = isActive;
    }
  }

  return { nodes, edges };
}

const Flow = ({ education, expanded, onToggleNode, onToggleGroup: _onToggleGroup, isDark }: {
  education: Study[];
  expanded: number[];
  onToggleNode: (n: number) => void;
  onToggleGroup: (group: number) => void;
  isDark: boolean;
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [hasDragged, setHasDragged] = useState(false);
  const originalPositions = useRef<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    const result = buildGraph(education, expanded, isDark);
    setEdges(result.edges);
    setNodes(prev => {
      if (prev.length === 0 || prev.length !== result.nodes.length) {
        originalPositions.current = Object.fromEntries(result.nodes.map(n => [n.id, n.position]));
        setHasDragged(false);
        return result.nodes;
      }
      return prev.map(n => {
        const next = result.nodes.find(nn => nn.id === n.id);
        if (!next) return n;
        // Non-draggable nodes (group boxes) always use the computed position
        if (next.draggable === false) return next;
        // Draggable nodes preserve the user's moved position
        return { ...next, position: n.position };
      });
    });
  }, [education, expanded, isDark]);

  const handleReset = () => {
    setNodes(prev => prev.map(n => {
      if (n.draggable === false) return n;
      return { ...n, position: originalPositions.current[n.id] ?? n.position };
    }));
    setHasDragged(false);
  };

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.type === 'institution') {
      onToggleNode(parseFloat(node.id));
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{
      position: 'relative', height: 280,
      background: isDark ? '#18181b' : '#fafafa',
      border: `1px solid ${isDark ? '#52525b' : '#a1a1aa'}`,
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onNodesChange={onNodesChange}
        onNodeDragStop={() => setHasDragged(true)}
        defaultEdgeOptions={{ type: 'straight' }}
        edgesFocusable={false}
        nodesConnectable={false}
        autoPanOnNodeDrag={false}
        snapToGrid
        snapGrid={[25, 25]}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        panOnScroll={false}
        panOnDrag={false}
        minZoom={0.5}
        maxZoom={1.2}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color={isDark ? '#3f3f46' : '#d4d4d8'} gap={25} size={1.5} />
      </ReactFlow>
      {hasDragged && (
        <button
          onClick={handleReset}
          style={{
            position: 'absolute', bottom: 8, right: 8, zIndex: 10,
            fontSize: 10, padding: '2px 8px', borderRadius: 4,
            border: `1px solid ${isDark ? '#3f3f46' : '#d4d4d8'}`,
            background: isDark ? '#27272a' : '#f4f4f5',
            color: isDark ? '#71717a' : '#a1a1aa',
            cursor: 'pointer', opacity: 0.75,
          }}
        >
          ↺ reset layout
        </button>
      )}
    </div>
  );
};

const EduNeuralNet = (props: {
  education: Study[];
  expanded: number[];
  onToggleNode: (n: number) => void;
  onToggleGroup: (group: number) => void;
  isDark: boolean;
}) => (
  <ReactFlowProvider>
    <Flow {...props} />
  </ReactFlowProvider>
);

export default EduNeuralNet;
