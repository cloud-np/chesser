// import { Injectable } from '@angular/core';
// import { Tile } from '../core/tile/tile.model';
// import { Piece } from '../core/piece/piece.model';
// import { Square } from '../core/square/square.model';
// import { PieceUtil } from '../core/piece/piece.util';

// @Injectable({
//     providedIn: 'root',
// })
// export class TileService {
//     constructor() {}

//     createTile(isWhite: boolean, square: Square): Tile {
//         const coords = [square % 8, Math.floor(square / 8)];
//         return {
//             piece: PieceUtil.empty(),
//             isWhite,
//             coords,
//             square,
//             squareName: this.squareNameFromCoords(coords),
//         };
//     }

//     setPiece(tile: Tile, piece: Piece): Tile {
//         return { ...tile, piece };
//     }

//     squareNameFromCoords(coords: number[]): string {
//         return String.fromCharCode(97 + coords[1]) + (8 - coords[0]);
//     }
// }
