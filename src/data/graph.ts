// graph.ts - Centro de Aulas UFG
export interface Node {
    x: number;
    y: number;
    label?: string;
    floor: string;
}

export interface Floor {
    id: string;
    name: string;
    nodes: Record<string, Node>;
    edges: [string, string][];
}

// ============== TÉRREO ==============
const terreoNodes: Record<string, Node> = {
    entrada: { x: 0.20, y: 0.35, label: "Entrada Principal", floor: "terreo" },
    hall_principal: { x: 0.20, y: 0.45, label: "Hall Principal", floor: "terreo" },
    cantina: { x: 0.20, y: 0.60, label: "Cantina", floor: "terreo" },
    mini_auditorio: { x: 0.20, y: 0.75, label: "Mini Auditório", floor: "terreo" },
    lab_transportes: { x: 0.25, y: 0.75, label: "Lab. Ensaios em Transportes", floor: "terreo" },
    secretaria: { x: 0.35, y: 0.45, label: "Secretaria", floor: "terreo" },
    coord_adm: { x: 0.40, y: 0.45, label: "Coordenação Administrativa", floor: "terreo" },
    espaco_multiuso: { x: 0.35, y: 0.30, label: "Espaço Multiuso", floor: "terreo" },
    sala_estudos_ind: { x: 0.45, y: 0.50, label: "Sala de Estudos Individual", floor: "terreo" },
    biblioteca: { x: 0.55, y: 0.45, label: "Biblioteca", floor: "terreo" },
    centro_academico1: { x: 0.80, y: 0.40, label: "Centro Acadêmico 1", floor: "terreo" },
    centro_academico2: { x: 0.87, y: 0.45, label: "Centro Acadêmico 2", floor: "terreo" },

    corredor_central: { x: 0.50, y: 0.85, floor: "terreo" },

    // estudos_grupo: { x: 0.35, y: 0.20, label: "Estudos em Grupo", floor: "terreo" },

    elevador1: { x: 0.15, y: 0.50, label: "Elevador 1", floor: "terreo" },
    elevador2: { x: 0.15, y: 0.52, label: "Elevador 2", floor: "terreo" },
};

const terreoEdges: [string, string][] = [
    ["entrada", "hall_principal"],
    ["hall_principal", "elevador1"],
    ["hall_principal", "elevador2"],
    ["hall_principal", "cantina"],
    ["hall_principal", "mini_auditorio"],
    ["hall_principal", "lab_transportes"],
    ["hall_principal", "secretaria"],
    ["hall_principal", "coord_adm"],
    ["hall_principal", "biblioteca"],
    ["biblioteca", "sala_estudos_ind"],
    ["biblioteca", "centro_academico1"],
    ["secretaria", "espaco_multiuso"],
    ["centro_academico1", "centro_academico2"],
];

// ============== 1º ANDAR ==============
const andar1Nodes: Record<string, Node> = {
    escada: { x: 0.08, y: 0.85, label: "Escada", floor: "andar1" },
    hall: { x: 0.25, y: 0.85, label: "Hall", floor: "andar1" },
    corredor_central: { x: 0.50, y: 0.85, floor: "andar1" },
    elevador1: { x: 0.75, y: 0.85, label: "Elevador 1", floor: "andar1" },
    elevador2: { x: 0.82, y: 0.85, label: "Elevador 2", floor: "andar1" },

    mini_auditorio_02: { x: 0.25, y: 0.60, label: "Mini Auditório 02", floor: "andar1" },
    sala_aula_01: { x: 0.50, y: 0.20, label: "Sala de Aula 01", floor: "andar1" },

    lab_informatica_01: { x: 0.85, y: 0.20, label: "Lab. Informática 01", floor: "andar1" },
    lab_desenho: { x: 0.85, y: 0.45, label: "Lab. Desenho", floor: "andar1" },
    lab_sintese_materiais: { x: 0.15, y: 0.35, label: "Lab. Síntese de Materiais", floor: "andar1" },
    lab_geoquimica: { x: 0.35, y: 0.35, label: "Lab. Geoquímica", floor: "andar1" },
    lab_caracterizacao: { x: 0.65, y: 0.35, label: "Lab. Caracterização", floor: "andar1" },

    detec: { x: 0.85, y: 0.65, label: "DETEC", floor: "andar1" },
    coord_pos: { x: 0.92, y: 0.55, label: "Coordenação Pós", floor: "andar1" },
    secretaria_pos: { x: 0.92, y: 0.70, label: "Secretaria Pós", floor: "andar1" },
};

const andar1Edges: [string, string][] = [
    ["escada", "hall"],
    ["hall", "corredor_central"],
    ["corredor_central", "elevador1"],
    ["elevador1", "elevador2"],
    ["hall", "mini_auditorio_02"],
    ["corredor_central", "sala_aula_01"],
    ["corredor_central", "lab_informatica_01"],
    ["corredor_central", "lab_desenho"],
    ["corredor_central", "lab_sintese_materiais"],
    ["lab_sintese_materiais", "lab_geoquimica"],
    ["lab_geoquimica", "lab_caracterizacao"],
    ["corredor_central", "detec"],
    ["detec", "coord_pos"],
    ["coord_pos", "secretaria_pos"],
];

// ============== 2º ANDAR ==============
const andar2Nodes: Record<string, Node> = {
    escada: { x: 0.08, y: 0.85, label: "Escada", floor: "andar2" },
    hall: { x: 0.25, y: 0.85, label: "Hall", floor: "andar2" },
    corredor_central: { x: 0.50, y: 0.85, floor: "andar2" },
    elevador1: { x: 0.75, y: 0.85, label: "Elevador 1", floor: "andar2" },
    elevador2: { x: 0.82, y: 0.85, label: "Elevador 2", floor: "andar2" },

    mini_auditorio_03: { x: 0.25, y: 0.60, label: "Mini Auditório 03", floor: "andar2" },
    sala_aula_02: { x: 0.50, y: 0.45, label: "Sala de Aula 02", floor: "andar2" },

    lab_geologia: { x: 0.25, y: 0.25, label: "Lab. Geologia", floor: "andar2" },
    lab_metrologia: { x: 0.50, y: 0.25, label: "Lab. Metrologia", floor: "andar2" },
    lab_projetos_transp: { x: 0.15, y: 0.50, label: "Lab. Projetos em Transportes", floor: "andar2" },
    lab_desenv_transp: { x: 0.85, y: 0.25, label: "Lab. Desenvolvimento em Transportes", floor: "andar2" },
    lab_inteligencia_transp: { x: 0.85, y: 0.45, label: "Lab. Inteligência em Transportes", floor: "andar2" },

    sala_reunioes: { x: 0.92, y: 0.55, label: "Sala de Reuniões", floor: "andar2" },
    sala_prof_01: { x: 0.92, y: 0.65, label: "Sala Professores 01", floor: "andar2" },
    sala_prof_02: { x: 0.92, y: 0.72, label: "Sala Professores 02", floor: "andar2" },
};

const andar2Edges: [string, string][] = [
    ["escada", "hall"],
    ["hall", "corredor_central"],
    ["corredor_central", "elevador1"],
    ["elevador1", "elevador2"],
    ["hall", "mini_auditorio_03"],
    ["corredor_central", "sala_aula_02"],
    ["corredor_central", "lab_geologia"],
    ["corredor_central", "lab_metrologia"],
    ["corredor_central", "lab_projetos_transp"],
    ["corredor_central", "lab_desenv_transp"],
    ["corredor_central", "lab_inteligencia_transp"],
    ["corredor_central", "sala_reunioes"],
    ["sala_reunioes", "sala_prof_01"],
    ["sala_prof_01", "sala_prof_02"],
];

// ============== 3º ANDAR ==============
const andar3Nodes: Record<string, Node> = {
    escada: { x: 0.08, y: 0.85, label: "Escada", floor: "andar3" },
    hall: { x: 0.25, y: 0.85, label: "Hall", floor: "andar3" },
    corredor_central: { x: 0.50, y: 0.85, floor: "andar3" },
    elevador1: { x: 0.75, y: 0.85, label: "Elevador 1", floor: "andar3" },
    elevador2: { x: 0.82, y: 0.85, label: "Elevador 2", floor: "andar3" },

    mini_auditorio_04: { x: 0.25, y: 0.60, label: "Mini Auditório 04", floor: "andar3" },
    sala_aula_03: { x: 0.50, y: 0.45, label: "Sala de Aula 03", floor: "andar3" },

    sala_microscopia: { x: 0.25, y: 0.25, label: "Sala de Microscopia", floor: "andar3" },
    lab_microscopia_apl: { x: 0.60, y: 0.25, label: "Lab. Microscopia Aplicada", floor: "andar3" },
    lab_paleontologia: { x: 0.15, y: 0.45, label: "Lab. Paleontologia", floor: "andar3" },
    lab_info_02: { x: 0.85, y: 0.25, label: "Lab. Informática 02", floor: "andar3" },
    lab_info_03: { x: 0.85, y: 0.45, label: "Lab. Informática 03", floor: "andar3" },

    sala_apoio: { x: 0.92, y: 0.60, label: "Sala de Apoio", floor: "andar3" },
};

const andar3Edges: [string, string][] = [
    ["escada", "hall"],
    ["hall", "corredor_central"],
    ["corredor_central", "elevador1"],
    ["elevador1", "elevador2"],
    ["hall", "mini_auditorio_04"],
    ["corredor_central", "sala_aula_03"],
    ["corredor_central", "sala_microscopia"],
    ["corredor_central", "lab_microscopia_apl"],
    ["corredor_central", "lab_paleontologia"],
    ["corredor_central", "lab_info_02"],
    ["corredor_central", "lab_info_03"],
    ["corredor_central", "sala_apoio"],
];

// ============== 4º ANDAR ==============
const andar4Nodes: Record<string, Node> = {
    escada: { x: 0.08, y: 0.85, label: "Escada", floor: "andar4" },
    hall: { x: 0.25, y: 0.85, label: "Hall", floor: "andar4" },
    corredor_central: { x: 0.50, y: 0.85, floor: "andar4" },
    corredor_salas: { x: 0.75, y: 0.50, floor: "andar4" },
    elevador1: { x: 0.75, y: 0.85, label: "Elevador 1", floor: "andar4" },
    elevador2: { x: 0.82, y: 0.85, label: "Elevador 2", floor: "andar4" },

    mini_auditorio_05: { x: 0.25, y: 0.60, label: "Mini Auditório 05", floor: "andar4" },
    lab_info_grande: { x: 0.25, y: 0.25, label: "Lab. Informática Grande", floor: "andar4" },
    lab_info_04: { x: 0.85, y: 0.25, label: "Lab. Informática 04", floor: "andar4" },
    lab_info_05: { x: 0.85, y: 0.45, label: "Lab. Informática 05", floor: "andar4" },

    copa: { x: 0.50, y: 0.35, label: "Copa", floor: "andar4" },
    sala_reunioes: { x: 0.92, y: 0.55, label: "Sala de Reuniões", floor: "andar4" },
    sala_professores: { x: 0.92, y: 0.65, label: "Sala de Professores", floor: "andar4" },

    sala_pesq_01: { x: 0.65, y: 0.20, label: "Sala Pesquisa 01", floor: "andar4" },
    sala_pesq_05: { x: 0.75, y: 0.20, label: "Sala Pesquisa 05", floor: "andar4" },
    sala_pesq_10: { x: 0.65, y: 0.35, label: "Sala Pesquisa 10", floor: "andar4" },
    sala_pesq_15: { x: 0.75, y: 0.35, label: "Sala Pesquisa 15", floor: "andar4" },
    sala_pesq_20: { x: 0.65, y: 0.50, label: "Sala Pesquisa 20", floor: "andar4" },
    sala_pesq_25: { x: 0.75, y: 0.50, label: "Sala Pesquisa 25", floor: "andar4" },
};

const andar4Edges: [string, string][] = [
    ["escada", "hall"],
    ["hall", "corredor_central"],
    ["corredor_central", "elevador1"],
    ["elevador1", "elevador2"],
    ["hall", "mini_auditorio_05"],
    ["corredor_central", "lab_info_grande"],
    ["corredor_central", "lab_info_04"],
    ["corredor_central", "lab_info_05"],
    ["corredor_central", "copa"],
    ["corredor_central", "sala_reunioes"],
    ["sala_reunioes", "sala_professores"],
    ["corredor_central", "corredor_salas"],
    ["corredor_salas", "sala_pesq_01"],
    ["corredor_salas", "sala_pesq_05"],
    ["corredor_salas", "sala_pesq_10"],
    ["corredor_salas", "sala_pesq_15"],
    ["corredor_salas", "sala_pesq_20"],
    ["corredor_salas", "sala_pesq_25"],
];

// ============== 5º ANDAR ==============
const andar5Nodes: Record<string, Node> = {
    escada: { x: 0.08, y: 0.85, label: "Escada", floor: "andar5" },
    hall: { x: 0.25, y: 0.85, label: "Hall", floor: "andar5" },
    corredor_central: { x: 0.50, y: 0.85, floor: "andar5" },
    elevador1: { x: 0.75, y: 0.85, label: "Elevador 1", floor: "andar5" },
    elevador2: { x: 0.82, y: 0.85, label: "Elevador 2", floor: "andar5" },

    mini_auditorio_06: { x: 0.25, y: 0.60, label: "Mini Auditório 06", floor: "andar5" },
    sala_aula_grande: { x: 0.50, y: 0.45, label: "Sala de Aula Grande", floor: "andar5" },
    sala_aula_1: { x: 0.15, y: 0.25, label: "Sala de Aula 1", floor: "andar5" },
    sala_aula_2: { x: 0.35, y: 0.25, label: "Sala de Aula 2", floor: "andar5" },
    sala_aula_3: { x: 0.60, y: 0.25, label: "Sala de Aula 3", floor: "andar5" },
    sala_aula_4: { x: 0.75, y: 0.25, label: "Sala de Aula 4", floor: "andar5" },

    lab_info_06: { x: 0.25, y: 0.35, label: "Lab. Informática 06", floor: "andar5" },
    sala_direcao: { x: 0.92, y: 0.55, label: "Sala da Direção", floor: "andar5" },
    sala_vice_direcao: { x: 0.92, y: 0.65, label: "Sala Vice-Direção", floor: "andar5" },
    ascom: { x: 0.92, y: 0.72, label: "ASCOM FCT", floor: "andar5" },
    sala_video: { x: 0.85, y: 0.45, label: "Sala Reunião/Vídeo", floor: "andar5" },
};

const andar5Edges: [string, string][] = [
    ["escada", "hall"],
    ["hall", "corredor_central"],
    ["corredor_central", "elevador1"],
    ["elevador1", "elevador2"],
    ["hall", "mini_auditorio_06"],
    ["corredor_central", "sala_aula_grande"],
    ["corredor_central", "sala_aula_1"],
    ["corredor_central", "sala_aula_2"],
    ["corredor_central", "sala_aula_3"],
    ["corredor_central", "sala_aula_4"],
    ["corredor_central", "lab_info_06"],
    ["corredor_central", "sala_direcao"],
    ["sala_direcao", "sala_vice_direcao"],
    ["sala_vice_direcao", "ascom"],
    ["corredor_central", "sala_video"],
];

// ============== EXPORT ==============
export const floors: Floor[] = [
    {
        id: "terreo",
        name: "Térreo",
        nodes: terreoNodes,
        edges: terreoEdges,
    },
    {
        id: "andar1",
        name: "1º Andar",
        nodes: andar1Nodes,
        edges: andar1Edges,
    },
    {
        id: "andar2",
        name: "2º Andar",
        nodes: andar2Nodes,
        edges: andar2Edges,
    },
    {
        id: "andar3",
        name: "3º Andar",
        nodes: andar3Nodes,
        edges: andar3Edges,
    },
    {
        id: "andar4",
        name: "4º Andar",
        nodes: andar4Nodes,
        edges: andar4Edges,
    },
    {
        id: "andar5",
        name: "5º Andar",
        nodes: andar5Nodes,
        edges: andar5Edges,
    },
];

export function getDestinations(floorId: string): { id: string; name: string }[] {
    const floor = floors.find(f => f.id === floorId);
    if (!floor) return [];

    return Object.entries(floor.nodes)
        .filter(([_, node]) => node.label)
        .map(([id, node]) => ({ id, name: node.label! }));
}
