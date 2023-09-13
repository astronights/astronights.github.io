import ReactFlow, { Background, Handle, Position, ReactFlowProvider, useReactFlow } from 'reactflow';
import { Study } from '../types';
import { Card } from '@chakra-ui/react';
import 'reactflow/dist/style.css';
import '../assets/css/neuralnet.sass'

const NeuralNetNode = ({ data }) => {
  
    return (
      <div className="nn-node">
        <Handle id='left' type="target" position={Position.Left} />
        <Handle id='top' type="target" position={Position.Top} />
        <div>
          <img src={data.image}/>
        </div>
        <Handle id='right' type="source" position={Position.Right} />
        <Handle id='bottom' type="source" position={Position.Bottom} />
      </div>
    );
  }

const Flow = (props: { education: Study[] }) => {
    const reactFlowInstance = useReactFlow();
    const nodeTypes = { nnNode: NeuralNetNode };

    const nodes = props.education.map((edu) => ({
        id: edu.node.toString(),
        position: {
            x: 100 * edu.node,
            y: Number.isInteger(edu.node) ? 100 : 100 + 100 * (edu.node - Math.floor(edu.node))
        },
        type: 'nnNode',
        data: { label: edu.node, image: edu.image },
    }));

    const edges = props.education.filter((edu) =>
        Number.isInteger(edu.node) && edu.node > 0).map((edu) => ({
            id: `${edu.node - 1}to${edu.node}`,
            source: (edu.node - 1).toString(),
            target: edu.node.toString(),
        }));

    return (
        <Card variant='elevated' style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
                fitView={true} snapToGrid={true}
                panOnDrag={false} panOnScroll={false} 
                zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}>
                <Background />
            </ReactFlow>
        </Card>
    )
}

const EduNeuralNet = (props: { education: Study[] }) => {

    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default EduNeuralNet;