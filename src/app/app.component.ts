import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  template: `
      <main>
        <router-outlet></router-outlet>
      </main>
  `
})
export class AppComponent {
}
