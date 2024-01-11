import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouteAction } from "./route.action";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export namespace RouteEffect {

    export const navigate$ = createEffect(
        (actions$ = inject(Actions), router = inject(Router)) =>
        actions$.pipe(
            ofType(RouteAction.navigate),
            tap(() => {
                router.navigateByUrl();
            })
        ),  { functional: true, dispatch: false },
    );
}
