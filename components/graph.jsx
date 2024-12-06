'use client';

// import React, { useState } from 'react';
// import { Group } from '@visx/group';
// import { Text } from '@visx/text';

// const Graph = () => {
//   const [nodes, setNodes] = useState([
//     { id: 1, label: 'Your Word', x: 100, y: 100 },
//   ]);

//   // Add a new node on "+" click
//   const addNode = (side, id) => {
//     setNodes((prevNodes) => {
//       const newId = prevNodes.length + 1;
//       const offsetX = side === 'left' ? -200 : 200;
//       const baseNode = prevNodes.find((node) => node.id === id);
//       return [
//         ...prevNodes,
//         {
//           id: newId,
//           label: `Node ${newId}`,
//           x: baseNode.x + offsetX,
//           y: baseNode.y,
//         },
//       ];
//     });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <svg width={800} height={400}>
//         {nodes.map((node) => (
//           <Group key={node.id} top={node.y} left={node.x}>
//             {/* Rectangle */}
//             <rect
//               x={0}
//               y={0}
//               width={200}
//               height={50}
//               fill="#ADD8E6"
//               stroke="#000"
//               strokeWidth={1}
//               rx={10}
//             />
//             {/* Left "+" Sign Inside Rectangle */}
//             <Text
//               x={20}
//               y={25}
//               fontSize={20}
//               textAnchor="middle"
//               dy=".33em"
//               fill="#000"
//               cursor="pointer"
//               onClick={() => addNode('left', node.id)}
//             >
//               +
//             </Text>
//             {/* Label in Rectangle */}
//             <Text
//               x={100}
//               y={25}
//               fontSize={16}
//               textAnchor="middle"
//               dy=".33em"
//               fill="#000"
//             >
//               {node.label}
//             </Text>
//             {/* Right "+" Sign Inside Rectangle */}
//             <Text
//               x={180}
//               y={25}
//               fontSize={20}
//               textAnchor="middle"
//               dy=".33em"
//               fill="#000"
//               cursor="pointer"
//               onClick={() => addNode('right', node.id)}
//             >
//               +
//             </Text>
//           </Group>
//         ))}
//       </svg>
//     </div>
//   );
// };

// export default Graph;

import React, { useState } from 'react';
import { Group } from '@visx/group';
import { Text } from '@visx/text';

const Graph = () => {
  // Initialize nodes with expanded state for both left and right
  const [nodes, setNodes] = useState([
    {
      id: 1,
      label: 'Root Node',
      x: 500,
      y: 300,
      expandedLeft: false,
      expandedRight: false,
    },
  ]);

  // Toggle node expansion/collapse
  const toggleNode = (id, side) => {
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) => {
        if (node.id === id) {
          // Toggle the expanded state for the respective side (left or right)
          if (side === 'left') {
            return { ...node, expandedLeft: !node.expandedLeft };
          } else if (side === 'right') {
            return { ...node, expandedRight: !node.expandedRight };
          }
        }
        return node;
      });

      const baseNode = prevNodes.find((node) => node.id === id);

      if (side === 'left' && !baseNode.expandedLeft) {
        // If expanding left, add new left child node
        const newId = prevNodes.length + 1;
        return [
          ...updatedNodes,
          {
            id: newId,
            label: `Node ${newId}`,
            x: baseNode.x - 200,
            y: baseNode.y + 100,
            parentId: id,
            expandedLeft: false,
            expandedRight: false,
            direction: 'left',
          },
        ];
      } else if (side === 'right' && !baseNode.expandedRight) {
        // If expanding right, add new right child node
        const newId = prevNodes.length + 1;
        return [
          ...updatedNodes,
          {
            id: newId,
            label: `Node ${newId}`,
            x: baseNode.x + 200,
            y: baseNode.y + 100,
            parentId: id,
            expandedLeft: false,
            expandedRight: false,
            direction: 'right',
          },
        ];
      }

      // If collapsing, remove all child nodes recursively for the specified direction
      return removeChildrenRecursively(updatedNodes, id, side);
    });
  };

  // Function to remove all children of a given node recursively
  const removeChildrenRecursively = (nodes, parentId, side) => {
    let nodesToKeep = nodes.filter(
      (node) => !(node.parentId === parentId && node.direction === side)
    );
    const children = nodes.filter(
      (node) => node.parentId === parentId && node.direction === side
    );

    children.forEach((child) => {
      nodesToKeep = removeChildrenRecursively(nodesToKeep, child.id, 'left');
      nodesToKeep = removeChildrenRecursively(nodesToKeep, child.id, 'right');
    });

    return nodesToKeep;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <svg width={1200} height={800}>
        {nodes.map((node) => (
          <Group key={node.id} top={node.y} left={node.x}>
            {/* Rectangle */}
            <rect
              x={0}
              y={0}
              width={200}
              height={50}
              fill="#ADD8E6"
              stroke="#000"
              strokeWidth={1}
              rx={10}
            />
            {/* Label in Rectangle */}
            <Text
              x={100}
              y={25}
              fontSize={16}
              textAnchor="middle"
              dy=".33em"
              fill="#000"
            >
              {node.label}
            </Text>
            {/* Left Sign Inside Rectangle */}
            <Text
              x={20}
              y={25}
              fontSize={20}
              textAnchor="middle"
              dy=".33em"
              fill="#000"
              cursor="pointer"
              onClick={() => toggleNode(node.id, 'left')}
            >
              {node.expandedLeft ? '-' : '+'}
            </Text>
            {/* Right Sign Inside Rectangle */}
            <Text
              x={180}
              y={25}
              fontSize={20}
              textAnchor="middle"
              dy=".33em"
              fill="#000"
              cursor="pointer"
              onClick={() => toggleNode(node.id, 'right')}
            >
              {node.expandedRight ? '-' : '+'}
            </Text>
          </Group>
        ))}
      </svg>
    </div>
  );
};

export default Graph;
