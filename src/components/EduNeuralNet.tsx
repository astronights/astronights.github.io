import ReactFlow, { Background, Handle, Position, ReactFlowProvider } from 'reactflow';
import { Study } from '../types';
import { Card, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import lodash from 'lodash';
import 'reactflow/dist/style.css';
import '../assets/css/neuralnet.sass';
import range from '../utils';

const hoverColor = '#7996a04d';

const bgColor = (hover, selected, item, selectColor) => {
    console.log(selected.map(String), item)
    return hover.includes(item) ? hoverColor :
        (selected.map(String).includes(item.split('a')[0].split('g')[0]) ?
            selectColor : 'transparent')
}

const NeuralNetNode = ({ data }) => {

    return (
        <div className='nn-node' style={data.style}>
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

const ParentNode = ({ data }) => {

    return (
        <div className='parent-node' style={data.style}>
            <Text>{data.text}</Text>
        </div>
    );
}

const nodeTypes = { nnNode: NeuralNetNode, parentNode: ParentNode };
const activationFunctions = ['tanh', 'relu', 'tanh']

const Flow = (props: { education: Study[], color: string, updateSelected: (value: number) => void, selected: number[] }) => {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [hover, setHover] = useState([]);

    useEffect(() => {

        let graphNodes = []
        let graphEdges = []
        let x = 0;
        let y = 100;

        console.log(props.selected)

        const groups = lodash.groupBy(props.education, (edu) => Math.floor(edu.node));
        Object.entries(groups).forEach(([key, items]) => {

            graphNodes.push({
                id: `${key}g`,
                position: { x: x + 70, y: y - 120 },
                type: 'parentNode',
                data: {
                    label: key, text: items[0].title,
                    style: { backgroundColor: bgColor(hover, props.selected, `${key}g`, props.color) }
                },
                style: { width: `${120 + (items.length > 1 ? 80 : 0)}px` }
            });

            x += 75;

            graphNodes.push({
                id: key,
                position: { x, y },
                type: 'nnNode',
                data: {
                    label: key, image: items[0].image,
                    alt: items[0].institution,
                    country: items[0].country,
                    style: { backgroundColor: bgColor(hover, props.selected, key, props.color) }
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
                            country: item.country,
                            style: { backgroundColor: bgColor(hover, props.selected, item.node.toString(), props.color) }
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
                        alt: activationFunctions[index],
                        style: { backgroundColor: bgColor(hover, props.selected, `${key}a${index + 1}`, props.color) }
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

        setNodes(graphNodes);
        setEdges(graphEdges);

    }, [props.education, props.selected, hover, props.color]);

    const handleNodeClick = (_, node) => {
        props.updateSelected(parseFloat(node.id))
    }

    const handleTouchMove = (_, node) => {
        if (node.id.includes('.')) {
            setHover([node.id]);
        } else if (node.id.includes('a')) {
            setHover(nodes.filter((n) => n.id.startsWith(node.id.split('a')[0])
                && !n.id.includes('.')).map((n) => n.id));
        } else {
            setHover(nodes.filter((n) => n.id.startsWith(node.id.replace('g', ''))).map((n) => n.id));
        }
    }

    const height = window.visualViewport.width < 512 ? 35 : (window.visualViewport.width < 968 ? 25 : 50)

    return (
        <Card variant='elevated' style={{ width: '100vw', height: `${height}vh` }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
                onNodeClick={handleNodeClick}
                edgesFocusable={false}
                snapToGrid={true}
                zoomOnScroll={false} zoomOnDoubleClick={false} panOnScroll={false}
                onNodeMouseEnter={handleTouchMove}
                onNodeMouseLeave={() => setHover([])}
                maxZoom={1.1} minZoom={0.9}
                translateExtent={[[50, -35], [550, 200]]}
            >
                <Background gap={10} />
            </ReactFlow>
        </Card>
    )
}

const EduNeuralNet = (props: {
    education: Study[], color: string,
    updateSelected: (value: number) => void, selected: number[]
}) => {

    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default EduNeuralNet;