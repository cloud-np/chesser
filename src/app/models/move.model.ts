import { Tile } from "./tile.model";

export class Move {
    from: Tile;
    to: Tile;

    constructor(from: Tile, to: Tile) {
        this.from = from;
        this.to = to;
    }

    getBeforeMoveElements(): { fromElb: HTMLElement, toElb: HTMLElement } {
        let fromElb = document.getElementById(this.from.squareName + 'spanBefore');
        let toElb = document.getElementById(this.to.squareName + 'spanBefore');
        if (!fromElb || !toElb)
            throw new Error(`Could not find BEFORE tile Elements for move: ${this}`);
        return { fromElb, toElb };
    }

    getMoveElements(): { fromEl: HTMLElement, toEl: HTMLElement } {
        let fromEl = document.getElementById(this.from.squareName);
        let toEl = document.getElementById(this.to.squareName);
        if (!fromEl || !toEl)
            throw new Error(`Could not find tile Elements for move: ${this}`);
        return { fromEl, toEl };
    }

    resetTileColors(): void {
        const { fromElb, toElb } = this.getBeforeMoveElements();
        fromElb.classList.remove('clicked');
        toElb.classList.remove('clicked');
    }

    tryPlayMove(): boolean {
        // If its the same tile, do nothing
        if (this.from.squareName !== this.to.squareName) {
            const { fromEl, toEl } = this.getMoveElements();
            toEl.appendChild(fromEl.getElementsByTagName('img')[0])
            return true;
        }
        return false;
    }


}