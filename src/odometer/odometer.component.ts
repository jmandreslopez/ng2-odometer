///<reference path="odometer.d.ts" />

/**
 * Created by Jose Andres on 6.15.17
 */

import * as _ from 'lodash';
import { Component, ViewEncapsulation, Input, OnInit, OnDestroy, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OdometerModel } from './odometer.model';
import { Ng2OdometerConfig, Ng2OdometerConfigModel } from './odometer.config';
import {
    CAR_THEME,
    DEFAULT_THEME,
    DIGITAL_THEME,
    MINIMAL_THEME,
    PLAZA_THEME,
    SLOT_MACHINE_THEME,
    TRAIN_STATION_THEME,
 } from './themes';

// HubSpot's Oodometer
// https://github.com/HubSpot/odometer
const Odometer = require('odometer');

@Component({
    selector: 'ng2-odometer',
    encapsulation: ViewEncapsulation.None,
    styles: [
        CAR_THEME,
        DEFAULT_THEME,
        DIGITAL_THEME,
        MINIMAL_THEME,
        PLAZA_THEME,
        SLOT_MACHINE_THEME,
        TRAIN_STATION_THEME,
        `
            .odometer,
            .odometer-inside,
            .odometer-digit,
            .odometer-digit-spacer,
            .odometer-digit-inner,
            .odometer-ribbon,
            .odometer-ribbon-inner,
            .odometer-value,
            .odometer-formatting-mark {
                color: inherit;
                font-size: inherit;
                font-family: inherit;
            }
        `,
    ],
    template: `<div #container></div>`
})
export class Ng2OdometerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    private subscription: Subscription;
    private odometer: OdometerModel;
    @ViewChild('container', { read: ElementRef }) container: ElementRef;
    @Input() number: number; // Required
    @Input() config: Ng2OdometerConfigModel = {};
    @Input() observable: Observable<boolean> = undefined;

    // Individual configuration attributes
    @Input() animation: string = undefined;
    @Input() format: string = undefined;
    @Input() theme: string = undefined;
    @Input() value: number = undefined;
    @Input() duration: number = undefined;
    @Input() auto: boolean = undefined;

    // Available themes
    private themes: Array<string> = [
        'car',
        'default',
        'digital',
        'minimal',
        'plaza',
        'slot-machine',
        'train-station'
    ];

    // Start Odometer
    private initOdometer() {
        if (!_.isUndefined(this.container)
            && typeof Odometer !== 'undefined') {

            this.odometer = new Odometer({
                el: this.container.nativeElement,
                animation: this.config.animation,
                value: this.config.value,
                duration: this.config.duration,
                format: this.config.format,
                theme: this.config.theme,
            });

            if (!_.isUndefined(this.number) && this.config.auto) {
                this.odometer.update(this.number);
            }
        }
    }

    private initConfig() {
        this.config = _.defaults(this.config, new Ng2OdometerConfig());

        // Animation
        if (!_.isUndefined(this.animation)) {
            this.config.animation = this.animation;
        }

        // Format
        if (!_.isUndefined(this.format)) {
            this.config.format = this.format;
        }

        // Theme
        if (!_.isUndefined(this.theme)) {
            this.config.theme = !_.includes(this.themes, this.theme) ? 'default' : this.theme;
        }

        // Value
        if (!_.isUndefined(this.value)) {
            this.config.value = this.value;
        }

        // Duration
        if (!_.isUndefined(this.duration)) {
            this.config.duration = this.duration;
        }

        // Auto
        if (!_.isUndefined(this.auto)) {
            this.config.auto = this.auto;
        }

        // Validate theme. If not part of the
        // available themes array, use the default
        if (!_.includes(this.themes, this.config.theme)) {
            this.config.theme = 'default';
        }
    }

    // ***************************************
    //  LIFECYCLES
    // ***************************************

    public ngOnInit() {

        // Bind Observable
        if (!_.isUndefined(this.observable) && !this.config.auto) {
            this.subscription = this.observable.subscribe((trigger: boolean) => {
                if (!_.isUndefined(trigger) && trigger) {
                    this.odometer.update(this.number);
                }
            });
        }

        // Apply defaults and
        // individual configurations
        this.initConfig();
    }

    public ngOnDestroy() {
        if (!_.isUndefined(this.subscription)) {
            this.subscription.unsubscribe();
        }
    }

    public ngOnChanges() {
        if (!_.isUndefined(this.number) && !_.isUndefined(this.odometer) && this.config.auto) {
            this.odometer.update(this.number);
        }
    }

    public ngAfterViewInit() {
        this.initOdometer();
    }
}
