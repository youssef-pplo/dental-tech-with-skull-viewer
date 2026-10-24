export type ChapterId = 'intro-bones' | 'joints' | 'face-anatomy' | 'norma-cns';

export type Question = {
  id: number;
  chapter: ChapterId;
  question: string;
  options: string[];
  answer: number;
  correctWhy: string;
  optionWhy: string[];
};

export type Chapter = {
  id: ChapterId;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  duration: string;
  source: string;
  color: string;
};

export const chapters: Chapter[] = [
  {
    id: 'intro-bones',
    number: '01',
    title: 'Introduction to Anatomy & the Bony Skeleton',
    shortTitle: 'Intro bones',
    subtitle: 'The framework that supports, protects, and moves you.',
    description: 'Build a clear map of anatomical language, the 206-bone skeleton, and how bones grow.',
    duration: '18 min',
    source: 'Intro  bones.pdf · Skeletal System - correctedCopy.ppt',
    color: 'mint',
  },
  {
    id: 'joints',
    number: '02',
    title: 'Joints & Their Mechanics',
    shortTitle: 'Joints',
    subtitle: 'How bones meet, connect, and move.',
    description: 'Compare fibrous, cartilaginous, and synovial joints by tissue, movement, and location.',
    duration: '14 min',
    source: 'joints, Dalia.pptx',
    color: 'violet',
  },
  {
    id: 'face-anatomy',
    number: '03',
    title: 'General Anatomy: The Muscles of the Face',
    shortTitle: 'Face & scalp',
    subtitle: 'Expression, sensation, blood supply, and the layers of the scalp.',
    description: 'Follow the muscles of expression and the nerves, vessels, and layers around them.',
    duration: '20 min',
    source: 'General anatomy The muscles of the face.pdf · Anatomy of the face.pptx',
    color: 'coral',
  },
  {
    id: 'norma-cns',
    number: '04',
    title: 'Norma Frontalis & the Nervous System',
    shortTitle: 'Skull & CNS',
    subtitle: 'Read the face from the front, then trace the pathway into the brain.',
    description: 'Locate facial bones and foramina, then review the CNS, meninges, and spinal cord.',
    duration: '22 min',
    source: 'General anatomy The muscles of the face.pdf',
    color: 'blue',
  },
];

export const boneCatalog = [
  { name: 'Frontal bone', region: 'Skull', variant: 'flat', note: 'Forms the forehead and roof of the orbits.' },
  { name: 'Parietal bones', region: 'Skull', variant: 'flat', note: 'Paired bones forming much of the cranial vault.' },
  { name: 'Temporal bones', region: 'Skull', variant: 'irregular', note: 'Paired bones at the sides of the skull; house parts of the ear.' },
  { name: 'Occipital bone', region: 'Skull', variant: 'flat', note: 'Forms the back and base of the cranium.' },
  { name: 'Sphenoid bone', region: 'Skull', variant: 'irregular', note: 'A central cranial bone that helps form the skull base and orbit.' },
  { name: 'Ethmoid bone', region: 'Skull', variant: 'irregular', note: 'Contributes to the medial orbit and nasal cavity.' },
  { name: 'Nasal bones', region: 'Skull', variant: 'small', note: 'Paired bones at the bridge of the nose.' },
  { name: 'Zygomatic bones', region: 'Skull', variant: 'flat', note: 'Paired cheekbones; meet the temporal bones at the arches.' },
  { name: 'Maxillae', region: 'Skull', variant: 'irregular', note: 'Paired upper-jaw bones that hold the upper teeth.' },
  { name: 'Mandible', region: 'Skull', variant: 'irregular', note: 'The movable lower jaw; it is not joined by a cranial suture.' },
  { name: 'Cervical vertebrae', region: 'Axial', variant: 'vertebra', note: 'Seven vertebrae in the neck.' },
  { name: 'Thoracic vertebrae', region: 'Axial', variant: 'vertebra', note: 'Twelve vertebrae that articulate with the ribs.' },
  { name: 'Lumbar vertebrae', region: 'Axial', variant: 'vertebra', note: 'Five large vertebrae in the lower back.' },
  { name: 'Ribs', region: 'Axial', variant: 'rib', note: 'Twelve pairs form the thoracic cage with the sternum.' },
  { name: 'Sternum', region: 'Axial', variant: 'flat', note: 'Midline bone of the anterior thoracic cage.' },
  { name: 'Clavicle', region: 'Upper limb', variant: 'curve', note: 'The anterior strut of the shoulder girdle.' },
  { name: 'Scapula', region: 'Upper limb', variant: 'flat', note: 'The posterior shoulder-girdle bone.' },
  { name: 'Humerus', region: 'Upper limb', variant: 'long', note: 'The single bone of the arm, between shoulder and elbow.' },
  { name: 'Radius', region: 'Upper limb', variant: 'long', note: 'Lateral forearm bone in anatomical position.' },
  { name: 'Ulna', region: 'Upper limb', variant: 'long', note: 'Medial forearm bone in anatomical position.' },
  { name: 'Carpals', region: 'Upper limb', variant: 'cluster', note: 'Eight short bones make up the wrist.' },
  { name: 'Metacarpals', region: 'Upper limb', variant: 'long', note: 'Five bones form the palm.' },
  { name: 'Phalanges of the hand', region: 'Upper limb', variant: 'cluster', note: 'Fourteen bones in each hand; two in the thumb and three in each finger.' },
  { name: 'Hip bone', region: 'Lower limb', variant: 'pelvis', note: 'Each hip bone forms from the ilium, ischium, and pubis.' },
  { name: 'Femur', region: 'Lower limb', variant: 'long', note: 'The thigh bone; its lower end is the growing end.' },
  { name: 'Patella', region: 'Lower limb', variant: 'small', note: 'A sesamoid bone embedded in the quadriceps tendon.' },
  { name: 'Tibia', region: 'Lower limb', variant: 'long', note: 'The medial, weight-bearing bone of the leg.' },
  { name: 'Fibula', region: 'Lower limb', variant: 'long', note: 'The slender lateral bone of the leg.' },
  { name: 'Tarsals', region: 'Lower limb', variant: 'cluster', note: 'Seven bones form the proximal part of the foot.' },
  { name: 'Metatarsals', region: 'Lower limb', variant: 'long', note: 'Five bones form the middle of the foot.' },
  { name: 'Phalanges of the foot', region: 'Lower limb', variant: 'cluster', note: 'Fourteen bones form the toes.' },
];

export const jointRows = [
  {
    type: 'Fibrous',
    tissue: 'Dense fibrous connective tissue',
    movement: 'Usually little or no movement',
    subtype: 'Suture',
    place: 'Between most skull bones',
    example: 'Coronal suture',
    mobility: 'Low',
  },
  {
    type: 'Fibrous',
    tissue: 'Dense fibrous connective tissue',
    movement: 'Very limited movement',
    subtype: 'Syndesmosis',
    place: 'Between long bones',
    example: 'Inferior tibiofibular joint',
    mobility: 'Low',
  },
  {
    type: 'Fibrous',
    tissue: 'Periodontal ligament',
    movement: 'Slight give',
    subtype: 'Gomphosis',
    place: 'Tooth root in alveolar socket',
    example: 'Tooth in maxilla or mandible',
    mobility: 'Low',
  },
  {
    type: 'Cartilaginous',
    tissue: 'Hyaline cartilage',
    movement: 'Usually immobile; often temporary',
    subtype: 'Primary · synchondrosis',
    place: 'Between epiphysis and diaphysis while growing',
    example: 'Epiphyseal plate',
    mobility: 'Low',
  },
  {
    type: 'Cartilaginous',
    tissue: 'Fibrocartilage',
    movement: 'Slight movement; persists',
    subtype: 'Secondary · symphysis',
    place: 'Between vertebral bodies; midline pelvis',
    example: 'Intervertebral disc; pubic symphysis',
    mobility: 'Limited',
  },
  {
    type: 'Synovial',
    tissue: 'Joint cavity containing synovial fluid',
    movement: 'Freely movable',
    subtype: 'Plane · non-axial',
    place: 'Between short bones',
    example: 'Intercarpal and intertarsal joints',
    mobility: 'Free',
  },
  {
    type: 'Synovial',
    tissue: 'Joint cavity containing synovial fluid',
    movement: 'One axis',
    subtype: 'Hinge · uniaxial',
    place: 'Between humerus and ulna',
    example: 'Elbow joint',
    mobility: 'Free',
  },
  {
    type: 'Synovial',
    tissue: 'Joint cavity containing synovial fluid',
    movement: 'Two axes',
    subtype: 'Ellipsoid · biaxial',
    place: 'Between forearm and carpal bones',
    example: 'Wrist joint',
    mobility: 'Free',
  },
  {
    type: 'Synovial',
    tissue: 'Joint cavity containing synovial fluid',
    movement: 'Multiple axes',
    subtype: 'Ball-and-socket · polyaxial',
    place: 'Shoulder and hip',
    example: 'Glenohumeral; hip joint',
    mobility: 'Free',
  },
];

export const questions: Question[] = [
  {
    id: 1, chapter: 'intro-bones',
    question: 'How many tarsal bones are present in the human foot?',
    options: ['8', '6', '7', '5'], answer: 2,
    correctWhy: 'The foot has 7 tarsals: talus, calcaneus, navicular, cuboid, and three cuneiforms.',
    optionWhy: [
      'Eight is the number of carpal bones in the wrist.',
      'Six is not the standard count for the tarsal group.',
      'Seven is correct: talus, calcaneus, navicular, cuboid, and three cuneiforms.',
      'Five is the number of metatarsals in one foot.',
    ],
  },
  {
    id: 2, chapter: 'intro-bones',
    question: 'The shoulder (pectoral) girdle is formed by which of the following bone combinations?',
    options: ['Clavicle & humerus', 'Scapula & clavicle', 'Sternum & clavicle', 'Scapula & humerus'], answer: 1,
    correctWhy: 'The pectoral girdle consists of the clavicle anteriorly and the scapula posteriorly.',
    optionWhy: [
      'The humerus is the arm bone; it articulates with the girdle but is not part of it.',
      'The clavicle and scapula together form the pectoral girdle.',
      'The sternum is axial skeleton; it meets the clavicle but is not part of the pectoral girdle.',
      'The humerus is the free bone of the arm, not a girdle bone.',
    ],
  },
  {
    id: 3, chapter: 'intro-bones',
    question: 'Moving an upper limb away from the median anatomical plane of the body is called:',
    options: ['Flexion', 'Adduction', 'Extension', 'Abduction'], answer: 3,
    correctWhy: 'Abduction moves a body part away from the midline, usually in the coronal plane.',
    optionWhy: [
      'Flexion decreases the angle at a joint; it is not the name for moving away from midline.',
      'Adduction moves a body part toward the midline.',
      'Extension increases a joint angle.',
      'Abduction is movement away from the median plane.',
    ],
  },
  {
    id: 4, chapter: 'intro-bones',
    question: 'Which bone represents the lateral bone of the anatomical leg?',
    options: ['Femur', 'Fibula', 'Tibia', 'Radius'], answer: 1,
    correctWhy: 'The fibula is the slender lateral bone of the leg; the tibia is medial.',
    optionWhy: [
      'The femur is in the thigh, not the leg.',
      'The fibula is the lateral bone of the leg.',
      'The tibia is the medial, weight-bearing bone of the leg.',
      'The radius is the lateral bone of the forearm.',
    ],
  },
  {
    id: 5, chapter: 'intro-bones',
    question: 'Which region represents the active growing end of a human long bone?',
    options: ['Epiphysis', 'Metaphysis', 'Diaphysis', 'Symphysis'], answer: 0,
    correctWhy: 'Longitudinal growth occurs at an epiphyseal plate near the growing end of the bone.',
    optionWhy: [
      'The epiphysis is at the end of a long bone; its growth plate is the site of lengthwise growth.',
      'The metaphysis is the transition region next to the growth plate, not the named end.',
      'The diaphysis is the shaft.',
      'A symphysis is a type of cartilaginous joint, not a bone region.',
    ],
  },
  {
    id: 6, chapter: 'intro-bones',
    question: 'The total number of lumbar vertebrae in the human vertebral column is:',
    options: ['7', '5', '12', '4'], answer: 1,
    correctWhy: 'The typical vertebral column has 5 lumbar vertebrae.',
    optionWhy: [
      'Seven is the usual number of cervical vertebrae.',
      'Five is the usual number of lumbar vertebrae.',
      'Twelve is the usual number of thoracic vertebrae.',
      'Four is the usual number of coccygeal segments, usually fused in adults.',
    ],
  },
  {
    id: 7, chapter: 'face-anatomy',
    question: 'A patient presents with left-sided facial paralysis. Their mouth angle deviates to the right side upon smiling. Which nerve is injured?',
    options: ['Left trigeminal nerve', 'Left facial nerve', 'Right facial nerve', 'Left glossopharyngeal nerve'], answer: 1,
    correctWhy: 'A left facial nerve lesion weakens left facial-expression muscles; the unopposed right side pulls the mouth toward the right.',
    optionWhy: [
      'The trigeminal nerve carries most facial sensation and supplies muscles of mastication.',
      'The left facial nerve supplies the muscles of facial expression on the left.',
      'A right facial nerve lesion would weaken the right side.',
      'The glossopharyngeal nerve does not supply the muscles of facial expression.',
    ],
  },
  {
    id: 8, chapter: 'joints',
    question: 'What is the embryonic origin and anatomical classification of skull sutures?',
    options: ['Primary cartilaginous', 'Fibrous joint', 'Secondary cartilaginous', 'Synovial plane joint'], answer: 1,
    correctWhy: 'Sutures are fibrous joints: dense connective tissue binds adjacent skull bones.',
    optionWhy: [
      'A primary cartilaginous joint is joined by hyaline cartilage, as at a growth plate.',
      'Sutures are fibrous joints and are functionally usually immobile.',
      'A secondary cartilaginous joint contains fibrocartilage, as in a symphysis.',
      'A synovial plane joint has a joint cavity and gliding movement.',
    ],
  },
  {
    id: 9, chapter: 'norma-cns',
    question: 'Which landmark on Norma Frontalis marks the intersection between the frontal bone and the two nasal bones?',
    options: ['Glabella', 'Nasion', 'Mental protuberance', 'Bregma'], answer: 1,
    correctWhy: 'Nasion is the midline point where the frontonasal and internasal sutures meet.',
    optionWhy: [
      'The glabella is the smooth area between the superciliary arches, above the nasion.',
      'Nasion marks the frontonasal and internasal suture junction.',
      'The mental protuberance is the prominence of the chin on the mandible.',
      'Bregma is where the coronal and sagittal sutures meet on the skull vault.',
    ],
  },
  {
    id: 10, chapter: 'norma-cns',
    question: 'What space contains Cerebrospinal Fluid (CSF) around the brain?',
    options: ['Epidural space', 'Subdural space', 'Subarachnoid space', 'Ventricular foramen only'], answer: 2,
    correctWhy: 'CSF circulates in the subarachnoid space between the arachnoid mater and pia mater.',
    optionWhy: [
      'The cranial epidural space is normally a potential space outside the dura.',
      'The subdural space is a potential space between dura and arachnoid.',
      'The subarachnoid space lies between arachnoid and pia and contains CSF.',
      'CSF also circulates in the ventricles; it is not limited to a ventricular foramen.',
    ],
  },
  {
    id: 11, chapter: 'joints',
    question: 'Which synovial-joint layer secretes synovial fluid?',
    options: ['Articular cartilage', 'Synovial membrane', 'Fibrous capsule', 'Periosteum'], answer: 1,
    correctWhy: 'The synovial membrane lines the inner capsule and produces synovial fluid.',
    optionWhy: [
      'Articular cartilage covers the joint surfaces and reduces friction.',
      'The synovial membrane lines the capsule and secretes synovial fluid.',
      'The fibrous capsule surrounds and stabilizes the joint.',
      'Periosteum covers the outer surface of bone, except at articular surfaces.',
    ],
  },
  {
    id: 12, chapter: 'joints',
    question: 'Which example is a polyaxial synovial joint?',
    options: ['Intercarpal joint', 'Elbow joint', 'Wrist joint', 'Shoulder joint'], answer: 3,
    correctWhy: 'The shoulder is a ball-and-socket joint that moves across multiple axes.',
    optionWhy: [
      'Intercarpal joints are plane joints with gliding movement.',
      'The elbow is primarily a uniaxial hinge joint.',
      'The wrist is commonly classified as biaxial.',
      'The shoulder is polyaxial and permits movement in several planes.',
    ],
  },
  {
    id: 13, chapter: 'face-anatomy',
    question: 'What is a key action of the buccinator during chewing?',
    options: ['Closes the eyelids', 'Keeps food between the teeth', 'Raises the eyebrows', 'Puckers the lips'], answer: 1,
    correctWhy: 'The buccinator presses the cheek against the teeth and helps keep food in the oral cavity during mastication.',
    optionWhy: [
      'Orbicularis oculi closes the eyelids.',
      'The buccinator prevents food from collecting in the vestibule of the mouth.',
      'Frontalis raises the eyebrows.',
      'Orbicularis oris puckers and closes the lips.',
    ],
  },
  {
    id: 14, chapter: 'face-anatomy',
    question: 'Which cranial nerve provides motor supply to the muscles of facial expression?',
    options: ['CN V', 'CN VII', 'CN IX', 'CN XII'], answer: 1,
    correctWhy: 'The facial nerve (CN VII) supplies the muscles of facial expression.',
    optionWhy: [
      'CN V supplies most facial sensation and the muscles of mastication.',
      'CN VII supplies the muscles of facial expression.',
      'CN IX supplies muscles of the pharynx and carries taste from the posterior third of the tongue.',
      'CN XII supplies most intrinsic and extrinsic tongue muscles.',
    ],
  },
  {
    id: 15, chapter: 'face-anatomy',
    question: 'Which nerve division carries most general sensation from the cheek?',
    options: ['Ophthalmic (V1)', 'Maxillary (V2)', 'Mandibular (V3)', 'Facial (VII)'], answer: 1,
    correctWhy: 'The maxillary division (V2) supplies sensation from much of the midface, including the cheek.',
    optionWhy: [
      'V1 supplies the forehead, upper eyelid, and dorsum of the nose.',
      'V2 supplies much of the midface, including the cheek.',
      'V3 supplies much of the lower face and also carries motor fibers to mastication muscles.',
      'CN VII is primarily motor to facial-expression muscles; it does not supply most facial skin sensation.',
    ],
  },
  {
    id: 16, chapter: 'face-anatomy',
    question: 'Which layer of the scalp is called the dangerous area?',
    options: ['Skin', 'Dense connective tissue', 'Loose areolar tissue', 'Pericranium'], answer: 2,
    correctWhy: 'The loose areolar tissue layer contains emissary veins that can connect scalp veins with intracranial venous sinuses.',
    optionWhy: [
      'Skin is the outermost scalp layer.',
      'Dense connective tissue is the second layer and contains many vessels.',
      'Loose areolar tissue is the fourth layer and is called the dangerous area.',
      'Pericranium is the periosteum covering the skull bones.',
    ],
  },
  {
    id: 17, chapter: 'norma-cns',
    question: 'The supraorbital nerve is a branch of which division of the trigeminal nerve?',
    options: ['V1', 'V2', 'V3', 'CN VII'], answer: 0,
    correctWhy: 'The supraorbital nerve is a branch of the frontal nerve, which comes from V1 (ophthalmic division).',
    optionWhy: [
      'V1 is the ophthalmic division and gives rise to the supraorbital nerve.',
      'V2 is the maxillary division; its branch exits at the infraorbital foramen.',
      'V3 is the mandibular division; the mental nerve exits at the mental foramen.',
      'CN VII is the facial nerve, which supplies facial-expression muscles.',
    ],
  },
  {
    id: 18, chapter: 'norma-cns',
    question: 'Which brain structure helps coordinate voluntary movement and balance?',
    options: ['Thalamus', 'Cerebellum', 'Occipital lobe', 'Medulla oblongata'], answer: 1,
    correctWhy: 'The cerebellum coordinates movement and helps maintain balance and equilibrium.',
    optionWhy: [
      'The thalamus is a major relay for sensory information.',
      'The cerebellum coordinates movement and supports balance.',
      'The occipital lobe is chiefly associated with visual processing.',
      'The medulla contains important autonomic centers, including respiratory and cardiovascular centers.',
    ],
  },
  {
    id: 19, chapter: 'norma-cns',
    question: 'Which structures make up the central nervous system?',
    options: ['Brain and spinal cord', 'Cranial nerves only', 'Brain and all peripheral nerves', 'Spinal nerves only'], answer: 0,
    correctWhy: 'The CNS consists of the brain and spinal cord.',
    optionWhy: [
      'The brain and spinal cord together form the CNS.',
      'Cranial nerves are part of the peripheral nervous system.',
      'Peripheral nerves belong to the PNS, not the CNS.',
      'Spinal nerves are part of the PNS; the spinal cord is part of the CNS.',
    ],
  },
];
