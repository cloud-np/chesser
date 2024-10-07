import { ChangeDetectionStrategy, Component, computed, inject, input, QueryList, signal, Signal, ViewChildren, ViewEncapsulation } from '@angular/core';
import { BoardStore } from 'src/app/store/board/board.store';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'app-coords',
    template: `
        @for (coord of coords(); track coord) {
            <span class="coord">
                {{ coord }}
            </span>
        }
    `,
    standalone: true,
    providers: [],
    imports: [NgFor, NgClass],
    styleUrls: ['./coords.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.coords-container]': 'true',
        '[class.black]': 'isBlackView()',
        '[class.ranks]': 'isRank()',
        '[class.files]': '!isRank()'
    }
})
export class CoordsComponent {
    isRank = input<boolean>(false);
    isBlackView = input<boolean>(false);

    coords = computed(
        () => this.isRank()
        ? ['1', '2', '3', '4', '5', '6', '7', '8']
        : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    )
}
