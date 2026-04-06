"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Phone } from "@/components/phone";

interface Tool {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  width: number;
  height: number;
  render: () => React.ReactNode;
}

const INITIAL_TOOLS: Tool[] = [
  // === LAYER 1: Directly on top of paper (bottom of pile) ===
  {
    id: "bigratchet",
    name: "Carraca grande",
    x: 25, y: 68, z: 1, rotation: 8, width: 160, height: 30,
    render: () => (
      <div style={{ width: 160, height: 30, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 8, width: 120, height: 14, background: "linear-gradient(180deg, #aaa 0%, #777 50%, #888 100%)", borderRadius: 2, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", right: 0, top: 1, width: 28, height: 28, background: "linear-gradient(135deg, #999 0%, #555 100%)", borderRadius: "50%", boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, background: "#333", borderRadius: 2 }} />
        </div>
        <div style={{ position: "absolute", left: -2, top: 5, width: 18, height: 20, background: "linear-gradient(180deg, #888 0%, #555 100%)", borderRadius: "8px 3px 3px 8px" }} />
      </div>
    ),
  },
  {
    id: "flatbar",
    name: "Palanca plana",
    x: 8, y: 72, z: 2, rotation: -12, width: 180, height: 16,
    render: () => (
      <div style={{ width: 180, height: 16, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 3, width: 180, height: 10, background: "linear-gradient(180deg, #777 0%, #555 50%, #666 100%)", borderRadius: "2px 6px 6px 2px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", right: 0, top: -2, width: 30, height: 14, background: "linear-gradient(180deg, #888 0%, #555 100%)", borderRadius: "0 8px 2px 0", transform: "skewX(-10deg)" }} />
        </div>
      </div>
    ),
  },
  // === LAYER 2: Covering the bottom tools ===
  {
    id: "wrench",
    name: "Llave inglesa",
    x: 15, y: 55, z: 3, rotation: -18, width: 140, height: 38,
    render: () => (
      <div style={{ width: 140, height: 38, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 10, width: 90, height: 18, background: "linear-gradient(180deg, #7a7a7a 0%, #555 40%, #666 60%, #4a4a4a 100%)", borderRadius: "3px 2px 2px 3px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.5)" }}>
          {[20,30,40,50,60].map(l=><div key={l} style={{position:"absolute",left:l,top:3,width:1,height:12,background:"rgba(0,0,0,0.2)"}}/>)}
        </div>
        <div style={{ position: "absolute", right: 0, top: 2, width: 48, height: 34, background: "linear-gradient(180deg, #888 0%, #666 50%, #555 100%)", borderRadius: "2px 8px 8px 2px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.4)" }}>
          <div style={{ position:"absolute",right:6,top:8,width:14,height:18,background:"#333",borderRadius:2 }}/>
          <div style={{ position:"absolute",left:8,top:11,width:12,height:12,borderRadius:"50%",background:"radial-gradient(circle,#999 30%,#666 70%)",border:"1px solid #555" }}/>
        </div>
      </div>
    ),
  },
  {
    id: "screwdriver",
    name: "Destornillador plano",
    x: 30, y: 60, z: 4, rotation: 22, width: 150, height: 24,
    render: () => (
      <div style={{ width: 150, height: 24, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 2, width: 60, height: 20, background: "linear-gradient(180deg, #e8a020 0%, #c8400a 40%, #b03808 100%)", borderRadius: "8px 4px 4px 8px", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25), 0 2px 4px rgba(0,0,0,0.4)" }}>
          {[12,22,32,42].map(l=><div key={l} style={{position:"absolute",left:l,top:2,width:4,height:16,background:"rgba(0,0,0,0.15)",borderRadius:2}}/>)}
        </div>
        <div style={{ position:"absolute",left:58,top:8,width:70,height:8,background:"linear-gradient(180deg,#aaa 0%,#777 50%,#888 100%)",borderRadius:1,boxShadow:"0 1px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",right:0,top:9,width:22,height:6,background:"linear-gradient(180deg,#999 0%,#666 100%)",borderRadius:"0 2px 2px 0" }}/>
      </div>
    ),
  },
  {
    id: "screwdriver2",
    name: "Destornillador de estrella",
    x: 10, y: 62, z: 5, rotation: -30, width: 140, height: 22,
    render: () => (
      <div style={{ width: 140, height: 22, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 1, width: 55, height: 20, background: "linear-gradient(180deg, #2080d0 0%, #1060a0 40%, #0a4a80 100%)", borderRadius: "8px 4px 4px 8px", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.4)" }}>
          {[10,20,30,40].map(l=><div key={l} style={{position:"absolute",left:l,top:2,width:4,height:16,background:"rgba(0,0,0,0.15)",borderRadius:2}}/>)}
        </div>
        <div style={{ position:"absolute",left:53,top:7,width:68,height:8,background:"linear-gradient(180deg,#aaa 0%,#777 50%,#888 100%)",borderRadius:1,boxShadow:"0 1px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",right:0,top:8,width:18,height:6,background:"linear-gradient(180deg,#999 0%,#666 100%)",borderRadius:"0 3px 3px 0" }}>
          <div style={{position:"absolute",right:2,top:1,width:4,height:4,background:"#444",borderRadius:"50%"}}/>
        </div>
      </div>
    ),
  },
  {
    id: "pliers",
    name: "Alicates",
    x: 35, y: 48, z: 6, rotation: 35, width: 130, height: 50,
    render: () => (
      <div style={{ width: 130, height: 50, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:28,width:55,height:18,background:"linear-gradient(180deg,#d44020 0%,#a02010 100%)",borderRadius:"8px 2px 2px 8px",transform:"rotate(5deg)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",left:0,top:6,width:55,height:18,background:"linear-gradient(180deg,#d44020 0%,#a02010 100%)",borderRadius:"8px 2px 2px 8px",transform:"rotate(-5deg)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",left:50,top:16,width:18,height:18,borderRadius:"50%",background:"radial-gradient(circle,#999 30%,#555 80%)",border:"2px solid #444",boxShadow:"0 1px 3px rgba(0,0,0,0.5)",zIndex:2 }}/>
        <div style={{ position:"absolute",left:64,top:8,width:60,height:12,background:"linear-gradient(180deg,#888 0%,#666 100%)",borderRadius:"2px 4px 2px 2px",transform:"rotate(-3deg)" }}>
          {[8,18,28,38,48].map(l=><div key={l} style={{position:"absolute",left:l,bottom:0,width:3,height:4,background:"#444"}}/>)}
        </div>
        <div style={{ position:"absolute",left:64,top:30,width:60,height:12,background:"linear-gradient(180deg,#777 0%,#555 100%)",borderRadius:"2px 2px 4px 2px",transform:"rotate(3deg)" }}>
          {[8,18,28,38,48].map(l=><div key={l} style={{position:"absolute",left:l,top:0,width:3,height:4,background:"#444"}}/>)}
        </div>
      </div>
    ),
  },
  {
    id: "tape",
    name: "Cinta aislante",
    x: 55, y: 55, z: 7, rotation: 0, width: 56, height: 56,
    render: () => (
      <div style={{ width: 56, height: 56, position: "relative" }}>
        <div style={{ width:56,height:56,borderRadius:"50%",background:"radial-gradient(circle,#333 28%,#111 30%,#222 32%,#111 80%,#1a1a1a 100%)",boxShadow:"inset 0 2px 4px rgba(255,255,255,0.1), 0 3px 6px rgba(0,0,0,0.5)" }}>
          <div style={{ position:"absolute",top:16,left:16,width:24,height:24,borderRadius:"50%",background:"radial-gradient(circle,#444 0%,#2a2a2a 100%)",border:"1px solid #555" }}/>
        </div>
      </div>
    ),
  },
  {
    id: "socketwrench",
    name: "Llave de tubo",
    x: 20, y: 40, z: 8, rotation: -15, width: 120, height: 30,
    render: () => (
      <div style={{ width: 120, height: 30, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:10,width:100,height:10,background:"linear-gradient(180deg,#999 0%,#666 50%,#777 100%)",borderRadius:2,boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",right:0,top:3,width:24,height:24,background:"linear-gradient(135deg,#888 0%,#555 100%)",borderRadius:3,transform:"rotate(45deg)",boxShadow:"0 2px 4px rgba(0,0,0,0.4)" }}>
          <div style={{position:"absolute",top:6,left:6,width:12,height:12,background:"#333",borderRadius:2}}/>
        </div>
        <div style={{ position:"absolute",left:-2,top:5,width:16,height:20,background:"linear-gradient(180deg,#777 0%,#444 100%)",borderRadius:"6px 3px 3px 6px" }}/>
      </div>
    ),
  },
  {
    id: "hexkeys",
    name: "Llaves Allen",
    x: 55, y: 42, z: 9, rotation: 15, width: 60, height: 50,
    render: () => (
      <div style={{ width: 60, height: 50, position: "relative" }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            position: "absolute", left: i*8, top: i*4, width: 40 - i*5, height: 6,
            background: `linear-gradient(180deg, #999 0%, ${i%2===0?'#666':'#777'} 100%)`,
            borderRadius: 1, transform: `rotate(${-2+i}deg)`,
            boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}>
            <div style={{ position:"absolute",left:0,top:-3,width:6,height:12,background:"linear-gradient(90deg,#888,#555)",borderRadius:1 }}/>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "cutter",
    name: "Cuter",
    x: 5, y: 45, z: 10, rotation: -40, width: 110, height: 20,
    render: () => (
      <div style={{ width: 110, height: 20, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:3,width:85,height:14,background:"linear-gradient(180deg,#e8c020 0%,#c8a010 50%,#a88008 100%)",borderRadius:"2px 1px 1px 2px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 4px rgba(0,0,0,0.4)" }}>
          <div style={{ position:"absolute",left:30,top:3,width:20,height:8,background:"rgba(0,0,0,0.15)",borderRadius:2 }}/>
        </div>
        <div style={{ position:"absolute",right:0,top:4,width:28,height:12,background:"linear-gradient(90deg,#aaa,#888)",clipPath:"polygon(0 0, 100% 30%, 100% 70%, 0 100%)" }}/>
      </div>
    ),
  },
  {
    id: "measuringtape",
    name: "Flexometro",
    x: 40, y: 35, z: 11, rotation: 5, width: 50, height: 50,
    render: () => (
      <div style={{ width: 50, height: 50, position: "relative" }}>
        <div style={{ width:50,height:50,borderRadius:6,background:"linear-gradient(135deg,#e8c020 0%,#c8a010 50%,#a88008 100%)",boxShadow:"inset 0 2px 0 rgba(255,255,255,0.2), 0 3px 8px rgba(0,0,0,0.5)" }}>
          <div style={{ position:"absolute",top:15,left:15,width:20,height:20,borderRadius:"50%",background:"radial-gradient(circle,#333 40%,#222 100%)",border:"2px solid #555" }}/>
          <div style={{ position:"absolute",top:4,right:4,width:8,height:6,background:"#666",borderRadius:"0 4px 0 0" }}/>
        </div>
        <div style={{ position:"absolute",top:22,right:-12,width:14,height:6,background:"linear-gradient(90deg,#eee,#ccc)",borderRadius:1,boxShadow:"0 1px 2px rgba(0,0,0,0.3)" }}/>
      </div>
    ),
  },
  {
    id: "gloves",
    name: "Guantes de trabajo",
    x: 50, y: 30, z: 12, rotation: 12, width: 70, height: 60,
    render: () => (
      <div style={{ width: 70, height: 60, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:15,width:35,height:45,background:"linear-gradient(180deg,#c8b080 0%,#a89060 100%)",borderRadius:"12px 12px 8px 8px",boxShadow:"0 2px 6px rgba(0,0,0,0.4)",transform:"rotate(-5deg)" }}>
          {[4,12,20,28].map((l,i)=><div key={i} style={{position:"absolute",top:-8-i*2,left:l,width:7-i,height:12+i,background:"linear-gradient(180deg,#c8b080,#b8a070)",borderRadius:"4px 4px 0 0"}}/>)}
          <div style={{position:"absolute",left:-6,top:8,width:10,height:20,background:"linear-gradient(180deg,#c8b080,#b8a070)",borderRadius:"6px 0 0 6px",transform:"rotate(15deg)"}}/>
        </div>
        <div style={{ position:"absolute",right:0,top:12,width:33,height:42,background:"linear-gradient(180deg,#baa878 0%,#9a8058 100%)",borderRadius:"12px 12px 8px 8px",boxShadow:"0 2px 6px rgba(0,0,0,0.4)",transform:"rotate(8deg)",opacity:0.85 }}/>
      </div>
    ),
  },
  // === LAYER 3: Top of the pile (first things you see) ===
  {
    id: "wrench2",
    name: "Llave fija 17mm",
    x: 18, y: 25, z: 13, rotation: -55, width: 120, height: 22,
    render: () => (
      <div style={{ width: 120, height: 22, position: "relative" }}>
        <div style={{ position:"absolute",left:14,top:6,width:85,height:10,background:"linear-gradient(180deg,#aaa 0%,#777 50%,#888 100%)",borderRadius:1,boxShadow:"inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",left:0,top:0,width:20,height:22,background:"linear-gradient(180deg,#999 0%,#666 100%)",borderRadius:"8px 4px 4px 8px" }}>
          <div style={{position:"absolute",left:5,top:6,width:10,height:10,background:"#444",borderRadius:"50%"}}/>
        </div>
        <div style={{ position:"absolute",right:0,top:2,width:18,height:18,background:"linear-gradient(180deg,#999 0%,#666 100%)",borderRadius:"4px 8px 8px 4px" }}>
          <div style={{position:"absolute",left:4,top:4,width:8,height:10,background:"#444",borderRadius:2}}/>
        </div>
      </div>
    ),
  },
  {
    id: "hammer",
    name: "Martillo",
    x: 8, y: 18, z: 14, rotation: 30, width: 130, height: 40,
    render: () => (
      <div style={{ width: 130, height: 40, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:15,width:90,height:12,background:"linear-gradient(180deg,#9a7040 0%,#705020 50%,#604018 100%)",borderRadius:2,boxShadow:"0 2px 4px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",right:0,top:2,width:44,height:36,background:"linear-gradient(180deg,#888 0%,#555 50%,#444 100%)",borderRadius:"4px 6px 6px 2px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.15), 0 3px 6px rgba(0,0,0,0.5)" }}>
          <div style={{position:"absolute",left:0,top:4,width:6,height:28,background:"linear-gradient(90deg,#666,#444)",borderRadius:"2px 0 0 2px"}}/>
        </div>
      </div>
    ),
  },
  {
    id: "sparkplug",
    name: "Bujia",
    x: 60, y: 22, z: 15, rotation: -10, width: 50, height: 20,
    render: () => (
      <div style={{ width: 50, height: 20, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:5,width:24,height:10,background:"linear-gradient(180deg,#eee 0%,#bbb 100%)",borderRadius:2,boxShadow:"0 1px 3px rgba(0,0,0,0.3)" }}>
          <div style={{position:"absolute",left:2,top:2,width:6,height:6,background:"#999",borderRadius:"50%"}}/>
        </div>
        <div style={{ position:"absolute",right:0,top:4,width:22,height:12,background:"linear-gradient(180deg,#777 0%,#444 100%)",borderRadius:"0 3px 3px 0" }}/>
      </div>
    ),
  },
  {
    id: "wrench3",
    name: "Llave fija 13mm",
    x: 42, y: 18, z: 16, rotation: 65, width: 100, height: 18,
    render: () => (
      <div style={{ width: 100, height: 18, position: "relative" }}>
        <div style={{ position:"absolute",left:12,top:5,width:72,height:8,background:"linear-gradient(180deg,#bbb 0%,#888 50%,#999 100%)",borderRadius:1,boxShadow:"0 1px 2px rgba(0,0,0,0.3)" }}/>
        <div style={{ position:"absolute",left:0,top:0,width:16,height:18,background:"linear-gradient(180deg,#aaa 0%,#777 100%)",borderRadius:"6px 3px 3px 6px" }}>
          <div style={{position:"absolute",left:4,top:5,width:8,height:8,background:"#555",borderRadius:"50%"}}/>
        </div>
        <div style={{ position:"absolute",right:0,top:1,width:14,height:16,background:"linear-gradient(180deg,#aaa 0%,#777 100%)",borderRadius:"3px 6px 6px 3px" }}>
          <div style={{position:"absolute",left:3,top:4,width:6,height:8,background:"#555",borderRadius:1}}/>
        </div>
      </div>
    ),
  },
  {
    id: "rag",
    name: "Trapo sucio",
    x: 25, y: 12, z: 17, rotation: -8, width: 80, height: 50,
    render: () => (
      <div style={{ width: 80, height: 50, position: "relative" }}>
        <div style={{ width:80,height:50,background:"linear-gradient(135deg,#6a5a4a 0%,#8a7a6a 30%,#5a4a3a 60%,#7a6a5a 100%)",borderRadius:"12px 8px 15px 6px",boxShadow:"0 2px 6px rgba(0,0,0,0.4)",opacity:0.9 }}>
          <div style={{position:"absolute",top:10,left:15,width:30,height:12,background:"rgba(60,40,20,0.3)",borderRadius:4,transform:"rotate(-5deg)"}}/>
          <div style={{position:"absolute",top:25,left:35,width:20,height:8,background:"rgba(40,30,15,0.25)",borderRadius:3,transform:"rotate(8deg)"}}/>
        </div>
      </div>
    ),
  },
  {
    id: "bolts",
    name: "Tornillos sueltos",
    x: 62, y: 50, z: 18, rotation: 0, width: 45, height: 35,
    render: () => (
      <div style={{ width: 45, height: 35, position: "relative" }}>
        {[{x:5,y:2,r:20},{x:20,y:8,r:-30},{x:8,y:18,r:45},{x:25,y:22,r:-10},{x:15,y:28,r:60}].map((b,i) => (
          <div key={i} style={{position:"absolute",left:b.x,top:b.y,width:14,height:5,background:"linear-gradient(180deg,#aaa 0%,#777 100%)",borderRadius:1,transform:`rotate(${b.r}deg)`,boxShadow:"0 1px 2px rgba(0,0,0,0.3)"}}>
            <div style={{position:"absolute",left:0,top:-1,width:5,height:7,background:"linear-gradient(180deg,#bbb,#888)",borderRadius:"50%"}}/>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "pliers2",
    name: "Alicates de punta",
    x: 5, y: 30, z: 19, rotation: -55, width: 120, height: 35,
    render: () => (
      <div style={{ width: 120, height: 35, position: "relative" }}>
        <div style={{ position:"absolute",left:0,top:18,width:50,height:14,background:"linear-gradient(180deg,#e8a020 0%,#c88010 100%)",borderRadius:"6px 2px 2px 6px",transform:"rotate(3deg)",boxShadow:"0 2px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",left:0,top:4,width:50,height:14,background:"linear-gradient(180deg,#e8a020 0%,#c88010 100%)",borderRadius:"6px 2px 2px 6px",transform:"rotate(-3deg)",boxShadow:"0 2px 3px rgba(0,0,0,0.4)" }}/>
        <div style={{ position:"absolute",left:46,top:10,width:14,height:14,borderRadius:"50%",background:"radial-gradient(circle,#999 30%,#555 80%)",border:"2px solid #444",zIndex:2 }}/>
        <div style={{ position:"absolute",left:58,top:10,width:60,height:6,background:"linear-gradient(180deg,#888 0%,#666 100%)",borderRadius:"0 3px 3px 0",transform:"rotate(-2deg)" }}/>
        <div style={{ position:"absolute",left:58,top:20,width:60,height:6,background:"linear-gradient(180deg,#777 0%,#555 100%)",borderRadius:"0 3px 3px 0",transform:"rotate(2deg)" }}/>
      </div>
    ),
  },
  {
    id: "tape2",
    name: "Cinta americana",
    x: 58, y: 10, z: 20, rotation: 5, width: 62, height: 62,
    render: () => (
      <div style={{ width: 62, height: 62, position: "relative" }}>
        <div style={{ width:62,height:62,borderRadius:"50%",background:"radial-gradient(circle,#666 26%,#888 28%,#777 32%,#888 80%,#777 100%)",boxShadow:"inset 0 2px 4px rgba(255,255,255,0.1), 0 3px 8px rgba(0,0,0,0.5)" }}>
          <div style={{ position:"absolute",top:18,left:18,width:26,height:26,borderRadius:"50%",background:"radial-gradient(circle,#444 0%,#333 100%)",border:"1px solid #555" }}/>
        </div>
      </div>
    ),
  },
  // Charger - hidden among tools, near bottom
  {
    id: "charger",
    name: "Cargador inalambrico",
    x: 35, y: 62, z: 3, rotation: -5, width: 60, height: 60,
    render: () => (
      <div style={{ width: 60, height: 60, position: "relative" }}>
        <div style={{ width:60,height:60,borderRadius:10,background:"linear-gradient(135deg,#1a1a1a 0%,#2a2a2a 50%,#1a1a1a 100%)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08), 0 3px 8px rgba(0,0,0,0.5)",border:"1px solid #333",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ fontSize:20 }}>⚡</div>
        </div>
        {/* USB cable */}
        <div style={{ position:"absolute",bottom:-8,left:"50%",transform:"translateX(-50%)",width:4,height:12,background:"linear-gradient(180deg,#333,#222)",borderRadius:1 }}/>
        <div style={{ position:"absolute",bottom:-12,left:"50%",transform:"translateX(-50%)",width:10,height:6,background:"#333",borderRadius:"0 0 3px 3px" }}/>
      </div>
    ),
  },
];

export default function CajaPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openingAnim, setOpeningAnim] = useState(false);
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showPaper, setShowPaper] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [chargerCollected, setChargerCollected] = useState(false);
  const [showChargerToast, setShowChargerToast] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const dragStart = useRef<{ x: number; y: number; toolX: number; toolY: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const maxZ = useRef(13);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChargerCollected(localStorage.getItem("sm_charger_found") === "true");
    }
  }, []);

  function handleOpen() {
    if (isOpen) return;
    setOpeningAnim(true);
    setTimeout(() => { setIsOpen(true); setOpeningAnim(false); }, 600);
  }

  const handlePointerDown = useCallback((e: React.PointerEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const tool = tools.find(t => t.id === toolId);
    if (!tool || !boxRef.current) return;

    const box = boxRef.current.getBoundingClientRect();
    dragStart.current = { x: e.clientX, y: e.clientY, toolX: tool.x, toolY: tool.y };
    setDragging(toolId);

    // Bring to front
    maxZ.current += 1;
    setTools(prev => prev.map(t => t.id === toolId ? { ...t, z: maxZ.current } : t));

    const handleMove = (ev: PointerEvent) => {
      if (!dragStart.current || !boxRef.current) return;
      const bx = boxRef.current.getBoundingClientRect();
      const dx = ((ev.clientX - dragStart.current.x) / bx.width) * 100;
      const dy = ((ev.clientY - dragStart.current.y) / bx.height) * 100;
      const newX = Math.max(-5, Math.min(85, dragStart.current.toolX + dx));
      const newY = Math.max(-5, Math.min(88, dragStart.current.toolY + dy));
      setTools(prev => prev.map(t => t.id === toolId ? { ...t, x: newX, y: newY } : t));
    };

    const handleUp = () => {
      setDragging(null);
      dragStart.current = null;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [tools]);

  const selectedToolData = tools.find(t => t.id === selectedTool);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #2a2218 0%, #1a1510 50%, #0d0a08 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: "relative", overflow: "hidden", userSelect: "none",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes unfold {
          0% { transform: scale(0.3) rotate(-8deg); opacity: 0; }
          40% { transform: scale(0.7) rotate(-3deg); opacity: 1; }
          70% { transform: scale(1.05) rotate(0.5deg); }
          100% { transform: scale(1) rotate(-0.5deg); }
        }
      `}</style>

      {/* Wood grain */}
      <div style={{ position:"fixed",inset:0,opacity:0.03,pointerEvents:"none",backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(139,110,70,0.3) 20px,rgba(139,110,70,0.3) 21px)" }}/>

      {/* Tool zoom modal */}
      {selectedTool && selectedToolData && (
        <div onClick={()=>setSelectedTool(null)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",animation:"fadeIn 0.2s ease-out" }}>
          <div onClick={e=>e.stopPropagation()} style={{ transform:"scale(3.5)",filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.8))",marginBottom:60 }}>
            {selectedToolData.render()}
          </div>
          <div style={{ color:"#aaa",fontSize:16,fontWeight:500 }}>{selectedToolData.name}</div>
          <div style={{ color:"#555",fontSize:12,marginTop:8 }}>Click para cerrar</div>
        </div>
      )}

      {/* Paper modal */}
      {showPaper && (
        <div onClick={()=>setShowPaper(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.3s ease-out" }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"linear-gradient(175deg,#f5f0e4 0%,#ede6d4 50%,#e4dcc8 100%)",
            width:440,maxWidth:"90vw",padding:"44px 48px",position:"relative",
            fontFamily:"'Segoe Script','Comic Sans MS','Bradley Hand',cursive",color:"#1a1a2e",
            boxShadow:"0 8px 40px rgba(0,0,0,0.6), inset 0 0 80px rgba(139,119,80,0.1)",
            animation:"unfold 0.6s ease-out forwards",lineHeight:2.1,
            transform:"rotate(-0.6deg)",
          }}>
            {/* Fold creases */}
            <div style={{ position:"absolute",top:"50%",left:0,width:"100%",height:2,background:"rgba(120,100,60,0.12)",pointerEvents:"none" }}/>
            <div style={{ position:"absolute",top:0,left:"50%",width:2,height:"100%",background:"rgba(120,100,60,0.12)",pointerEvents:"none" }}/>
            {/* Stains */}
            <div style={{ position:"absolute",top:15,right:25,width:70,height:60,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,110,60,0.12) 0%,transparent 70%)",pointerEvents:"none" }}/>
            <div style={{ position:"absolute",bottom:30,left:15,width:50,height:40,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(100,90,60,0.08) 0%,transparent 70%)",pointerEvents:"none" }}/>

            <div style={{ fontSize:18,color:"#1e1e3a",position:"relative" }}>
              {/* Scattered numbers - look like idle scribbles in margins */}
              <span style={{ position:"absolute",top:-8,left:2,fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.55,transform:"rotate(-3deg)" }}>48</span>

              <p style={{ marginBottom:16 }}>
                Si alguien lee esto que no sea yo, <span style={{ position:"relative" }}>para.<span style={{ position:"absolute",bottom:-1,left:0,width:"100%",height:2,background:"rgba(30,30,80,0.15)",pointerEvents:"none" }}/></span>
                <span style={{ fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.5,marginLeft:8 }}>07</span>
              </p>
              <p style={{ marginBottom:16 }}>
                <span style={{ fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.5,marginRight:6 }}>8</span>
                El aparato que esta en el coche no es mio. Me lo dejaron una noche sin explicarme bien que era. Solo me dijeron que para acceder necesitaba unas palabras. Doce en total. Como una llave pero en palabras.
                <span style={{ fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.5,marginLeft:8 }}>4</span>
              </p>
              <p style={{ marginBottom:16 }}>
                No las tengo todas. Solo se donde estan algunas.
                <span style={{ fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.5,marginLeft:8 }}>82</span>
              </p>
              <p style={{ marginBottom:24 }}>
                <span style={{ fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.5,marginRight:6 }}>3</span>
                No he preguntado mas. Cuanto menos sepa mejor.
                <span style={{ fontSize:11,color:"#a09880",fontFamily:"'Segoe Script',cursive",opacity:0.5,marginLeft:8 }}>9</span>
              </p>
              <p style={{ textAlign:"right",marginRight:20,fontSize:22,color:"#1a2a5a" }}>
                H.
              </p>
            </div>
            <div style={{ textAlign:"center",marginTop:20,fontSize:11,color:"#999",fontFamily:"Arial,sans-serif" }}>Click fuera para cerrar</div>
          </div>
        </div>
      )}

      {/* Phone modal */}
      <Phone visible={showPhone} onClose={() => setShowPhone(false)} />

      {/* Main content */}
      <div style={{ position:"relative",zIndex:10 }}>

        {/* Title */}
        <div style={{ textAlign:"center",marginBottom:60 }}>
          <div style={{ fontSize:22,fontWeight:700,color:"#998877",letterSpacing:1 }}>Pertenencias</div>
          <div style={{ fontSize:12,color:"#554433",marginTop:4 }}>Objetos recuperados del vehiculo</div>
        </div>

        {/* Items row */}
        <div style={{ display:"flex",gap:40,alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap" }}>

        {/* Phone object */}
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10 }}>
          <div
            onDoubleClick={() => setShowPhone(true)}
            style={{
              width:80,height:150,
              background:"linear-gradient(180deg,#222 0%,#111 100%)",
              borderRadius:12,border:"2px solid #333",
              boxShadow:"0 6px 20px rgba(0,0,0,0.6)",
              position:"relative",cursor:"pointer",
              transition:"transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 8px 30px rgba(200,180,100,0.2)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.6)";}}
          >
            {/* Screen (off) */}
            <div style={{ margin:6,borderRadius:8,background:"#0a0a0a",position:"absolute",inset:6,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{ width:20,height:20,borderRadius:"50%",border:"2px solid #333" }}/>
            </div>
            {/* Notch */}
            <div style={{ position:"absolute",top:4,left:"50%",transform:"translateX(-50%)",width:24,height:4,background:"#222",borderRadius:2 }}/>
          </div>
          <div style={{ fontSize:11,color:"#665544",textAlign:"center" }}>Doble click para encender</div>
          <div style={{ fontSize:10,color:"#443322",fontFamily:"monospace" }}>Telefono movil</div>
        </div>

        {/* Toolbox */}
        <div style={{ position:"relative",width:580,maxWidth:"94vw" }}>

          {/* === CLOSED === */}
          {!isOpen && (
            <div onClick={handleOpen} style={{ cursor:"pointer",position:"relative" }}>
              <div style={{
                width:"100%",height:130,
                background:"linear-gradient(180deg,#c62020 0%,#8a1515 60%,#6a0e0e 100%)",
                borderRadius:"4px 4px 6px 6px",
                boxShadow:"0 8px 30px rgba(0,0,0,0.6), inset 0 -4px 8px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.1)",
                position:"relative",
              }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:6,background:"linear-gradient(180deg,#999 0%,#666 100%)",borderRadius:"4px 4px 0 0" }}/>
                <div style={{ position:"absolute",top:35,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(180deg,#ddd 0%,#aaa 100%)",padding:"4px 20px",borderRadius:2,boxShadow:"0 1px 3px rgba(0,0,0,0.4)",fontSize:11,fontWeight:700,color:"#333",letterSpacing:2,textTransform:"uppercase",fontFamily:"Arial,sans-serif" }}>
                  HERRAMIENTAS
                </div>
                {[{l:12,t:14},{r:12,t:14},{l:12,b:14},{r:12,b:14}].map((pos,i)=>(
                  <div key={i} style={{ position:"absolute",...pos,width:8,height:8,borderRadius:"50%",background:"radial-gradient(circle,#aaa 30%,#666 80%)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.4)" }}/>
                ))}
              </div>
              <div style={{
                position:"absolute",top:-55,left:-4,right:-4,height:60,
                background:"linear-gradient(180deg,#dd2828 0%,#b01818 60%,#901010 100%)",
                borderRadius:"6px 6px 0 0",
                boxShadow:"0 -4px 15px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.15)",
                transformOrigin:"bottom center",
                transition:"transform 0.6s ease-in-out",
                transform: openingAnim?"perspective(600px) rotateX(-95deg)":"perspective(600px) rotateX(0deg)",
              }}>
                <div style={{ position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",width:40,height:16,background:"linear-gradient(180deg,#ccc 0%,#888 100%)",borderRadius:"3px 3px 0 0",boxShadow:"0 2px 4px rgba(0,0,0,0.3)" }}>
                  <div style={{ position:"absolute",top:4,left:"50%",transform:"translateX(-50%)",width:8,height:8,borderRadius:"50%",background:"#555",border:"1px solid #444" }}/>
                </div>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(180deg,#aaa 0%,#777 100%)",borderRadius:"6px 6px 0 0" }}/>
                <div style={{ position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",width:80,height:18,borderRadius:"10px 10px 0 0",background:"linear-gradient(180deg,#888 0%,#555 100%)",boxShadow:"0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.15)" }}/>
              </div>
              <div style={{ textAlign:"center",marginTop:16,fontSize:13,color:"#665544",letterSpacing:1 }}>
                {openingAnim ? "Abriendo..." : "Click para abrir"}
              </div>
            </div>
          )}

          {/* === OPEN === */}
          {isOpen && (
            <div>
              <div style={{ width:"calc(100% + 8px)",height:36,marginLeft:-4,background:"linear-gradient(0deg,#dd2828 0%,#b01818 60%,#901010 100%)",borderRadius:"6px 6px 0 0",boxShadow:"0 -2px 8px rgba(0,0,0,0.2), inset 0 -2px 0 rgba(255,255,255,0.1)",marginBottom:2,opacity:0.6 }}/>

              <div ref={boxRef} style={{
                width:"100%",height:440,position:"relative",
                background:"linear-gradient(180deg,#2a2220 0%,#1e1a18 50%,#181412 100%)",
                border:"4px solid",borderImage:"linear-gradient(180deg,#c62020,#6a0e0e) 1",
                boxShadow:"0 8px 30px rgba(0,0,0,0.7), inset 0 4px 20px rgba(0,0,0,0.5)",
                borderRadius:"0 0 4px 4px",overflow:"hidden",
                touchAction:"none",
              }}>
                {/* Interior lines */}
                <div style={{ position:"absolute",top:"33%",left:0,right:0,height:1,background:"rgba(255,255,255,0.03)",pointerEvents:"none" }}/>
                <div style={{ position:"absolute",top:"66%",left:0,right:0,height:1,background:"rgba(255,255,255,0.03)",pointerEvents:"none" }}/>

                {/* Hidden paper at the center bottom */}
                <div
                  onClick={()=>{localStorage.setItem("sm_paper_read","true");setShowPaper(true);}}
                  style={{
                    position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%) rotate(3deg)",
                    width:120,height:80,zIndex:0,
                    background:"linear-gradient(175deg,#f0e8d0 0%,#e0d8c0 50%,#d8d0b8 100%)",
                    borderRadius:2,cursor:"pointer",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.5)",
                    transition:"all 0.3s",
                    display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(200,180,100,0.5)";e.currentTarget.style.transform="translate(-50%,-50%) rotate(3deg) scale(1.08)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.5)";e.currentTarget.style.transform="translate(-50%,-50%) rotate(3deg) scale(1)";}}
                >
                  {/* Fold lines */}
                  <div style={{ position:"absolute",top:"50%",left:0,right:0,height:1,background:"rgba(120,100,60,0.2)",pointerEvents:"none" }}/>
                  <div style={{ position:"absolute",top:0,left:"50%",width:1,height:"100%",background:"rgba(120,100,60,0.2)",pointerEvents:"none" }}/>
                  {/* Faint handwriting hint */}
                  <div style={{ fontSize:9,color:"#9a8a6a",fontFamily:"'Segoe Script',cursive",opacity:0.5,textAlign:"center",lineHeight:1.4 }}>
                    <div>~~~~</div>
                    <div>~~~~</div>
                    <div>~~</div>
                  </div>
                </div>

                {/* Draggable tools */}
                {tools.filter(t => !(t.id === "charger" && chargerCollected)).map(tool => (
                  <div
                    key={tool.id}
                    onPointerDown={e => handlePointerDown(e, tool.id)}
                    onDoubleClick={() => {
                      if (tool.id === "charger" && !chargerCollected) {
                        localStorage.setItem("sm_charger_found", "true");
                        setChargerCollected(true);
                        setShowChargerToast(true);
                        setTimeout(() => setShowChargerToast(false), 2500);
                      } else {
                        setSelectedTool(tool.id);
                      }
                    }}
                    style={{
                      position:"absolute",
                      left:`${tool.x}%`,top:`${tool.y}%`,
                      zIndex: tool.z,
                      transform:`rotate(${tool.rotation}deg) scale(1.8)`,
                      transformOrigin:"center center",
                      cursor: dragging === tool.id ? "grabbing" : "grab",
                      filter:`drop-shadow(0 ${dragging===tool.id?6:3}px ${dragging===tool.id?12:6}px rgba(0,0,0,${dragging===tool.id?0.8:0.6}))`,
                      transition: dragging === tool.id ? "none" : "filter 0.2s",
                    }}
                  >
                    {tool.render()}
                  </div>
                ))}
              </div>

              {/* Charger collected toast */}
              {showChargerToast && (
                <div style={{
                  position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
                  background:"rgba(0,0,0,0.9)",border:"1px solid #22c55e",borderRadius:12,
                  padding:"16px 24px",zIndex:10000,textAlign:"center",
                  animation:"fadeIn 0.3s ease-out",
                }}>
                  <div style={{ fontSize:28,marginBottom:8 }}>⚡</div>
                  <div style={{ color:"#22c55e",fontSize:14,fontWeight:600 }}>Cargador recogido</div>
                  <div style={{ color:"#666",fontSize:11,marginTop:4 }}>Ahora puedes cargar el movil</div>
                </div>
              )}

              <div style={{ textAlign:"center",marginTop:12,fontSize:12,color:"#554433",letterSpacing:0.5 }}>
                Arrastra las herramientas &bull; Doble click para ampliar
              </div>
            </div>
          )}
        </div>
        </div>{/* close items row */}
      </div>
    </div>
  );
}
