export interface AStarResult<T> {
    path: T[];
    closed: Set<T>;
    open: Set<T>;
    from: Map<T, T>;
    gScore: Map<T, number>;
    fScore: Map<T, number>;
}

export function astar<T>(
    starts: T[],
    isGoal: (node: T) => boolean,
    getCost: (node1: T, node2: T) => number,
    getH: (node: T) => number,
    getNeighbors: (node: T) => T[]
): AStarResult<T> {
    const closed = new Set<T>();
    const open = new Set<T>(starts);
    const from = new Map<T, T>();

    const gScore = new Map(starts.map(node => [node, 0]));
    const fScore = new Map(starts.map(node => [node, getH(node)]));

    let path: T[] = [];

    while (open.size > 0) {
        const current = minBy(open, node => fScore.get(node)!)!;
        open.delete(current);
        closed.add(current);

        if (isGoal(current)) {
            let next: T | undefined = current;
            while (next) {
                path.push(next);
                next = from.get(next);
            }
            path.reverse();
            break;
        }

        const currentG = gScore.get(current)!;

        for (const neighbor of getNeighbors(current).filter(n => !closed.has(n))) {
            const neighborG = currentG + getCost(current, neighbor);
            if (!open.has(neighbor) || neighborG < gScore.get(neighbor)!) {
                gScore.set(neighbor, neighborG);
                fScore.set(neighbor, neighborG + getH(neighbor));
                from.set(neighbor, current);
                open.add(neighbor);
            }
        }
    }

    return { path, closed, open, from, gScore, fScore };
}

export function hashingAstar<T>(
    getHash: (node: T) => string,
    starts: T[],
    isGoal: (node: T) => boolean,
    getCost: (node1: T, node2: T) => number,
    getH: (node: T) => number,
    getNeighbors: (node: T) => T[]
): AStarResult<T> {
    const reverseMap = new Map<string, T>();
    function innerGetHash(node: T): string {
        const hash = getHash(node);
        reverseMap.set(hash, node);
        return hash;
    }
    function reverseHash(hash: string): T {
        return reverseMap.get(hash)!;
    }

    const result = astar(
        starts.map(innerGetHash),
        node => isGoal(reverseHash(node)),
        (node1, node2) => getCost(reverseHash(node1), reverseHash(node2)),
        node => getH(reverseHash(node)),
        node => getNeighbors(reverseHash(node)).map(innerGetHash)
    );

    return {
        path: result.path.map(reverseHash),
        closed: new Set([...result.closed].map(reverseHash)),
        open: new Set([...result.open].map(reverseHash)),
        from: new Map([...result.from].map(([node1, node2]) => [reverseHash(node1), reverseHash(node2)])),
        gScore: new Map([...result.gScore].map(([node, g]) => [reverseHash(node), g])),
        fScore: new Map([...result.fScore].map(([node, g]) => [reverseHash(node), g]))
    };
}

function minBy<T>(iterable: Iterable<T>, cb: (item: T) => number): T | undefined {
    let min: T | undefined;
    let minValue: number | undefined;

    for (const item of iterable) {
        const value = cb(item);
        if (minValue === undefined || value < minValue) {
            min = item;
            minValue = value;
        }
    }

    return min;
}
