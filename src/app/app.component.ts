import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
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
  theme = Theme.Dark;
  dark = false;

  private document = inject(DOCUMENT);

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme = theme as Theme;
    }
    this.applyTheme(this.theme);
  }

  setLightTheme() {
    this.applyTheme(Theme.Light);
  }

  setDarkTheme() {
    this.applyTheme(Theme.Dark);
  }

  isDarkTheme() {
    return this.theme === Theme.Dark;
  }

  /** Applies specific theme */
  private applyTheme(theme: Theme) {
    this.theme = theme;
    if (theme === Theme.Dark) {
      this.document.querySelector('html')?.classList.add('dark');
    } else {
      this.document.querySelector('html')?.classList.remove('dark');
    }
    localStorage.setItem('theme', this.theme);
  }
}
