import { Move } from "./move.model";

export namespace MoveUtil {
    export const getBeforeMoveElements = (move: Move): { fromElb: HTMLElement, toElb: HTMLElement } => {
        let fromElb = document.getElementById(move.from.squareName + 'spanBefore');
        let toElb = document.getElementById(move.to.squareName + 'spanBefore');

        if (!fromElb || !toElb) {
            throw new Error(`Could not find BEFORE tile Elements for move: ${move}`);
        }
        return { fromElb, toElb };
    }

    export const getMoveElements = (move: Move): { fromEl: HTMLElement, toEl: HTMLElement } => {
        let fromEl = document.getElementById(move.from.squareName);
        let toEl = document.getElementById(move.to.squareName);
        if (!fromEl || !toEl)
            throw new Error(`Could not find tile Elements for move: ${move}`);
        return { fromEl, toEl };
    }

    export const resetTileColors = (move: Move): void => {
        const { fromElb, toElb } = MoveUtil.getBeforeMoveElements(move);
        fromElb.classList.remove('clicked');
        toElb.classList.remove('clicked');
    }

    export const tryPlayMove = (move: Move): boolean => {
        // If its the same tile, do nothing
        if (move.from.squareName !== move.to.squareName) {
            const { fromEl, toEl } = MoveUtil.getMoveElements(move);
            toEl.appendChild(fromEl.getElementsByTagName('img')[0])
            return true;
        }
        return false;
    }
};
