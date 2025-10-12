export interface Node {
    x: number; // 0..1 relative
    y: number; // 0..1 relative
}

export const nodes: Record<string, Node> = {
    entrada: { x: -0.1, y: 0.65 },
    guarita: { x: -0.03, y: 0.65 },
    recepcao: { x: 0.10, y: 0.65 },
    coordenacao: { x: 0.48, y: 0.65 },
    corredor1: { x: 0.83, y: 0.65 },
    corredor2: { x: 0.83, y: 0.40 },
    salaA: { x: 0.25, y: 0.40 },
    salaB: { x: 0.5, y: 0.40 },
    salaC: { x: 0.78, y: 0.40 },
    salaD: { x: 0.25, y: 0.65 },
    salaE: { x: 0.73, y: 0.65 },
};

export const edges: [string, string][] = [
    ["entrada", "guarita"],
    ["entrada", "recepcao"],
    ["entrada", "coordenacao"],
    ["entrada", "salaD"],
    ["entrada", "salaE"],
    ["entrada", "corredor1"],
    ["corredor1", "corredor2"],
    ["corredor2", "salaA"],
    ["corredor2", "salaB"],
    ["corredor2", "salaC"],
];

export const floors = ["1st", "2nd", "3rd", "4th", "5th"];
export const destinations = ["salaA", "salaB", "salaC", "salaD", "salaE", "coordenacao", "recepcao", "guarita"];
