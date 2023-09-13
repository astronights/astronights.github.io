import ReactFlow, { Background, Handle, Position, ReactFlowProvider, useReactFlow } from 'reactflow';
import { Study } from '../types';
import { Card, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import 'reactflow/dist/style.css';
import '../assets/css/neuralnet.sass';
import range from '../utils';

const NeuralNetNode = ({ data }) => {

    return (
        <div className='nn-node'>
            <Handle key={'source'} id={'Right'} type={'source'}
                position={Position.Right} isConnectable={false} />
            <Handle key={'target'} id={'Left'} type={'target'}
                position={Position.Left} isConnectable={false} />
            <img alt={data.alt} src={data.image} />
            {data.country &&
                <img alt={data.country} className='flag'
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.country}.svg`} />}
        </div>
    );
}

const InfinityNode = ({ data }) => {

    const handlerMap = { 'source': 'Right', 'target': 'Left' }

    return (
        <div className='infinity-node'>
            <Handle id={handlerMap[data.type]} type={data.type}
                position={Position[handlerMap[data.type]]}
                isConnectable={false} />
            <Text>{data.text}</Text>
        </div>
    );
}

const ParentNode = ({ data }) => {

    return (
        <div className='parent-node'>
            <Text>{data.text}</Text>
        </div>
    );
}

const nodeTypes = { nnNode: NeuralNetNode, infinityNode: InfinityNode, parentNode: ParentNode };
const activationFunctions = ['tanh', 'relu', 'tanh']

const Flow = (props: { education: Study[], updateSelected: (value: number) => void }) => {
    const reactFlowInstance = useReactFlow();

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {

        let graphNodes = []
        let graphEdges = []
        let x = 0;
        let y = 100;

        graphNodes.push({
            id: '0',
            position: { x, y },
            type: 'infinityNode',
            data: { label: 0, text: 'Early Life', type: 'source' },
        })

        x += 50;

        graphEdges.push({
            id: '0to1',
            source: '0',
            target: '1',
        })

        const groups = _.groupBy(props.education, (edu) => Math.floor(edu.node));
        Object.entries(groups).forEach(([key, items]) => {

            graphNodes.push({
                id: `${key}g`,
                position: { x: x + 70, y: y - 120 },
                type: 'parentNode',
                data: {
                    label: key, text: items[0].title
                },
                style: { width: `${120 + (items.length > 1 ? 80 : 0)}px` }
            });

            x += 75;

            graphNodes.push({
                id: key.toString(),
                position: { x, y },
                type: 'nnNode',
                data: {
                    label: key, image: items[0].image,
                    alt: items[0].institution,
                    country: items[0].country
                }
            });

            const activations = (items.length > 1) ? 2 : 1;

            if (items.length > 1) {
                x += 75;
                const ySplits = range((100 - 15 * (items.length - 1)), (100 + 15 * (items.length - 1)), items.length - 1);
                items.slice(1).forEach((item, index) => {
                    graphNodes.push({
                        id: item.node.toString(),
                        position: { x, y: ySplits[index] },
                        type: 'nnNode',
                        data: {
                            label: item.node, image: item.image,
                            alt: item.institution,
                            country: item.country
                        }
                    })

                    graphEdges.push(
                        {
                            id: `${key}to${item.node}`,
                            source: key.toString(),
                            target: item.node.toString(),
                            type: 'straight'
                        });

                    Array(activations).fill(0).forEach((_, index) => {
                        graphEdges.push(
                            {
                                id: `${item.node}to${item.node}a${index + 1}`,
                                source: item.node.toString(),
                                target: `${key}a${index + 1}`,
                                type: 'straight'
                            });
                    });
                });
            } else {
                graphEdges = graphEdges.concat([{
                    id: `${key}to${key}a`,
                    source: key.toString(),
                    target: `${key}a1`,
                    type: 'straight',
                }, {
                    id: `${key}ato${parseInt(key) + 1}`,
                    source: `${key}a1`,
                    target: (parseInt(key) + 1).toString(),
                    type: 'straight'
                }]);
            }

            x += 75;

            Array(activations).fill(0).forEach((_, index) => {
                graphNodes.push({
                    id: `${key}a${index + 1}`,
                    position: { x: x, y: (activations === 1) ? 100 : 80 + 40 * index },
                    type: 'nnNode',
                    data: {
                        label: key, image: `/images/${activationFunctions[index]}.png`,
                        alt: activationFunctions[index]
                    }
                });

                graphEdges.push(
                    {
                        id: `${key}a${index + 1}to${parseInt(key) + 1}`,
                        source: `${key}a${index + 1}`,
                        target: (parseInt(key) + 1).toString(),
                        type: 'straight'
                    });
            });

        });

        const lastNode = props.education.length !== 0 ? props.education.slice(-1)[0].node + 1 : 99;

        graphNodes.push({
            id: lastNode.toString(),
            position: { x: x + 100, y },
            type: 'infinityNode',
            data: {
                label: lastNode,
                text: 'Present', type: 'target'
            },
        });

        setNodes(graphNodes);
        setEdges(graphEdges);

        // TODO: Make this fit Bounds dynamic
        // reactFlowInstance.fitBounds({ x: 90, y: 10, width: xCounter - 50, height: 200 });

    }, [props.education, reactFlowInstance]);

    const onNodeClick = (_, node) => {
        console.log(parseFloat(node.id))
        props.updateSelected(parseFloat(node.id))
    }

    return (
        <Card variant='elevated' style={{ width: '100vw', height: '50vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                edgesFocusable={false}
                snapToGrid={true}
                zoomOnScroll={false} zoomOnDoubleClick={false} panOnScroll={false}
            // panOnDrag={false} 
            // zoomOnScroll={false} zoomOnPinch={false} 
            >
                <Background gap={10} />
            </ReactFlow>
        </Card>
    )
}

const EduNeuralNet = (props: { education: Study[], updateSelected: (value: number) => void }) => {

    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default EduNeuralNet;