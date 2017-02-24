import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app',
    styleUrls: ['app.component.css'],
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor() {
        this.observable = new Observable<boolean>((observer: any) => this.observer = observer).share();
    }

    public trigger() {
        this.observer.next(true);
    }
}
