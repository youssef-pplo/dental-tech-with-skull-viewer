import { Component, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useThree } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Focus, RotateCcw, Scan, Sparkles } from 'lucide-react';

type ViewerProps = { compact?: boolean };
type Point3 = [number, number, number];

class ViewerBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const boneColors: Record<string, string> = {
  'Frontal bone': '#6fe0d5',
  'Parietal bones': '#d9c1a1',
  'Temporal bones': '#d2aa7d',
  'Occipital bone': '#b99f7e',
  'Zygomatic bones': '#d8c29f',
  'Maxillae': '#e0d5be',
  'Mandible': '#c3a47c',
  'Nasal bones': '#e3d6b9',
  'Ethmoid': '#d4c6a9',
  'Sphenoid': '#cbb998',
  'Teeth': '#f7ebcf',
  'Upper teeth': '#f5e7c8',
  'Lower teeth': '#ecd9b2',
  'Palatine bone': '#c6b49a',
  'Vomer': '#b9a88e',
  'Lacrimal bone': '#c5b49b',
  'Orbit': '#78d5d0',
};

const notes: Record<string, string> = {
  'Frontal bone': 'Forms the forehead and the superior part of each orbit. Find it above the eye openings.',
  'Parietal bones': 'Paired bones forming much of the cranial vault. Rotate to a lateral or superior view to follow their borders.',
  'Temporal bones': 'Paired bones at the sides of the skull. Each contributes to the zygomatic arch and houses structures of the ear.',
  'Occipital bone': 'Forms the back and base of the cranium. Switch to a posterior or basilar view to inspect it.',
  'Zygomatic bones': 'The cheekbones. They form the lateral margins of the orbits and meet the temporal bones at the zygomatic arches.',
  'Maxillae': 'Paired upper-jaw bones. They support the upper teeth and help form the floors of the orbits.',
  'Mandible': 'The lower jaw. It moves at the temporomandibular joints and supports the lower teeth.',
  'Nasal bones': 'Paired small bones at the bridge of the nose, meeting the frontal bone at the nasion.',
  'Ethmoid': 'A midline bone between the orbits that contributes to the medial orbital walls and nasal cavity.',
  'Sphenoid': 'A central bone at the skull base that contributes to the posterior orbit.',
  'Teeth': 'The teeth sit in alveolar sockets. Their attachment is a gomphosis, a specialized fibrous joint.',
  'Upper teeth': 'The maxillary teeth sit in sockets in the upper jaw. The alveolar processes of the maxillae hold them in place.',
  'Lower teeth': 'The mandibular teeth sit in sockets in the lower jaw. The alveolar part of the mandible supports them.',
  'Palatine bone': 'A paired bone forming the posterior part of the hard palate and part of the nasal cavity.',
  'Vomer': 'A thin midline bone that forms the inferior part of the nasal septum.',
  'Lacrimal bone': 'A small paired bone on the medial wall of each orbit.',
  'Orbit': 'The bony socket that contains and protects the eye.',
  'Nasion': 'The midline junction of the frontonasal and internasal sutures.',
  'Glabella': 'The smooth midline area above the nasion, between the superciliary arches.',
  'Supraorbital notch': 'A passage for the supraorbital nerve and vessels, associated with the ophthalmic division (V1).',
  'Infraorbital foramen': 'A passage for the infraorbital nerve and vessels, associated with the maxillary division (V2).',
  'Mental foramen': 'A passage for the mental nerve and vessels, associated with the mandibular division (V3).',
  'Skull surface': 'This click landed between mapped regions on the intact scan. Choose a named structure from the list for a precise label.',
};

const boneNames = [
  'Frontal bone',
  'Parietal bones',
  'Temporal bones',
  'Occipital bone',
  'Zygomatic bones',
  'Maxillae',
  'Mandible',
  'Nasal bones',
  'Ethmoid',
  'Sphenoid',
];
const toothNames = ['Upper teeth', 'Lower teeth'];

const structurePoints: Record<string, Point3> = {
  'Frontal bone': [1.062, 0.823, 0.025],
  'Parietal bones': [-0.033, 0.88, 0.78],
  'Temporal bones': [-0.001, -0.018, 0.841],
  'Occipital bone': [-1.008, -0.02, 0.729],
  'Zygomatic bones': [0.609, -0.133, 0.834],
  'Maxillae': [0.904, -0.37, 0.427],
  'Mandible': [1.284, -0.865, 0.023],
  'Nasal bones': [1.35, 0.237, 0.023],
  Ethmoid: [1.15, -0.08, 0],
  Sphenoid: [0.22, -0.1, 0],
  Teeth: [1.12, -0.68, 0],
  'Palatine bone': [0.42, -0.62, 0],
  Vomer: [1.18, -0.25, 0],
  'Lacrimal bone': [1.13, 0.08, 0.22],
  Orbit: [1.02, 0.18, 0.45],
  Nasion: [1.34, 0.28, 0],
  Glabella: [1.31, 0.42, 0],
  'Supraorbital notch': [1.21, 0.1, -0.31],
  'Infraorbital foramen': [1.19, -0.19, 0.28],
  'Mental foramen': [0.83, -0.7, 0.46],
  'Upper teeth': [1.24, -0.51, 0],
  'Lower teeth': [1.29, -0.7, 0],
};

function centeredScene(source: THREE.Object3D, targetHeight: number, yaw = 0, pitch = 0) {
  const cloned = source.clone(true);
  const orientation = new THREE.Group();
  orientation.rotation.order = 'YXZ';
  orientation.rotation.set(pitch, yaw, 0);
  orientation.add(cloned);
  orientation.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(orientation);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const scale = targetHeight / Math.max(size.y, 0.001);

  const normalized = new THREE.Group();
  normalized.add(orientation);
  normalized.scale.setScalar(scale);
  normalized.position.copy(center).multiplyScalar(-scale);
  normalized.updateMatrixWorld(true);
  return normalized;
}

function guessStructure(point: THREE.Vector3) {
  const { x, y, z } = point;
  const side = Math.abs(z);

  // The scan is one intact surface, so use fixed skull-local coordinates. Teeth
  // have their own bands and are checked before the broader jaw regions.
  if (x > 0.7 && y > -0.82 && y < -0.38 && side < 0.62) {
    return y < -0.63 ? 'Lower teeth' : 'Upper teeth';
  }

  if (x < -0.62) return y > 0.48 ? 'Parietal bones' : 'Occipital bone';
  if (y > 0.55) return x > 0.62 ? 'Frontal bone' : 'Parietal bones';

  // Midline facial surface: forehead, nasal bridge, upper jaw, teeth, and chin.
  if (x > 0.95 && side < 0.22) {
    if (y > 0.63) return 'Frontal bone';
    if (y > 0.03) return 'Nasal bones';
    if (y > -0.38) return 'Maxillae';
    if (y > -0.63) return 'Upper teeth';
    if (y > -0.82) return 'Lower teeth';
    return 'Mandible';
  }

  // The cheek and arch sit anterior to the temporal region; the ramus is below.
  if (side > 0.55) {
    if (x > 0.38 && y > -0.35 && y < 0.36) return 'Zygomatic bones';
    if (x < 0.32 && y > -0.45 && y < 0.36) return 'Temporal bones';
    if (y <= -0.78) return 'Mandible';
  }

  if (x > 0.72 && y > -0.45 && y <= -0.22) return 'Maxillae';
  if (x > 0.72 && y > -0.22 && y <= 0.42) return side > 0.38 ? 'Zygomatic bones' : 'Nasal bones';
  if (x > 0.55 && y > 0.38) return 'Frontal bone';
  if (side > 0.45 && y < -0.35 && x < 0.72) return 'Mandible';
  if (side > 0.45 && y > -0.3 && y < 0.4) return 'Temporal bones';
  if (x < -0.2) return y > 0.35 ? 'Parietal bones' : 'Occipital bone';

  // Don't claim a named bone where this continuous surface gives no clear region.
  return 'Skull surface';
}

function SkullScene({
  selected,
  setSelected,
  focusPoint,
  setFocusPoint,
  wireframe,
  cameraView,
  controlsRef,
  compact,
}: {
  selected: string;
  setSelected: (name: string) => void;
  focusPoint: Point3;
  setFocusPoint: (point: Point3) => void;
  wireframe: boolean;
  cameraView: string;
  controlsRef: React.MutableRefObject<any>;
  compact: boolean;
}) {
  const { camera } = useThree();
  const cameraDistance = 8.5;
  const skullAsset = useGLTF('/models/visible-human-skull-hires-draco.glb', '/draco/', false);

  const skullModel = useMemo(() => {
    const model = centeredScene(skullAsset.scene, 2.65, -Math.PI / 2, -Math.PI / 2);
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = false;
      object.receiveShadow = false;
      const prepare = (material: THREE.Material) => {
        const clone = material.clone();
        if (clone instanceof THREE.MeshStandardMaterial) {
          clone.roughness = 0.72;
          clone.metalness = 0;
          clone.color.set('#e8e0d4');
        }
        return clone;
      };
      object.material = Array.isArray(object.material) ? object.material.map(prepare) : prepare(object.material);
    });
    return model;
  }, [skullAsset.scene]);

  useEffect(() => {
    skullModel.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.wireframe = wireframe;
          material.needsUpdate = true;
        }
      });
    });
  }, [skullModel, wireframe]);

  useEffect(() => {
    const rightObliqueAngle = (70 * Math.PI) / 180;
    const views: Record<string, [number, number, number]> = {
      'Right 70°': [cameraDistance * Math.cos(rightObliqueAngle), 0.02, cameraDistance * Math.sin(rightObliqueAngle)],
      Front: [cameraDistance, 0.02, 0],
      Lateral: [0, 0.02, cameraDistance],
      Superior: [0.04, cameraDistance, 0.02],
      Basilar: [0.04, -cameraDistance, 0.02],
    };
    const next = views[cameraView] || views.Front;
    camera.position.set(next[0], next[1], next[2]);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [camera, cameraDistance, cameraView, controlsRef]);

  const handleModelClick = (event: ThreeEvent<MouseEvent>) => {
    const label = guessStructure(event.point);
    setSelected(label);
    setFocusPoint([event.point.x, event.point.y, event.point.z]);
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[cameraDistance, 0.02, 0]} fov={compact ? 34 : 35} />
      <ambientLight intensity={0.22} />
      <hemisphereLight args={['#fff7e9', '#303d52', 0.95]} />
      <directionalLight position={[4, 5, 4]} intensity={1.75} color="#fff1dc" />
      <directionalLight position={[5, 0, -4]} intensity={0.68} color="#bad8e8" />
      <directionalLight position={[-4, 1, 3]} intensity={1.1} color="#8fd5d5" />
      <directionalLight position={[-2, -1, -4]} intensity={0.65} color="#c4b3e6" />
      <pointLight position={[5, -0.2, 1]} intensity={0.45} distance={7} decay={2} color="#fffaf2" />
      <primitive
        object={skullModel}
        onClick={handleModelClick}
        onPointerOver={() => { document.body.style.cursor = 'crosshair'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      />
      <mesh position={focusPoint}>
        <sphereGeometry args={[compact ? 0.04 : 0.052, 18, 18]} />
        <meshStandardMaterial color="#67e2d6" emissive="#1d9991" emissiveIntensity={0.8} />
      </mesh>
      <Landmark name="Nasion" position={structurePoints.Nasion} selected={selected} onSelect={setSelected} setFocusPoint={setFocusPoint} size={compact ? 0.027 : 0.035} />
      <Landmark name="Glabella" position={structurePoints.Glabella} selected={selected} onSelect={setSelected} setFocusPoint={setFocusPoint} size={compact ? 0.027 : 0.035} />
      <Landmark name="Supraorbital notch" position={structurePoints['Supraorbital notch']} selected={selected} onSelect={setSelected} setFocusPoint={setFocusPoint} size={compact ? 0.027 : 0.035} />
      <Landmark name="Infraorbital foramen" position={structurePoints['Infraorbital foramen']} selected={selected} onSelect={setSelected} setFocusPoint={setFocusPoint} size={compact ? 0.027 : 0.035} />
      <Landmark name="Mental foramen" position={structurePoints['Mental foramen']} selected={selected} onSelect={setSelected} setFocusPoint={setFocusPoint} size={compact ? 0.027 : 0.035} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={2.8}
        maxDistance={8.5}
        minPolarAngle={0.08}
        maxPolarAngle={Math.PI - 0.08}
        autoRotate={false}
        enableDamping
        dampingFactor={0.075}
      />
    </>
  );
}

function Landmark({ name, position, selected, onSelect, setFocusPoint, size }: {
  name: string;
  position: Point3;
  selected: string;
  onSelect: (name: string) => void;
  setFocusPoint: (point: Point3) => void;
  size: number;
}) {
  const active = selected === name;
  return (
    <mesh
      position={position}
      onClick={(event) => { event.stopPropagation(); onSelect(name); setFocusPoint(position); }}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <sphereGeometry args={[active ? size * 1.3 : size, 18, 18]} />
      <meshStandardMaterial color={active ? '#71eee0' : '#f2b15e'} emissive={active ? '#2daaa0' : '#8a5020'} emissiveIntensity={active ? 0.55 : 0.2} />
    </mesh>
  );
}

export default function SkullViewer({ compact = false }: ViewerProps) {
  const [selected, setSelected] = useState('Frontal bone');
  const [focusPoint, setFocusPoint] = useState<Point3>(structurePoints['Frontal bone']);
  const [wireframe, setWireframe] = useState(false);
  const [cameraView, setCameraView] = useState('Right 70°');
  const controlsRef = useRef<any>(null);
  const { width } = useThreeSafeWidth();
  const currentColor = boneColors[selected] || '#f2b15e';

  const selectStructure = (name: string) => {
    setSelected(name);
    setFocusPoint(structurePoints[name] || structurePoints['Frontal bone']);
  };

  const handleFocus = () => {
    if (controlsRef.current) {
      controlsRef.current.target.set(focusPoint[0], focusPoint[1], focusPoint[2]);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    setWireframe(false);
    setCameraView('Right 70°');
    selectStructure('Frontal bone');
    if (controlsRef.current) controlsRef.current.reset();
  };

  const viewer = (
    <div className={'skull-viewer-canvas' + (compact ? ' compact' : '')}>
      <ViewerBoundary fallback={<div className="viewer-fallback"><div className="model-error"><b>3D model unavailable</b><span>Reload this chapter to try the model again.</span></div></div>}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => { document.body.style.cursor = 'auto'; }}
        >
          <Suspense fallback={<Html center><div className="model-loading">Loading the CT skull…</div></Html>}>
            <SkullScene
              selected={selected}
              setSelected={setSelected}
              focusPoint={focusPoint}
              setFocusPoint={setFocusPoint}
              wireframe={wireframe}
              cameraView={cameraView}
              controlsRef={controlsRef}
              compact={compact}
            />
          </Suspense>
        </Canvas>
      </ViewerBoundary>
      {!compact && <div className="viewer-hint"><span className="live-dot" /> Drag to rotate <span className="hint-divider" /> Scroll to zoom</div>}
      {compact && <div className="viewer-badge"><Sparkles size={12} /> DRAG TO EXPLORE</div>}
    </div>
  );

  if (compact) {
    return (
      <div className="skull-preview">
        {viewer}
        <div className="preview-controls">
          <div><span className="eyebrow">ANATOMY STUDIO</span><strong>{selected}</strong><p>{notes[selected] || 'Click a structure to review it.'}</p></div>
          <button className="icon-button dark" title="Reset view" aria-label="Reset skull view" onClick={handleReset}><RotateCcw size={15} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="skull-studio">
      <div className="studio-topline"><div><span className="eyebrow">INTERACTIVE ANATOMY STUDIO</span><h2>Explore the skull</h2><p>Click the scan for a regional label, or choose a named structure. Rotate to inspect it from every side.</p></div><div className="studio-status"><span className="live-dot" /> CT-DERIVED MODEL</div></div>
      <div className="studio-grid">
        <div className="studio-model-card">
          {viewer}
          <div className="viewer-toolbar">
            {['Right 70°', 'Front', 'Lateral', 'Superior', 'Basilar'].map((view) => <button key={view} className={cameraView === view ? 'active' : ''} onClick={() => setCameraView(view)}>{view}</button>)}
            <span className="toolbar-spacer" />
            <button className={wireframe ? 'active' : ''} onClick={() => setWireframe(!wireframe)}><Scan size={14} /> Wireframe</button>
            <button onClick={handleFocus}><Focus size={14} /> Focus</button>
            <button onClick={handleReset} aria-label="Reset model"><RotateCcw size={14} /></button>
          </div>
        </div>
        <aside className="studio-sidebar">
          <div className="selected-anatomy-card">
            <span className="eyebrow">SELECTED STRUCTURE</span>
            <h3><i style={{ background: currentColor }} />{selected}</h3>
            <p>{notes[selected] || 'Choose a bone or landmark to see a short anatomical note.'}</p>
            {selected.includes('foramen') || selected.includes('notch') ? <div className="nerve-tag"><Box size={14} /> Cranial nerve pathway</div> : null}
          </div>
          <div className="landmark-list bone-list">
            <span className="eyebrow">SKULL BONES</span>
            <div className="bone-chip-list">
              {boneNames.map((name) => <button key={name} className={selected === name ? 'active' : ''} title={name} onClick={() => selectStructure(name)}><span className="pin" />{name}</button>)}
            </div>
          </div>
          <div className="landmark-list bone-list">
            <span className="eyebrow">DENTITION</span>
            <div className="bone-chip-list">
              {toothNames.map((name) => <button key={name} className={selected === name ? 'active' : ''} title={name} onClick={() => selectStructure(name)}><span className="pin" />{name}</button>)}
            </div>
          </div>
          <div className="landmark-list">
            <span className="eyebrow">FACE LANDMARKS</span>
            {['Nasion', 'Glabella', 'Supraorbital notch', 'Infraorbital foramen', 'Mental foramen'].map((name) => <button key={name} className={selected === name ? 'active' : ''} onClick={() => selectStructure(name)}><span className="pin" />{name}<span className="chevron">›</span></button>)}
          </div>
          <div className="studio-note"><div className="note-icon">i</div><p>Source: <a href="https://3d.nih.gov/entries/3dpx-012260" target="_blank" rel="noreferrer">Visible Human Male Skull</a> by K. Browne (NIH 3D), adapted under CC BY 4.0. This is one continuous scan surface, so clicks identify broad regions; use the structure list for named bones and landmarks.</p></div>
        </aside>
      </div>
      <div className="studio-foot"><span><span className="live-dot" /> {width > 760 ? 'VISIBLE HUMAN STUDY MODEL' : 'CT STUDY MODEL'}</span><span>Mouse, trackpad, or touch supported</span></div>
    </div>
  );
}

function useThreeSafeWidth() {
  const [width, setWidth] = useState(typeof window === 'undefined' ? 1024 : window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { width };
}
