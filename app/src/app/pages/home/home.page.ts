import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardContainer } from 'src/app/core/board/board.container';

@Component({
    selector: 'app-landing-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [BoardContainer],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
}
