// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.
<%include file='functions.noCreer' /><% parent_classes = list(obj['parentClasses'])
#// first let's figure out the imports
imports = {}
if len(parent_classes) > 0:
    for parent_class in parent_classes:
        imports['./' + str(hyphenate(parent_class))] = [parent_class]
else:
    if obj_key == 'Game':
        parent_classes.append('BaseGame')
        imports['../../joueur/base-game'] = ['BaseGame']
    else:
        parent_classes.append('BaseGameObject')
        imports['../../joueur/base-game-object'] = ['BaseGameObject']

# // now figure out what classes our attributes and functions use
%>/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

${shared['ts']['imports'](shared['ts']['generate_imports'](obj_key, obj, imports))}
${merge('// ', 'imports', '// any additional imports you want can be placed here safely between creer runs', optional=True, help=False)}

${shared['ts']['block_comment']('', obj)}
export class ${obj_key} extends ${', '.join(parent_classes)} {

% if 'TiledGame' in game['serverParentClasses'] and obj_key == "Tile":
    /**
     * Gets the valid directions that tiles can be in, "North", "East", "South",
     * or "West"
     * @returns [ "North", "East", "South", "West" ]
     */
    public static directions: ["North", "East", "South", "West"]
                            = ["North", "East", "South", "West"];

% endif
% for attr_name in obj['attribute_names']:
<%
attr_parms = obj['attributes'][attr_name]
%>${shared['ts']['block_comment']('    ', attr_parms)}
    public readonly ${attr_name}!: ${shared['ts']['type'](attr_parms['type'])};

% endfor
% for function_name in obj['function_names']:
${shared['ts']['formatted_function_top'](function_name, obj)}
        return this.runOnServer("${function_name}", {
% for arg in obj['functions'][function_name]['arguments']:
            ${arg['name']},
% endfor
        });
    }

% endfor
% if 'Tile' in game_objs:
% if 'TiledGame' in game['serverParentClasses']: #// then we need to add some client side utility functions
% if obj_key == 'Game':
    /**
     * Gets the Tile at a specified (x, y) position
     * @param x an integer between 0 and the mapWidth
     * @param y an integer between 0 and the mapHeight
     * @returns the Tile at (x, y) or null if out of bounds
     */
    public getTileAt(x: number, y: number): Tile | undefined {
        if (x < 0 || y < 0 || x >= this.mapWidth || y >= this.mapHeight) {
            // out of bounds
            return undefined;
        }

        return this.tiles[x + y * this.mapWidth];
    }
% elif obj_key == 'Tile':
    /**
     * Gets the neighbors of this Tile.
     *
     * @returns The neighboring (adjacent) Tiles to this tile.
     */
    public getNeighbors(): Tile[] {
        const neighbors = [];

        if (this.tileNorth) {
            neighbors.push(this.tileNorth);
        }

        if (this.tileEast) {
            neighbors.push(this.tileEast);
        }

        if (this.tileSouth) {
            neighbors.push(this.tileSouth);
        }

        if (this.tileWest) {
            neighbors.push(this.tileWest);
        }

        return neighbors;
    }

    /**
     * Checks if a Tile is pathable to units
     * @returns True if pathable, false otherwise
     */
    public isPathable(): boolean {
${merge("        // ", "is-pathable-builtin", "        return false; // DEVELOPER ADD LOGIC HERE", help=False)}
    }

    /**
     * Checks if this Tile has a specific neighboring Tile
     * @returns true if the tile is a neighbor of this Tile, false otherwise
     */
    public hasNeighbor(tile: Tile | undefined): boolean {
        return Boolean(tile && (
            this.tileNorth === tile ||
            this.tileEast === tile ||
            this.tileSouth === tile ||
            this.tileEast === tile),
        );
    }
% endif
% endif
% endif
${merge(
    '    // ',
    'functions',
    '    // any additional functions you want to add to this class can be preserved here',
    optional=True,
    help=False
)}
}
