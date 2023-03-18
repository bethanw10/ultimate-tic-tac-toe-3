export enum Direction {
    N = "North",
    NE = "NorthEast",
    E = "East",
    SE = "SouthEast",
    S = "South",
    SW = "SouthWest",
    W = "West",
    NW = "NorthWest"
}

export interface Delta {
    x: number;
    y: number;
}

export class Directions {
    static All: { [id in Direction]: Delta } = {
        [Direction.N]: { x: 0, y: -1 },
        [Direction.NE]: { x: 1, y: -1 },
        [Direction.E]: { x: 1, y: 0 },
        [Direction.SE]: { x: 1, y: 1 },
        [Direction.S]: { x: 0, y: 1 },
        [Direction.SW]: { x: -1, y: 1 },
        [Direction.W]: { x: -1, y: 0 },
        [Direction.NW]: { x: -1, y: -1 }
    }

    // Only one for each 'unique' direction - e.g. horizontal, vertical and each diagonal
    static Half: { [key in Direction]?: Delta } = Object.fromEntries(
        [
            Direction.N,
            Direction.NE,
            Direction.E,
            Direction.SE
        ].map(k => [k, this.All[k]])
    )
}
