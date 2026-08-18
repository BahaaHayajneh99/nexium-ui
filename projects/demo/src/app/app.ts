import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './component/nav';
import { ThemeCustomizer } from './component/theme-customizer/theme-customizer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, ThemeCustomizer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo');
}
