import { useState } from 'react';

type BoneVariant = 'flat' | 'long' | 'irregular' | 'vertebra' | 'rib' | 'curve' | 'cluster' | 'pelvis' | 'small';

export function BoneGlyph({ variant, label }: { variant: string; label: string }) {
  const bone = '#e6d8b6';
  const edge = '#9c9076';
  const shape = variant as BoneVariant;
  return (
    <svg className="bone-glyph" viewBox="0 0 96 96" role="img" aria-label={label + ' illustration'}>
      <defs>
        <linearGradient id={'bone-' + label.replace(/[^a-z0-9]/gi, '')} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff5d7" />
          <stop offset="1" stopColor={bone} />
        </linearGradient>
      </defs>
      {shape === 'long' && <g fill={bone} stroke={edge} strokeWidth="2.4" strokeLinejoin="round"><path d="M35 15c-8-4-16 3-13 11l6 13-2 18-6 16c-3 8 6 15 14 11l7-6 13 1 7 6c8 4 17-3 14-11l-6-17 1-17 6-14c3-8-5-15-13-11l-8 5-12-1z" /><path d="M42 27l12 1-2 39-12-1z" fill="#f3e9d0" stroke="none" /></g>}
      {shape === 'flat' && <g fill={bone} stroke={edge} strokeWidth="2.4" strokeLinejoin="round"><path d="M15 45c6-18 21-28 38-28s28 8 31 22c4 18-10 38-27 42-19 4-43-14-42-36z" /><path d="M28 48c10-12 29-16 42-4M31 60c11-8 27-8 38-1" fill="none" stroke="#c2b492" strokeWidth="2" /></g>}
      {shape === 'irregular' && <g fill={bone} stroke={edge} strokeWidth="2.4" strokeLinejoin="round"><path d="M49 12l12 8 15-1 6 13-8 11 8 12-8 12 2 12-15 3-11-8-13 7-10-9 3-14-8-10 8-12-3-13 15-4z" /><path d="M46 31l8 6-2 11 8 7-7 12" fill="none" stroke="#b5a78b" strokeWidth="2" /></g>}
      {shape === 'vertebra' && <g fill={bone} stroke={edge} strokeWidth="2.2" strokeLinejoin="round"><path d="M33 30c5-8 25-8 30 0l-1 9 15 3 7 8-14 7-9 1c-4 10-22 10-26 0l-11-1-14-7 7-8 15-3z" /><ellipse cx="48" cy="47" rx="10" ry="8" fill="#101822" stroke="#b8ab90" strokeWidth="2" /><path d="M40 55l-8 20 16-8 16 8-8-20" /></g>}
      {shape === 'rib' && <g fill="none" strokeLinecap="round"><path d="M22 68c-3-27 9-45 31-45 12 0 21 7 22 18 1 8-4 13-12 14" stroke={edge} strokeWidth="13" /><path d="M22 68c-3-27 9-45 31-45 12 0 21 7 22 18 1 8-4 13-12 14" stroke={bone} strokeWidth="8" /></g>}
      {shape === 'curve' && <g fill="none" strokeLinecap="round"><path d="M15 53c12-16 22-19 34-12 13 7 19 5 32-5" stroke={edge} strokeWidth="14" /><path d="M15 53c12-16 22-19 34-12 13 7 19 5 32-5" stroke={bone} strokeWidth="9" /></g>}
      {shape === 'cluster' && <g fill={bone} stroke={edge} strokeWidth="2"><rect x="18" y="24" width="22" height="20" rx="8" transform="rotate(-18 29 34)" /><rect x="43" y="18" width="20" height="22" rx="8" transform="rotate(12 53 29)" /><rect x="57" y="43" width="22" height="20" rx="8" transform="rotate(-14 68 53)" /><rect x="30" y="48" width="24" height="23" rx="8" transform="rotate(9 42 59)" /><rect x="15" y="61" width="19" height="18" rx="8" /></g>}
      {shape === 'pelvis' && <g fill={bone} stroke={edge} strokeWidth="2.4" strokeLinejoin="round"><path d="M23 20c-9 7-9 24-2 35l12 10 5 15 13-3-2-17 8-2 4 19 13 3 3-17 9-10c6-13 1-28-8-34-9-6-18 2-23 10-8-8-20-15-32-9z" /><ellipse cx="48" cy="53" rx="9" ry="13" fill="#101822" stroke="#b8ab90" strokeWidth="2" /></g>}
      {shape === 'small' && <g fill={bone} stroke={edge} strokeWidth="2.4"><path d="M48 16c16 0 29 10 29 25 0 8-5 14-11 18 2 12-7 21-18 21s-20-9-18-21c-7-5-11-11-11-19 0-14 13-24 29-24z" /><path d="M38 46c5 4 15 4 20 0" fill="none" stroke="#b5a78b" strokeWidth="2" /></g>}
    </svg>
  );
}

const skullBones = [
  { id: 'frontal', label: 'Frontal bone', color: '#f0bf82', path: 'M140 54 Q206 8 272 54 L260 111 Q206 94 152 111Z' },
  { id: 'nasal', label: 'Nasal bones', color: '#83c7c5', path: 'M193 142 L206 125 L219 142 L214 168 L206 176 L198 168Z' },
  { id: 'zygomatic', label: 'Zygomatic bones', color: '#ea9da0', path: 'M137 153 Q161 137 183 159 L179 184 Q161 192 139 180Z M229 159 Q251 137 275 153 L273 180 Q251 192 233 184Z' },
  { id: 'maxilla', label: 'Maxillae', color: '#a7b4df', path: 'M176 176 L196 181 L206 176 L216 181 L236 176 L231 211 Q205 225 181 211Z' },
  { id: 'mandible', label: 'Mandible', color: '#dcadcf', path: 'M158 194 L177 210 Q206 228 235 210 L254 194 L250 232 Q231 252 206 252 Q181 252 162 232Z' },
];

export function SkullMap({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState('frontal');
  const current = skullBones.find((bone) => bone.id === selected) || skullBones[0];
  return (
    <div className={'skull-map-wrap' + (compact ? ' compact' : '')}>
      <div className="skull-map">
        <svg viewBox="0 0 412 290" role="img" aria-label="Clickable front view of the skull">
          <defs>
            <linearGradient id="vault" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#fff2d2" /><stop offset="1" stopColor="#d7c6a5" /></linearGradient>
            <filter id="softGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <path d="M128 127C112 76 142 31 206 25c64 6 94 51 78 102l-9 69c-6 43-36 68-69 68s-63-25-69-68z" fill="url(#vault)" stroke="#917f65" strokeWidth="3" />
          <path d="M131 102Q206 69 281 102" fill="none" stroke="#b7a78b" strokeWidth="2" />
          {skullBones.map((bone) => (
            <path key={bone.id} d={bone.path} className={'skull-bone ' + (selected === bone.id ? 'active' : '')} fill={bone.color} stroke={selected === bone.id ? '#56d4d5' : '#8d7e67'} strokeWidth={selected === bone.id ? 4 : 2} filter={selected === bone.id ? 'url(#softGlow)' : undefined} onClick={() => setSelected(bone.id)} tabIndex={0} role="button" aria-label={'Select ' + bone.label} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelected(bone.id); }} />
          ))}
          <path d="M157 126q20-20 39 0l-2 24q-20 16-39 0zM216 126q20-20 39 0l2 24q-20 16-39 0z" fill="#111822" stroke="#88775d" strokeWidth="3" />
          <path d="M198 169q8-7 16 0l-8 18z" fill="#111822" />
          <path d="M180 217q26 10 52 0" fill="none" stroke="#907b63" strokeWidth="3" strokeLinecap="round" />
          <g fill="#f5e9d0" stroke="#a99a7d" strokeWidth="1.2">
            <path d="M180 195h9v15h-9zM191 197h9v15h-9zM202 197h9v15h-9zM213 197h9v15h-9zM224 195h9v15h-9z" />
          </g>
          {!compact && <g className="landmark-pins"><circle cx="206" cy="118" r="5" /><circle cx="206" cy="172" r="5" /><circle cx="206" cy="237" r="5" /></g>}
        </svg>
      </div>
      <div className="skull-map-caption">
        <span className="eyebrow">SELECTED BONE</span>
        <strong>{current.label}</strong>
        <div className="skull-bone-tabs">
          {skullBones.map((bone) => <button key={bone.id} className={selected === bone.id ? 'selected' : ''} onClick={() => setSelected(bone.id)}>{bone.label}</button>)}
        </div>
      </div>
    </div>
  );
}

const muscleData = [
  { id: 'frontalis', label: 'Frontalis', short: 'Raises eyebrows' },
  { id: 'orbicularis-oculi', label: 'Orbicularis oculi', short: 'Closes the eyelids' },
  { id: 'zygomaticus', label: 'Zygomaticus', short: 'Elevates mouth angle' },
  { id: 'buccinator', label: 'Buccinator', short: 'Keeps food between teeth' },
  { id: 'orbicularis-oris', label: 'Orbicularis oris', short: 'Closes and puckers lips' },
];

export function FaceMuscleMap() {
  const [selected, setSelected] = useState('orbicularis-oculi');
  const current = muscleData.find((item) => item.id === selected) || muscleData[0];
  return (
    <div className="face-map-wrap">
      <svg className="face-map" viewBox="0 0 360 340" role="img" aria-label="Interactive facial expression muscle map">
        <defs><linearGradient id="skin" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f5d7bc" /><stop offset="1" stopColor="#d9a98e" /></linearGradient></defs>
        <path d="M91 70Q180 16 269 70L258 217Q245 299 180 311Q115 299 102 217Z" fill="url(#skin)" stroke="#ac826c" strokeWidth="3" />
        <path d="M104 100Q180 59 256 100" fill="none" stroke="#c38175" strokeWidth="7" strokeLinecap="round" className={selected === 'frontalis' ? 'muscle-active' : ''} onClick={() => setSelected('frontalis')} />
        <path d="M119 135Q145 115 165 137Q146 157 119 135ZM195 137Q215 115 241 135Q215 157 195 137Z" fill="#f6efe2" stroke="#755d50" strokeWidth="2" />
        <ellipse cx="143" cy="136" rx="9" ry="10" fill="#273342" /><ellipse cx="217" cy="136" rx="9" ry="10" fill="#273342" />
        <ellipse cx="143" cy="136" rx="29" ry="24" fill="none" stroke="#cf6f73" strokeWidth="7" opacity={selected === 'orbicularis-oculi' ? '1' : '.65'} className={selected === 'orbicularis-oculi' ? 'muscle-active' : ''} onClick={() => setSelected('orbicularis-oculi')} />
        <ellipse cx="217" cy="136" rx="29" ry="24" fill="none" stroke="#cf6f73" strokeWidth="7" opacity={selected === 'orbicularis-oculi' ? '1' : '.65'} className={selected === 'orbicularis-oculi' ? 'muscle-active' : ''} onClick={() => setSelected('orbicularis-oculi')} />
        <path d="M168 156L180 191L192 156Z" fill="#bd8e78" stroke="#a97866" strokeWidth="2" />
        <path d="M130 179Q151 161 170 180L160 204Q143 208 130 194ZM230 179Q209 161 190 180L200 204Q217 208 230 194Z" fill="#d77b75" opacity={selected === 'buccinator' ? '.9' : '.58'} className={selected === 'buccinator' ? 'muscle-active' : ''} onClick={() => setSelected('buccinator')} />
        <path d="M136 180L167 210M224 180L193 210" fill="none" stroke="#a45155" strokeWidth="6" strokeLinecap="round" opacity={selected === 'zygomaticus' ? '1' : '.55'} className={selected === 'zygomaticus' ? 'muscle-active' : ''} onClick={() => setSelected('zygomaticus')} />
        <ellipse cx="180" cy="229" rx="32" ry="19" fill="none" stroke="#b94d63" strokeWidth="7" opacity={selected === 'orbicularis-oris' ? '1' : '.6'} className={selected === 'orbicularis-oris' ? 'muscle-active' : ''} onClick={() => setSelected('orbicularis-oris')} />
        <path d="M151 231Q180 240 209 231" fill="none" stroke="#9e4b59" strokeWidth="3" />
        <path d="M111 250Q180 273 249 250" fill="none" stroke="#c58972" strokeWidth="2" />
        <g className="face-map-labels"><text x="180" y="41">FRONTALIS</text><text x="83" y="141">OCULI</text><text x="275" y="192">BUCCINATOR</text><text x="180" y="283">ORBICULARIS ORIS</text></g>
      </svg>
      <div className="face-map-info"><span className="eyebrow">MUSCLE SPOTLIGHT</span><strong>{current.label}</strong><p>{current.short}</p>
        <div className="muscle-tabs">{muscleData.map((item) => <button key={item.id} aria-label={item.label} title={item.label} className={selected === item.id ? 'selected' : ''} onClick={() => setSelected(item.id)}><span /></button>)}</div>
      </div>
    </div>
  );
}

export function LongBoneDiagram() {
  return (
    <svg className="long-bone-diagram" viewBox="0 0 420 170" role="img" aria-label="Long bone showing epiphysis, metaphysis, diaphysis, and growth plate">
      <path d="M80 30c-21-4-35 7-35 24 0 13 10 20 23 23v17c-14 4-23 11-23 24 0 18 14 28 35 24l15-7h228l15 7c21 4 35-6 35-24 0-13-9-20-23-24V77c13-3 23-10 23-23 0-17-14-28-35-24l-15 7H95z" fill="#eadbbc" stroke="#a99a7d" strokeWidth="3" />
      <path d="M95 35v102M325 35v102" stroke="#55c6c8" strokeWidth="5" strokeDasharray="5 5" />
      <path d="M111 55h198v62H111z" fill="#f8efd9" stroke="#c2b18f" strokeWidth="2" />
      <path d="M210 56v60" stroke="#c6b897" strokeWidth="2" />
      <g fill="#f2e8d1" stroke="#c5b590" strokeWidth="2"><path d="M125 65l24 13-17 20zM182 72l25-8 12 24-26 8zM258 66l31 15-22 22-18-14zM144 107l21-16 19 20-22 10zM246 93l22 4 17 20-29 3z" /></g>
      <g className="bone-diagram-label"><text x="42" y="15">EPIPHYSIS</text><text x="164" y="153">DIAPHYSIS · SHAFT</text><text x="333" y="15">EPIPHYSIS</text><text x="44" y="164">GROWTH PLATE</text><text x="322" y="164">METAPHYSIS</text></g>
      <path d="M65 19v17M354 19v17M91 139L76 151M326 139l20 12" stroke="#55c6c8" strokeWidth="1.5" />
    </svg>
  );
}

export function BrainDiagram() {
  return (
    <svg className="brain-diagram" viewBox="0 0 480 280" role="img" aria-label="Side view of the brain showing lobes, brainstem, and cerebellum">
      <path d="M70 121Q63 62 124 45Q158 10 208 34Q247 14 278 39Q326 36 341 75Q382 78 381 122Q386 151 354 169Q341 210 303 205Q275 220 244 196Q210 217 185 192Q148 200 134 172Q94 174 91 149Q72 144 70 121Z" fill="#edcabf" stroke="#b78a81" strokeWidth="3" />
      <path d="M203 40Q218 85 191 116Q172 134 186 190" fill="none" stroke="#fff1e8" strokeWidth="3" />
      <path d="M281 42Q262 87 286 115Q304 140 286 197" fill="none" stroke="#fff1e8" strokeWidth="3" />
      <path d="M106 67Q145 79 150 120Q145 157 126 168" fill="none" stroke="#fff1e8" strokeWidth="3" />
      <path d="M249 55Q229 76 241 104Q252 125 237 148" fill="none" stroke="#fff1e8" strokeWidth="3" />
      <path d="M315 124Q355 121 363 154Q360 186 329 196Q302 196 293 176Q292 149 315 124Z" fill="#73c7bf" stroke="#509d98" strokeWidth="3" />
      <path d="M245 171Q270 164 292 174L289 224Q277 239 261 224L254 199Z" fill="#dba46e" stroke="#ad7847" strokeWidth="3" />
      <g className="brain-labels"><text x="98" y="31">FRONTAL</text><text x="236" y="26">PARIETAL</text><text x="337" y="92">OCCIPITAL</text><text x="336" y="232">CEREBELLUM</text><text x="210" y="258">BRAINSTEM</text></g>
      <path d="M347 205v14M274 228l-2 12" stroke="#98ded6" strokeWidth="2" />
    </svg>
  );
}

export function ScalpLayersDiagram() {
  const layers = [
    ['S', 'Skin', '#f1c18c'],
    ['C', 'Dense connective tissue', '#e1a66c'],
    ['A', 'Aponeurosis', '#ca8073'],
    ['L', 'Loose areolar tissue', '#65c8c4'],
    ['P', 'Pericranium', '#b9a8e2'],
  ];
  return <div className="scalp-layers" aria-label="SCALP layers from superficial to deep">{layers.map(([letter, name, color], index) => <div className={'scalp-layer layer-' + letter.toLowerCase()} key={letter}><b>{letter}</b><span>{name}</span><i style={{ background: color, width: (100 - index * 7) + '%' }} /></div>)}</div>;
}
