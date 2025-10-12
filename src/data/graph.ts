export interface Node {
    x: number; // 0..1 relative
    y: number; // 0..1 relative
}

export const nodes: Record<string, Node> = {
    entrada: { x: 0.12, y: 0.78 },
    recepcao: { x: 0.36, y: 0.78 },
    corredor1: { x: 0.5, y: 0.6 },
    salaA: { x: 0.25, y: 0.25 },
    salaB: { x: 0.5, y: 0.25 },
    salaC: { x: 0.78, y: 0.25 },
    salaD: { x: 0.18, y: 0.5 },
    salaE: { x: 0.56, y: 0.5 },
    escada: { x: 0.78, y: 0.7 },
};

export const edges: [string, string][] = [
    ["entrada", "recepcao"],
    ["recepcao", "corredor1"],
    ["corredor1", "salaA"],
    ["corredor1", "salaB"],
    ["corredor1", "salaC"],
    ["corredor1", "salaD"],
    ["corredor1", "salaE"],
    ["corredor1", "escada"],
];

export const floors = ["1st", "2nd", "3rd", "4th", "5th"];
export const destinations = ["salaA", "salaB", "salaC", "salaD", "salaE", "escada"];
