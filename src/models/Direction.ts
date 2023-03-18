export class Directions {
    static N : Direction =  {x: 0, y: -1};
    static NE : Direction = {x: 1, y: -1};
    static E : Direction =  {x: 1, y: 0};
    static SE : Direction = {x: 1, y: 1};
    static S : Direction =  {x: 0, y: 1};
    static SW : Direction = {x: -1, y: 1};
    static W : Direction =  {x: -1, y: 0};
    static NW : Direction = {x: -1, y: -1};

    static AllDirections = [this.N, this.NE, this.E, this.SE, this.S, this.SW, this.W, this.NW];
    static HalfDirections = [this.N, this.NE, this.E, this.SE];

    public static areEqual(a : Direction, b : Direction) {
        return a.x == b.x && a.y == b.y;
    }
}

export interface Direction {
    x: number;
    y: number;
}