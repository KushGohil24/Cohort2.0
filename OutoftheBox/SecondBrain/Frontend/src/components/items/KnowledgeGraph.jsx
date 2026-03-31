import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import api from '../../services/api';

const KnowledgeGraph = ({ onNodeClick }) => {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const graphRef = useRef();

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const { data: graphData } = await api.get('/items/graph');
        setData(graphData);
      } catch (err) {
        console.error('Failed to fetch graph data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-slate-950/20 border border-white/5 rounded-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Color Mapping
  const colors = {
    tag: '#818cf8',
    youtube: '#ef4444',
    tweet: '#1da1f2',
    article: '#10b981',
    pdf: '#f59e0b',
    image: '#8b5cf6',
    note: '#94a3b8'
  };

  // Icon Mapping (Material Symbols chars)
  const icons = {
    tag: 'hub',
    youtube: 'play_circle',
    tweet: 'chat',
    article: 'article',
    pdf: 'picture_as_pdf',
    image: 'image',
    note: 'description'
  };

  return (
    <div className="w-full h-[750px] bg-slate-950/60 relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl group">
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        onNodeClick={(node) => {
          if (node && node.group === 'item') {
            // Zoom to node
            if (graphRef.current) {
               // Focus camera on node
               graphRef.current.centerAt(node.x, node.y, 800);
               graphRef.current.zoom(4, 800);
            }
            // Trigger detail drawer
            if (onNodeClick) onNodeClick(node);
          }
        }}
        cooldownTicks={100}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.4}
        
        // Link Styling
        linkColor={link => link.type === 'semantic-link' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(255, 255, 255, 0.1)'}
        linkWidth={link => link.type === 'semantic-link' ? 1.5 : 0.5}
        linkDirectionalParticles={link => link.type === 'semantic-link' ? 3 : 0}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleColor={() => '#818cf8'}

        onBackgroundClick={() => {
          // Zoom out on background click
          if (graphRef.current) {
            graphRef.current.zoomToFit(800, 100);
          }
        }}

        nodeCanvasObject={(node, ctx, globalScale) => {
          const size = (node.val || 2) * 2;
          const color = colors[node.type || node.group] || colors.note;
          
          // 1. Draw Glow
          ctx.shadowColor = color;
          ctx.shadowBlur = 15 / globalScale;
          
          // 2. Draw Circle Background
          ctx.fillStyle = node.group === 'tag' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(15, 23, 42, 0.9)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
          ctx.fill();
          
          // Outer Border
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5 / globalScale;
          ctx.stroke();
          
          // Reset shadow
          ctx.shadowBlur = 0;

          // 3. Draw Icon (Material Symbols)
          const icon = icons[node.type || node.group] || icons.note;
          const fontSize = size * 1.2;
          ctx.font = `${fontSize}px "Material Symbols Outlined"`;
          ctx.fillStyle = color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(icon, node.x, node.y);

          // 4. Draw Label (zoomed in)
          if (globalScale > 2.5) {
            const label = node.name;
            const labelFontSize = 10 / globalScale;
            ctx.font = `${labelFontSize}px Inter, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.fillText(label, node.x, node.y + size + labelFontSize + 2);
          }
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const size = Math.max((node.val || 2) * 4, 12); // Maximum click area for "Zoom Cursor" feel
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        onNodeHover={(node) => {
          if (graphRef.current) {
            const canvas = graphRef.current.getCanvasElement?.();
            if (canvas) {
              if (node) {
                 canvas.style.cursor = node.group === 'item' ? 'zoom-in' : 'pointer';
              } else {
                 canvas.style.cursor = 'grab';
              }
            }
          }
        }}

      />
      
      {/* Legend & Controls */}
      <div className="absolute top-6 left-8 pointer-events-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            <span className="material-symbols-outlined text-xl">hub</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Semantic Galaxy</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Neural Knowledge Mapping</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 flex flex-col gap-2 scale-75 origin-bottom-right">
        <div className="px-4 py-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/5 space-y-2">
           <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> YouTube
           </div>
           <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#1da1f2]"></span> Tweet
           </div>
           <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#818cf8]"></span> Tag Hub
           </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
