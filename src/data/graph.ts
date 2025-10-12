export interface Node {
    x: number;
    y: number;
}

export const nodes: Record<string, Node> = {
    entrada: { x: 80, y: 420 },
    corredor1: { x: 250, y: 420 },
    salaA: { x: 400, y: 200 },
    salaB: { x: 400, y: 600 },
};

export const edges: [string, string][] = [
    ["entrada", "corredor1"],
    ["corredor1", "salaA"],
    ["corredor1", "salaB"],
];

export const destinations = ["salaA", "salaB"];
