import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import 'my-lib-demo';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
    title = 'myApp';

    atomicDesignDialogOpen = false;
    calendarDialogOpen = false;
    darkTheme = false;
    locale = 'en-US';

    toggleTheme() {
        this.darkTheme = !this.darkTheme;
        if (this.darkTheme) {
            document.documentElement.setAttribute('data-theme-dark', '');
        } else {
            document.documentElement.removeAttribute('data-theme-dark');
        }
    }

    openAtomicDesign() {
        this.atomicDesignDialogOpen = true;
    }

    openCalendar() {
        this.calendarDialogOpen = true;
    }

    changeLocale(e: Event) {
        this.locale = (e.target as HTMLInputElement).value;
    }

}
