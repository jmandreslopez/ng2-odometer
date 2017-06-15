/**
 * Created by Jose Andres on 6.15.17
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ng2OdometerConfigModel {
    animation?: string;
    format?: string;
    theme?: string;
    value?: number;
    auto?: boolean;
}

export class Ng2OdometerConfig implements Ng2OdometerConfigModel {
    animation?: string = 'slide';
    format: string = '(,ddd)';
    theme?: string = 'default';
    value?: number = 0;
    auto?: boolean = true;
}
