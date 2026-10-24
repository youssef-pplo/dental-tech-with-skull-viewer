import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Bone, Brain, CircleDot, Compass, MoveUpRight, RotateCw, Search, Shield, Sparkles, Waypoints } from 'lucide-react';
import { boneCatalog, jointRows } from '../data';
import { BoneGlyph, BrainDiagram, FaceMuscleMap, LongBoneDiagram, ScalpLayersDiagram, SkullMap } from './Illustrations';
import SkullViewer from './SkullViewer';

function SectionHeading({ number, title, text, icon }: { number: string; title: string; text?: string; icon?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div className="section-number">{number}</div>
      <div><h2>{title}</h2>{text && <p>{text}</p>}</div>
      {icon && <div className="section-icon">{icon}</div>}
    </div>
  );
}

function NoteCard({ label, title, children, tone = 'teal' }: { label: string; title: string; children: React.ReactNode; tone?: string }) {
  return <div className={'note-card note-' + tone}><span className="eyebrow">{label}</span><h3>{title}</h3><div>{children}</div></div>;
}

function BoneAtlas() {
  const [region, setRegion] = useState('All bones');
  const [query, setQuery] = useState('');
  const regions = ['All bones', 'Skull', 'Axial', 'Upper limb', 'Lower limb'];
  const shown = useMemo(() => boneCatalog.filter((bone) => (region === 'All bones' || bone.region === region) && (bone.name.toLowerCase().includes(query.toLowerCase()) || bone.note.toLowerCase().includes(query.toLowerCase()))), [query, region]);
  return (
    <div className="bone-atlas">
      <div className="atlas-toolbar">
        <div className="atlas-tabs">{regions.map((name) => <button key={name} className={region === name ? 'active' : ''} onClick={() => setRegion(name)}>{name}</button>)}</div>
        <label className="mini-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a bone" /></label>
      </div>
      <div className="bone-grid">{shown.map((bone) => <article className="bone-card" key={bone.name}><div className="bone-card-art"><BoneGlyph variant={bone.variant} label={bone.name} /><span>{bone.region.toUpperCase()}</span></div><div><h3>{bone.name}</h3><p>{bone.note}</p></div></article>)}</div>
      {shown.length === 0 && <p className="empty-state">No bones match that search.</p>}
      <p className="atlas-footnote">Representative illustrations pair with the named bones in the lecture material. Counts refer to a typical adult skeleton.</p>
    </div>
  );
}

function IntroBones() {
  return (
    <div className="chapter-content">
      <section className="content-section">
        <SectionHeading number="01" title="Start with the shared map" text="Anatomy is the study of the body's structures and how they relate to one another." icon={<Compass size={20} />} />
        <div className="anatomical-position-card">
          <div className="position-figure" aria-label="Anatomical position illustration">
            <svg viewBox="0 0 180 260" role="img" aria-label="Person standing in anatomical position with palms facing forward">
              <circle cx="90" cy="34" r="23" fill="#e9d5b7" stroke="#998c75" strokeWidth="2" />
              <path d="M62 69Q90 58 118 69L127 133L111 142L106 106L104 170L122 237L105 242L88 179L75 242L58 237L76 170L74 106L69 142L53 133Z" fill="#c7e8df" stroke="#73b6ab" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M58 80L39 145L29 190M122 80L141 145L151 190" fill="none" stroke="#c7e8df" strokeWidth="15" strokeLinecap="round" />
              <path d="M58 80L39 145L29 190M122 80L141 145L151 190" fill="none" stroke="#73b6ab" strokeWidth="2" strokeLinecap="round" />
              <circle cx="26" cy="195" r="5" fill="#efb96d" /><circle cx="154" cy="195" r="5" fill="#efb96d" />
            </svg>
            <span className="orientation-caption">PALMS FORWARD · THUMBS LATERAL</span>
          </div>
          <div className="position-details">
            <span className="eyebrow">ANATOMICAL POSITION</span>
            <h3>The reference pose</h3>
            <p>Stand upright, face forward, keep the arms by the sides and the legs close together. Turn the palms forward so the thumbs point away from the body's midline.</p>
            <div className="direction-pairs">
              <div><b>Superior</b><span>Toward the head</span></div><div><b>Inferior</b><span>Toward the feet</span></div>
              <div><b>Medial</b><span>Toward the midline</span></div><div><b>Lateral</b><span>Away from the midline</span></div>
              <div><b>Anterior</b><span>Toward the front</span></div><div><b>Posterior</b><span>Toward the back</span></div>
              <div><b>Proximal</b><span>Nearer a limb's root</span></div><div><b>Distal</b><span>Farther from a limb's root</span></div>
            </div>
          </div>
        </div>
        <div className="plane-row">
          <article className="plane-card"><div className="plane-art coronal"><span /></div><b>Coronal / frontal</b><p>Separates anterior from posterior.</p></article>
          <article className="plane-card"><div className="plane-art sagittal"><span /></div><b>Sagittal / median</b><p>Separates right from left.</p></article>
          <article className="plane-card"><div className="plane-art transverse"><span /></div><b>Transverse / axial</b><p>Separates superior from inferior.</p></article>
        </div>
        <div className="quick-label"><span className="eyebrow">MOVEMENT WORDS</span><p>Each term describes a direction from the anatomical position.</p></div>
        <div className="movement-grid">
          {[['Flexion', 'Bends a joint; usually decreases its angle.'], ['Extension', 'Straightens a joint; usually increases its angle.'], ['Abduction', "Moves away from the body's midline."], ['Adduction', "Moves toward the body's midline."], ['Rotation', 'Turns a bone around its long axis.'], ['Circumduction', 'Moves a limb in a cone-shaped path.'], ['Pronation', 'Turns the forearm so the palm faces posteriorly/down.'], ['Supination', 'Turns the forearm so the palm faces anteriorly/up.'], ['Inversion', 'Turns the sole of the foot inward.'], ['Eversion', 'Turns the sole of the foot outward.']].map(([name, note]) => <article key={name}><b>{name}</b><span>{note}</span></article>)}
        </div>
        <div className="body-layers-card">
          <div><span className="eyebrow">SURFACE → DEEP</span><h3>Five body layers</h3><p>A simple route from skin toward skeletal muscle.</p></div>
          <div className="body-layer-stack">{[['Skin', '#e8be8c'], ['Superficial fascia', '#e2a972'], ['Deep fascia', '#ce8a7c'], ['Epimysium', '#bd90be'], ['Muscle', '#829bc6']].map(([name, color], index) => <div key={name}><i style={{ background: color, width: (100 - index * 7) + '%' }} /><span>{String(index + 1).padStart(2, '0')}</span><b>{name}</b></div>)}</div>
        </div>
        <div className="quick-label"><span className="eyebrow">WAYS TO STUDY ANATOMY</span><p>Four approaches from the older skeletal-system lecture.</p></div>
        <div className="anatomy-fields">{[['Gross', 'Structures visible without a microscope.'], ['Microscopic', 'Cells and tissues seen under magnification.'], ['Regional', 'All structures within one body area.'], ['Systemic', 'Organs grouped by the system they serve.']].map(([name, note]) => <article key={name}><span>{name === 'Gross' ? 'G' : name === 'Microscopic' ? 'µ' : name === 'Regional' ? 'R' : 'S'}</span><div><b>{name} anatomy</b><small>{note}</small></div></article>)}</div>
      </section>

      <section className="content-section">
        <SectionHeading number="02" title="A skeleton of 206 bones" text="Two divisions give you a quick way to remember where each region belongs." icon={<Bone size={20} />} />
        <div className="skeleton-counts">
          <div className="count-card"><span>ADULT SKELETON</span><strong>206</strong><small>bones, typically</small><div className="count-bar"><i style={{ width: '39%' }} /><i style={{ width: '61%' }} /></div><div className="count-legend"><span><i className="swatch axial" /> Axial · 80</span><span><i className="swatch appendicular" /> Appendicular · 126</span></div></div>
          <div className="division-card"><div className="division-icon axial-icon"><Shield size={24} /></div><div><span className="eyebrow">AXIAL · 80 BONES</span><h3>The central axis</h3><p>Skull, auditory ossicles, hyoid, vertebral column, ribs, and sternum. It supports the head and trunk and protects the brain, spinal cord, and thoracic organs.</p></div></div>
          <div className="division-card"><div className="division-icon appendicular-icon"><MoveUpRight size={24} /></div><div><span className="eyebrow">APPENDICULAR · 126 BONES</span><h3>The limbs and girdles</h3><p>Pectoral and pelvic girdles plus the bones of the upper and lower limbs. This division gives the limbs their framework for movement.</p></div></div>
        </div>
        <div className="region-strip">
          <div><b>Vertebral column</b><span>7 cervical · 12 thoracic · 5 lumbar · 5 sacral fused · 4 coccygeal fused</span></div>
          <div><b>Hand</b><span>8 carpals · 5 metacarpals · 14 phalanges</span></div>
          <div><b>Foot</b><span>7 tarsals · 5 metatarsals · 14 phalanges</span></div>
        </div>
        <div className="region-strip region-strip-more">
          <div><b>Skull</b><span>22 bones: 8 cranial · 14 facial</span></div>
          <div><b>Thoracic cage</b><span>24 ribs + sternum</span></div>
          <div><b>Vertebral column</b><span>33 segments; sacral and coccygeal segments fuse in the adult</span></div>
          <div><b>Each hand</b><span>27 bones: 8 carpals · 5 metacarpals · 14 phalanges</span></div>
          <div><b>Each foot</b><span>26 bones: 7 tarsals · 5 metatarsals · 14 phalanges</span></div>
          <div><b>Girdles</b><span>Clavicle + scapula at the shoulder; two hip bones at the pelvis</span></div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading number="03" title="Browse the bone atlas" text="Tap a region to filter the illustrated bones and review their location." icon={<Sparkles size={20} />} />
        <BoneAtlas />
      </section>

      <section className="content-section">
        <SectionHeading number="04" title="How a long bone is built" text="The shaft and ends have different structures while the bone is growing." icon={<Waypoints size={20} />} />
        <div className="diagram-card"><LongBoneDiagram /><div className="diagram-legend"><span><i className="swatch teal" /> Epiphyseal plate · cartilage during growth</span><span><i className="swatch cream" /> Compact shell and trabecular ends</span></div></div>
        <div className="fact-grid three">
          <NoteCard label="ENDS" title="Epiphyses"><p>The expanded ends meet neighboring bones. Spongy bone is common inside the epiphyses.</p></NoteCard>
          <NoteCard label="GROWTH ZONE" title="Metaphysis"><p>This transition region sits beside the epiphyseal plate while the bone is growing.</p></NoteCard>
          <NoteCard label="SHAFT" title="Diaphysis"><p>The shaft is mostly compact bone around a marrow cavity.</p></NoteCard>
        </div>
        <div className="rule-card"><div className="rule-icon"><RotateCw size={19} /></div><div><span className="eyebrow">GROWING END MEMORY AID</span><h3>“To the elbow I go, from the knee I flee.”</h3><p>The nutrient artery points toward the non-growing end. The humerus grows mainly from its upper end; the femur from its lower end.</p></div><div className="rule-pills"><span>Humerus · upper end</span><span>Femur · lower end</span></div></div>
      </section>

      <section className="content-section">
        <SectionHeading number="05" title="Bone tissue, shape, and development" text="Shape hints at a bone's structure and job." icon={<CircleDot size={20} />} />
        <div className="fact-grid three">
          <NoteCard label="STRUCTURE" title="Compact & cancellous"><p>Compact bone makes a dense outer layer. Cancellous bone is a lattice of trabeculae, often prominent at the ends of long bones.</p></NoteCard>
          <NoteCard label="SHAPE" title="Six useful groups"><p>Long, short, flat, irregular, pneumatic, and sesamoid bones. Examples: femur, carpal, sternum, vertebra, frontal bone, and patella.</p></NoteCard>
          <NoteCard label="OSSIFICATION" title="Two routes to bone"><p>Intramembranous ossification forms bones such as parts of the skull and clavicle. Endochondral ossification replaces a cartilage model, as in long bones.</p></NoteCard>
        </div>
        <div className="clinical-row"><div className="clinical-symbol"><Shield size={21} /></div><div><span className="eyebrow">CLINICAL CONNECTION</span><h3>Bone is living tissue</h3><p>Bone marrow produces blood cells. Bones also store minerals, support soft tissue, give muscles attachment, and protect organs. Osteoporosis lowers bone mass and increases fragility; calcium, vitamin D, and weight-bearing activity support bone health.</p></div></div>
      </section>
    </div>
  );
}

function JointsContent() {
  const [type, setType] = useState('All types');
  const [mobility, setMobility] = useState('All movement');
  const rows = jointRows.filter((row) => (type === 'All types' || row.type === type) && (mobility === 'All movement' || row.mobility === mobility));
  return (
    <div className="chapter-content">
      <section className="content-section">
        <SectionHeading number="01" title="A joint is a meeting point" text="A joint (articulation) is where two or more bones meet. The tissue between them helps predict how much movement is possible." icon={<Waypoints size={20} />} />
        <div className="joint-summary">
          <article className="joint-type-card fibrous"><div className="joint-orbit"><span /><span /></div><span className="eyebrow">STRUCTURAL TYPE 01</span><h3>Fibrous</h3><p>Dense connective tissue joins the bones. Many are firm; syndesmoses allow a small amount of movement.</p><small>Suture · gomphosis · syndesmosis</small></article>
          <article className="joint-type-card cartilage"><div className="joint-orbit"><span /><span /></div><span className="eyebrow">STRUCTURAL TYPE 02</span><h3>Cartilaginous</h3><p>Hyaline cartilage or fibrocartilage connects the bones. Movement ranges from none to limited.</p><small>Synchondrosis · symphysis</small></article>
          <article className="joint-type-card synovial"><div className="joint-orbit"><span /><span /></div><span className="eyebrow">STRUCTURAL TYPE 03</span><h3>Synovial</h3><p>A fluid-filled cavity separates the articular surfaces. These joints are freely movable.</p><small>Plane · hinge · pivot · biaxial · ball-and-socket</small></article>
        </div>
      </section>
      <section className="content-section">
        <SectionHeading number="02" title="Compare the joint types" text="Filter by the structural class or functional movement, then compare examples and locations." icon={<BookOpen size={20} />} />
        <div className="comparison-filters">
          <label>STRUCTURE <select value={type} onChange={(event) => setType(event.target.value)}><option>All types</option><option>Fibrous</option><option>Cartilaginous</option><option>Synovial</option></select></label>
          <label>MOBILITY <select value={mobility} onChange={(event) => setMobility(event.target.value)}><option>All movement</option><option>Low</option><option>Limited</option><option>Free</option></select></label>
          <span>{rows.length} comparisons</span>
        </div>
        <div className="table-scroll"><table className="joint-table"><thead><tr><th>Class</th><th>Tissue between bones</th><th>Movement</th><th>Subtype</th><th>Where / example</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.type + row.subtype + index}><td><span className={'type-pill ' + row.type.toLowerCase()}>{row.type}</span></td><td>{row.tissue}</td><td>{row.movement}</td><td><b>{row.subtype}</b></td><td>{row.place}<small>{row.example}</small></td></tr>)}</tbody></table></div>
        <p className="table-note">Functional terms: synarthrosis = essentially immobile; amphiarthrosis = slightly movable; diarthrosis = freely movable. A structural class does not always map to one movement label: some fibrous and cartilaginous joints permit limited movement.</p>
      </section>
      <section className="content-section">
        <SectionHeading number="03" title="The synovial joint checklist" text="Five features make this family easy to recognize." icon={<CircleDot size={20} />} />
        <div className="checklist-grid">
          {[
            ['01', 'Articular cartilage', 'Smooth hyaline cartilage covers the ends of the articulating bones.'],
            ['02', 'Fibrous capsule', 'A capsule encloses the joint; localized thickening can reinforce it as ligaments.'],
            ['03', 'Synovial membrane', 'The inner lining secretes synovial fluid for lubrication.'],
            ['04', 'Joint cavity', 'The cavity lets the surfaces move freely relative to each other.'],
            ['05', 'Accessory structures', 'Some joints contain discs, menisci, labra, or intracapsular ligaments.'],
          ].map(([number, title, text]) => <article className="checklist-card" key={number}><div>{number}</div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="content-section">
        <SectionHeading number="04" title="Movement follows the axes" text="The number of axes is a quick way to group common synovial joints." icon={<RotateCw size={20} />} />
        <div className="axis-grid">
          <article><span className="axis-mark single" /><small>NON-AXIAL</small><h3>Plane</h3><p>Gliding movement between carpal and tarsal bones.</p></article>
          <article><span className="axis-mark single" /><small>UNIAXIAL</small><h3>Hinge / pivot</h3><p>One main axis: elbow flexion-extension; proximal radioulnar rotation.</p></article>
          <article><span className="axis-mark double" /><small>BIAXIAL</small><h3>Ellipsoid</h3><p>Two axes: the wrist moves in flexion-extension and abduction-adduction.</p></article>
          <article><span className="axis-mark multi" /><small>POLYAXIAL</small><h3>Ball-and-socket</h3><p>Several axes: shoulder and hip movement includes circumduction and rotation.</p></article>
        </div>
        <NoteCard label="APPLIED ANATOMY" title="Dislocation" tone="amber"><p>A dislocation occurs when joint surfaces are forced out of their normal relationship. Trauma, including a dashboard impact, can dislocate the hip.</p></NoteCard>
      </section>
    </div>
  );
}

function FaceContent() {
  const muscles = [
    ['Frontalis', 'Raises the eyebrows and wrinkles the forehead.'],
    ['Occipitalis', 'Retracts the scalp and works with frontalis through the epicranial aponeurosis.'],
    ['Orbicularis oculi', 'Closes the eyelids gently or tightly.'],
    ['Zygomaticus major & minor', 'Elevate the upper lip and mouth angle during smiling.'],
    ['Buccinator', 'Compresses the cheek and keeps food between the teeth during chewing; the parotid duct pierces it.'],
    ['Orbicularis oris', 'Closes and protrudes the lips for puckering, whistling, and speech.'],
    ['Platysma', 'Tenses the skin of the lower face and neck.'],
  ];
  const facialBranches = [
    ['Temporal', 'Frontalis · upper orbicularis oculi'],
    ['Zygomatic', 'Orbicularis oculi'],
    ['Buccal', 'Buccinator · cheek muscles'],
    ['Marginal mandibular', 'Lower lip and chin muscles'],
    ['Cervical', 'Platysma'],
  ];
  return (
    <div className="chapter-content">
      <section className="content-section">
        <SectionHeading number="01" title="Small movements, familiar expressions" text="Most muscles of facial expression attach to skin, so a small contraction can change the surface of the face." icon={<Sparkles size={20} />} />
        <div className="face-study-layout"><FaceMuscleMap /><div className="muscle-list">{muscles.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{name}</h3><p>{description}</p></div></article>)}</div></div>
      </section>
      <section className="content-section">
        <SectionHeading number="02" title="Motor and sensory supply are different" text="Separate the nerve that moves the face from the nerves that carry most facial sensation." icon={<Waypoints size={20} />} />
        <div className="nerve-compare">
          <article className="nerve-card motor"><div className="nerve-number">VII</div><span className="eyebrow">MOTOR · FACIAL NERVE</span><h3>Expression</h3><p>CN VII exits through the stylomastoid foramen, passes through the parotid gland, and divides into five terminal branches.</p><div className="branch-list">{facialBranches.map(([branch, supply]) => <span key={branch}><b>{branch}</b><i>{supply}</i></span>)}</div><small>Course slides use “mandibular”; the standard branch name is marginal mandibular.</small></article>
          <article className="nerve-card sensory"><div className="nerve-number">V</div><span className="eyebrow">SENSORY · TRIGEMINAL NERVE</span><h3>Facial sensation</h3><p>Most general sensation from the face travels through three divisions of CN V.</p><div className="territory-list"><span><b>V1</b> Ophthalmic <i>forehead & upper face</i></span><span><b>V2</b> Maxillary <i>midface & cheek</i></span><span><b>V3</b> Mandibular <i>lower face</i></span></div><small>The angle of the mandible and parotid region also receive sensation from the great auricular nerve (C2–C3).</small></article>
        </div>
        <div className="bell-card"><div className="bell-face">↗</div><div><span className="eyebrow">CLINICAL PEARL · FACIAL NERVE PALSY</span><h3>Weakness changes the balance</h3><p>With a left facial nerve palsy, the left forehead and mouth lose movement. When smiling, the stronger right side pulls the mouth angle toward the right. Other findings can include inability to close the left eye, a flattened nasolabial fold, and drooling from the affected side.</p></div></div>
      </section>
      <section className="content-section">
        <SectionHeading number="03" title="A route through the face" text="The facial artery takes a winding path so it can accommodate facial movement." icon={<MoveUpRight size={20} />} />
        <div className="vessel-flow">
          <div className="flow-card artery"><span className="flow-symbol">↗</span><span className="eyebrow">ARTERIAL SUPPLY</span><h3>Facial artery</h3><p>Branch of the external carotid. It crosses the lower border of the mandible, then runs a tortuous course toward the medial eye.</p><div className="flow-sequence"><span>Inferior labial</span><i>→</i><span>Superior labial</span><i>→</i><span>Lateral nasal</span><i>→</i><span>Angular</span></div><small>Other contributors: transverse facial, supraorbital, supratrochlear, infraorbital, and mental arteries.</small></div>
          <div className="flow-card vein"><span className="flow-symbol">↘</span><span className="eyebrow">VENOUS DRAINAGE</span><h3>Two routes to the neck</h3><div className="vein-routes"><p><b>Anterior facial vein</b><br />+ anterior retromandibular division → common facial vein → internal jugular vein</p><p><b>Posterior auricular vein</b><br />+ posterior retromandibular division → external jugular vein</p></div></div>
        </div>
      </section>
      <section className="content-section">
        <SectionHeading number="04" title="Remember the scalp with SCALP" text="Move from the surface toward the skull. The loose areolar layer is the clinically important one." icon={<BookOpen size={20} />} />
        <div className="scalp-card"><ScalpLayersDiagram /><div className="scalp-explain"><span className="eyebrow">SURFACE → DEEP</span><h3>The fifth layer protects the bone</h3><p>Skin, dense connective tissue, aponeurosis, loose areolar tissue, and pericranium. Emissary veins in the loose areolar layer connect superficial veins with intracranial venous sinuses, which is why it is called the dangerous area.</p><div className="layer-key"><span><b>S</b> Skin</span><span><b>C</b> Connective tissue</span><span><b>A</b> Aponeurosis</span><span className="danger"><b>L</b> Loose areolar tissue</span><span><b>P</b> Pericranium</span></div></div></div>
      </section>
    </div>
  );
}

function NormaCnsContent() {
  return (
    <div className="chapter-content">
      <section className="content-section">
        <SectionHeading number="01" title="Read the face from the front" text="Norma frontalis is the skull viewed from the front. Select a colored region or use the full 3D studio." icon={<Compass size={20} />} />
        <div className="skull-study-layout"><SkullMap /><div className="landmark-notes"><article><span className="landmark-dot" /><div><b>Nasion</b><p>Midline meeting of the frontonasal and internasal sutures.</p></div></article><article><span className="landmark-dot peach" /><div><b>Glabella</b><p>Smooth area between the superciliary arches, just above the nasion.</p></div></article><article><span className="landmark-dot lilac" /><div><b>Superciliary arches</b><p>Raised areas of the frontal bone above the orbits.</p></div></article><a className="text-link" href="#/skull-3d">Open the interactive skull studio <ArrowRight size={15} /></a></div></div>
      </section>
      <section className="content-section">
        <SectionHeading number="02" title="Three foramina, three sensory branches" text="The exit points align roughly in a vertical line on the face." icon={<Waypoints size={20} />} />
        <div className="foramina-stack">
          <article><span>01</span><div><h3>Supraorbital notch / foramen</h3><p>Supraorbital nerve and vessels exit above the orbit. The nerve comes from V1, the ophthalmic division.</p></div><b>V1</b></article>
          <article><span>02</span><div><h3>Infraorbital foramen</h3><p>Infraorbital nerve and vessels emerge on the maxilla below the orbit. The nerve comes from V2.</p></div><b>V2</b></article>
          <article><span>03</span><div><h3>Mental foramen</h3><p>Mental nerve and vessels emerge on the mandible near the premolars. The nerve comes from V3.</p></div><b>V3</b></article>
        </div>
      </section>
      <section className="content-section">
        <SectionHeading number="03" title="The nervous system at a glance" text="The CNS processes information; peripheral nerves connect it to the rest of the body." icon={<Brain size={20} />} />
        <div className="system-cards">
          <article className="system-card cns"><span className="eyebrow">CENTRAL · CNS</span><h3>Brain + spinal cord</h3><p>The brain sits in the cranial cavity. The spinal cord continues through the vertebral canal.</p><div><span>Brain</span><i>+</i><span>Spinal cord</span></div></article>
          <article className="system-card pns"><span className="eyebrow">PERIPHERAL · PNS</span><h3>Nerves beyond the CNS</h3><p>12 pairs of cranial nerves and 31 pairs of spinal nerves connect the CNS with the body.</p><div><span>12 cranial pairs</span><i>+</i><span>31 spinal pairs</span></div></article>
          <article className="system-card ans"><span className="eyebrow">AUTONOMIC · ANS</span><h3>Automatic control</h3><p>Sympathetic: T1–L2 outflow, “fight or flight.” Parasympathetic: CN III, VII, IX, X and S2–S4, “rest and digest.”</p><div><span>Sympathetic</span><i>↔</i><span>Parasympathetic</span></div></article>
        </div>
      </section>
      <section className="content-section">
        <SectionHeading number="04" title="Meet the main brain regions" text="Each region has a role, but they work together as one system." icon={<Brain size={20} />} />
        <div className="brain-card"><BrainDiagram /><div className="lobe-list">
          <article><i className="lobe-dot frontal" /><div><b>Frontal lobe</b><p>Planning, voluntary movement, and speech production.</p></div></article>
          <article><i className="lobe-dot parietal" /><div><b>Parietal lobe</b><p>Processes touch and other somatic sensations.</p></div></article>
          <article><i className="lobe-dot temporal" /><div><b>Temporal lobe</b><p>Important for hearing, memory, and language comprehension.</p></div></article>
          <article><i className="lobe-dot occipital" /><div><b>Occipital lobe</b><p>Processes visual information.</p></div></article>
          <article><i className="lobe-dot cerebellum" /><div><b>Cerebellum</b><p>Coordinates movement, muscle tone, and balance.</p></div></article>
        </div></div>
        <div className="fact-grid three">
          <NoteCard label="DIENCEPHALON" title="Thalamus + hypothalamus"><p>The thalamus is a major sensory relay. The hypothalamus helps regulate temperature, homeostasis, autonomic activity, and endocrine function.</p></NoteCard>
          <NoteCard label="BRAINSTEM" title="Midbrain · pons · medulla"><p>The brainstem links the brain and spinal cord and contains cranial nerve nuclei and vital autonomic centers.</p></NoteCard>
          <NoteCard label="CEREBRUM" title="Gyri and sulci"><p>The two cerebral hemispheres have raised gyri and grooves called sulci that increase cortical surface area.</p></NoteCard>
        </div>
      </section>
      <section className="content-section">
        <SectionHeading number="05" title="Meninges, CSF, and the spinal cord" text="Three protective membranes wrap the brain and spinal cord." icon={<Shield size={20} />} />
        <div className="meninges-row"><div className="meninges-stack"><div>Dura mater <span>outer · tough</span></div><div>Arachnoid mater <span>middle · web-like</span></div><div>Subarachnoid space <span>CSF + vessels</span></div><div>Pia mater <span>inner · follows brain surface</span></div></div><div className="meninges-explain"><span className="eyebrow">CSF LIVES HERE</span><h3>Between arachnoid and pia</h3><p>Cerebrospinal fluid cushions the brain and spinal cord. The subarachnoid space surrounds both and contains major vessels.</p></div></div>
        <div className="spinal-note"><div className="spinal-number">L1<br /><small>–</small><br />L2</div><p><b>The adult spinal cord usually ends near L1–L2.</b> It narrows as the conus medullaris; nerve roots below continue as the cauda equina. The spinal cord begins at the foramen magnum.</p></div>
      </section>
    </div>
  );
}

export default function ChapterContent({ id }: { id: string }) {
  if (id === 'intro-bones') return <IntroBones />;
  if (id === 'joints') return <JointsContent />;
  if (id === 'face-anatomy') return <FaceContent />;
  return <NormaCnsContent />;
}

export function SkullStudioPage() {
  return <div className="studio-page"><SkullViewer /></div>;
}
