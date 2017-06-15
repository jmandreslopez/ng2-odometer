import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app',
    styleUrls: ['app.component.css'],
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public number: number = 3000;
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor() {
        this.observable = new Observable<boolean>((observer: any) => this.observer = observer).share();

        // For auto mode
        setTimeout(() => this.number += this.number, 5000); // Update on 5 seconds
    }

    public trigger() {
        this.observer.next(true);
    }
}
