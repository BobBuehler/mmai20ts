import * as _ from "lodash";
import { Unit } from "./unit";
import { AI } from "./ai";
import { Player } from "./player";
import { Structure } from "./structure";
import { Tile } from "./tile";
import { astar } from "./astar";
import { Job } from "./job";

export async function moveAndRestAndConvert(unit: Unit, targets: Unit[]): Promise<void> {
    await moveAndRest(unit, AI.Jobs.missionary.actionCost);

    const convertTargets = targets.filter(t => canConvert(unit, t, false));
    await move(unit, tilePredicate(_.flatMap(convertTargets, t => t.tile!.getNeighbors())));

    await convert(unit, convertTargets);
}

export async function moveAndRestAndChangeJob(unit: Unit, job: Job): Promise<void> {
    await moveAndRest(unit, AI.Jobs.missionary.actionCost);

    const catTile = unit.owner!.cat.tile;
    await move(unit, tilePredicate(getSquareNeighbors(catTile)));

    if (canChangeJob(unit, job)) {
        await unit.changeJob(job.title as any);
    }
}

export async function moveToAndRest(unit: Unit, isGoal: (tile: Tile) => boolean): Promise<void> {
    await moveAndRest(unit, AI.Jobs.missionary.actionCost);
    await move(unit, isGoal);
}

export async function moveAndRest(unit: Unit, energyNeeded: number = 100): Promise<void> {
    if (unit.energy >= energyNeeded) {
        return;
    }

    const restTiles = _.flatMap(getStructures(unit.owner, "shelter"), s => getSquareNeighbors(s.tile));
    await move(unit, tilePredicate(restTiles));

    if (canRest(unit)) {
        await unit.rest();
    }
}

export async function move(unit: Unit, isGoal: (tile: Tile) => boolean): Promise<void> {
    if (unit.moves < 1 || !unit.tile) {
        return;
    }

    const path = getMoveablePath([unit.tile!], isGoal);
    for (let i = 1; i < path.length && unit.moves >= 1; ++i) {
        await unit.move(path[i]);
    }
}

export async function convert(unit: Unit, targets: Unit[]): Promise<void> {
    if (unit.job !== AI.Jobs.missionary || !canAct(unit)) {
        return;
    }

    for (const target of targets) {
        if (canConvert(unit, target)) {
            await unit.convert(target.tile!);
            return;
        }
    }
}

export function getMoveablePath(starts: Tile[], isGoal: (tile: Tile) => boolean): Tile[] {
    const search = astar(starts, isGoal, () => 1, () => 0, t => t.getNeighbors().filter(t => t.isPathable()));

    return search.path;
}

export function getNearestPair(units: Unit[], isGoal: (tile: Tile) => boolean): [Unit, Tile] | null {
    const path = getMoveablePath(units.map(u => u.tile!), isGoal);
    if (path.length == 0) {
        return null;
    }
    return [path[0].unit!, path[path.length - 1]];
}

export function getStructures(owner: Player | undefined, type: Structure["type"]): Structure[] {
    return AI.Game.structures.filter(s => s.owner === owner && s.type === type && s.tile != null);
}

export function getSquareNeighbors(tile: Tile | undefined): Tile[] {
    if (!tile) {
        return [];
    }

    const neighbors = [
        tile.tileNorth && tile.tileNorth.tileWest,
        tile.tileNorth,
        tile.tileNorth && tile.tileNorth.tileEast,
        tile.tileWest,
        tile.tileEast,
        tile.tileSouth && tile.tileSouth.tileWest,
        tile.tileSouth,
        tile.tileSouth && tile.tileSouth.tileEast
    ];
    return neighbors.filter(n => n != undefined) as Tile[];
}

export function tilePredicate(tiles: Iterable<Tile>): (tile: Tile) => boolean {
    const tileSet = new Set(tiles);
    return tileSet.has.bind(tileSet);
}

export function canAct(unit: Unit): boolean {
    return !unit.acted && unit.energy >= unit.job.actionCost;
}

export function canRest(unit: Unit): boolean {
    if (unit.acted || unit.energy >= 100) {
        return false;
    }

    return getSquareNeighbors(unit.tile).some(
        t => !!t.structure && t.structure.type === "shelter" && t.structure.owner === unit.owner
    );
}

export function canChangeJob(unit: Unit, job: Job): boolean {
    return (
        !unit.acted &&
        unit.job != job &&
        unit.job !== AI.Jobs["cat overlord"] &&
        unit.energy >= 100 &&
        isInSquareRadius(unit.owner!.cat.tile!, unit.tile!, 1)
    );
}

export function canConvert(unit: Unit, target: Unit, checkRange: boolean = true): boolean {
    if (unit.job !== AI.Jobs.missionary || !canAct(unit)) {
        return false;
    }

    if (target.owner != null) {
        return false;
    }

    return !checkRange || unit.tile!.hasNeighbor(target.tile);
}

export function isInSquareRadius(tile1: Tile, tile2: Tile, radius: number): boolean {
    if (tile1.x - tile2.x > radius || tile2.x - tile1.x > radius) {
        return false;
    }

    return !(tile1.y - tile2.y > radius || tile2.y - tile1.y > radius);
}

export function isInStepRange(tile1: Tile, tile2: Tile, moves: number): boolean {
    return Math.abs(tile1.x - tile2.x) + Math.abs(tile1.y - tile2.y) <= moves;
}
