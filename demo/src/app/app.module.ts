import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2OdometerModule } from 'ng2-odometer';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        Ng2OdometerModule.forRoot()
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}
