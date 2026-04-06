import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <header>
        <div class="navbar">
          <h1>AuxilioSCZ - Dashboard Admin</h1>
          <nav>
            <a routerLink="/">Inicio</a>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/incidentes">Incidentes</a>
          </nav>
        </div>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    header {
      background-color: #1f3a7a;
      color: white;
      padding: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    h1 {
      margin: 0;
      font-size: 24px;
    }
    nav {
      display: flex;
      gap: 20px;
    }
    nav a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
    }
    nav a:hover {
      opacity: 0.8;
    }
    main {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'AuxilioSCZ Frontend';
}
