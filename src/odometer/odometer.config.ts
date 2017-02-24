/**
 * Created by Jose Andres on 02.23.17
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ng2OdometerConfigModel {
    animation?: string;
    format?: string;
    theme?: string;
    value?: number;
}

export class Ng2OdometerConfig implements Ng2OdometerConfigModel {
    animation?: string = 'slide';
    format: string = '(,ddd)';
    theme?: string = 'default';
    value?: number = 0;
}
