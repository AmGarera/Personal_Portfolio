import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav class="flex justify-end p-4 text-white">
      <a href="/" class="px-2 py-1 transition-colors duration-200">Home</a>
      <a href="/about" class="px-2 py-1 transition-colors duration-200">About</a>
      <a href="/contact" class="px-2 py-1 transition-colors duration-200">Contact</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    `,
  ],
})
export class AppComponent {}
