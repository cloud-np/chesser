import { Square } from "../square/square.model";

export const DEFAULT_FEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
export const DEFAULT_BOARD_SIZE = 600;
export const MAX_BOARD_SIZE = 800;
export const MIN_BOARD_SIZE = 100;
export const LITTLE_ENDIAN_RANK_FILE_MAPPING: Square[] = [
    56, 57, 58, 59, 60, 61, 62, 63, // Rank 8: a8, b8, c8, d8, e8, f8, g8, h8
    48, 49, 50, 51, 52, 53, 54, 55, // Rank 7: a7, b7, c7, d7, e7, f7, g7, h7
    40, 41, 42, 43, 44, 45, 46, 47, // Rank 6: a6, b6, c6, d6, e6, f6, g6, h6
    32, 33, 34, 35, 36, 37, 38, 39, // Rank 5: a5, b5, c5, d5, e5, f5, g5, h5
    24, 25, 26, 27, 28, 29, 30, 31, // Rank 4: a4, b4, c4, d4, e4, f4, g4, h4
    16, 17, 18, 19, 20, 21, 22, 23, // Rank 3: a3, b3, c3, d3, e3, f3, g3, h3
    8, 9, 10, 11, 12, 13, 14, 15,   // Rank 2: a2, b2, c2, d2, e2, f2, g2, h2
    0, 1, 2, 3, 4, 5, 6, 7          // Rank 1: a1, b1, c1, d1, e1, f1, g1, h1
];
// TODO: Supposidly should be migrated when bitwise operators are implemented
export const FLIPPED_LITTLE_ENDIAN_RANK_FILE_MAPPING: Square[] = [
    7, 6, 5, 4, 3, 2, 1, 0,       // Rank 1: h1, g1, f1, e1, d1, c1, b1, a1
    15, 14, 13, 12, 11, 10, 9, 8, // Rank 2: h2, g2, f2, e2, d2, c2, b2, a2
    23, 22, 21, 20, 19, 18, 17, 16, // Rank 3: h3, g3, f3, e3, d3, c3, b3, a3
    31, 30, 29, 28, 27, 26, 25, 24, // Rank 4: h4, g4, f4, e4, d4, c4, b4, a4
    39, 38, 37, 36, 35, 34, 33, 32, // Rank 5: h5, g5, f5, e5, d5, c5, b5, a5
    47, 46, 45, 44, 43, 42, 41, 40, // Rank 6: h6, g6, f6, e6, d6, c6, b6, a6
    55, 54, 53, 52, 51, 50, 49, 48, // Rank 7: h7, g7, f7, e7, d7, c7, b7, a7
    63, 62, 61, 60, 59, 58, 57, 56  // Rank 8: h8, g8, f8, e8, d8, c8, b8, a8
];
