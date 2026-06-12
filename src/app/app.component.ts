import {
  Component,
  DOCUMENT,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideMoon, LucideSun } from '@lucide/angular';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LucideMoon, LucideSun],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  theme = signal(Theme.Dark);

  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      if (this.theme() === Theme.Dark) {
        this.document.querySelector('html')?.classList.add('dark');
      } else {
        this.document.querySelector('html')?.classList.remove('dark');
      }
      localStorage.setItem('theme', this.theme());
    });
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme.set(theme as Theme);
    }
  }

  setLightTheme() {
    this.theme.set(Theme.Light);
  }

  setDarkTheme() {
    this.theme.set(Theme.Dark);
  }

  isDarkTheme() {
    return this.theme() === Theme.Dark;
  }
}
