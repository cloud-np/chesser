import { WritableSignal } from "@angular/core";

export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;
export type Square = 'a0' | `${File}${Rank}`;
export type File = (typeof files)[number];
export type Rank = (typeof ranks)[number];
export type Pos = [number, number];
export type Pieces = Map<Square, Piece>;

export enum PieceType {
    Pawn = "pawn",
    Rook = "rook",
    Knight = "knight",
    Bishop = "bishop",
    Queen = "queen",
    King = "king",
    Empty = "empty",
}

export interface Piece {
    type: PieceType;
    imgName: string;
    isWhite: boolean;
    square: Square;
    posSig: WritableSignal<Pos>;
};
