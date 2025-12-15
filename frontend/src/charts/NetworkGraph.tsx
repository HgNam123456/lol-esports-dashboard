// frontend/src/charts/NetworkGraph.tsx
import React from "react";
import ForceGraph2D, { GraphData } from "react-force-graph-2d";

type Node = { id: string };
type Link = { source: string; target: string; value: number; pairType?: string };

interface Props {
  nodes: Node[];
  links: Link[];
}

export default function NetworkGraph({ nodes, links }: Props) {
  const data: GraphData = { nodes, links };

  return (
    <div style={{ height: 500 }}>
      <ForceGraph2D
        graphData={data}
        nodeLabel={(node) => (node as any).id}
        nodeAutoColorBy="id"
        linkWidth={(link) => Math.max(1, (link as any).value)}
        linkColor={(link) => {
          const pt = (link as any).pairType as string | undefined;
          if (pt === "MID_JNG") return "#38bdf8"; // xanh cho mid‑jng
          if (pt === "BOT_SUP") return "#f97316"; // cam cho bot‑sup
          return "rgba(148, 163, 184, 0.6)";
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
      />
    </div>
  );
}
