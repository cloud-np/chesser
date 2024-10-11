import { ChangeDetectionStrategy, Component, computed, inject, input, QueryList, signal, Signal, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgStyle } from '@angular/common';

@Component({
    selector: 'app-coords',
    template: `
        @for (c of coords(); track c[0]) {
            <span class="coord">
                {{ c[0] }}
            </span>
        }
    `,
    standalone: true,
    providers: [],
    imports: [NgFor, NgClass, NgStyle],
    styleUrls: ['./coords.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.coords-container]': 'true',
        '[class.black]': '!isWhiteView()',
        '[class.ranks]': 'isRank()',
        '[class.files]': '!isRank()'
    }
})
export class CoordsComponent {
    isRank = input<boolean>(false);
    isWhiteView = input<boolean>(true);

    coords = computed(
        () => this.isRank()
        ? ['1', '2', '3', '4', '5', '6', '7', '8']
        : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    )
}
