/**
 * Created by Jose Andres on 02.23.17
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2OdometerComponent } from './odometer';

@NgModule({
    imports: [CommonModule],
    declarations: [Ng2OdometerComponent],
    exports: [Ng2OdometerComponent]
})
export class Ng2OdometerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Ng2OdometerModule
        };
    }
}
