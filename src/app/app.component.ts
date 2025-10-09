import { Component, DOCUMENT, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export enum Theme {
  Browser = 'Browser',
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  theme = Theme.Browser;
  dark = false;
  Theme = Theme;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme = theme as Theme;
    }
    this.applyTheme();
  }

  /** Toggles between light & dark themes */
  toggleDark(theme: Theme) {
    this.theme = theme;
    this.applyTheme();
    if (theme === Theme.Browser) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }

  isTheme(theme: Theme) {
    return this.theme === theme;
  }

  /** Applies specific theme */
  private applyTheme() {
    const browserHasDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    this.dark =
      (this.theme === Theme.Browser && browserHasDarkTheme) ||
      this.theme === Theme.Dark;
    if (this.dark) {
      this.document.querySelector('html')?.classList.add('dark');
    } else {
      this.document.querySelector('html')?.classList.remove('dark');
    }
  }
}
