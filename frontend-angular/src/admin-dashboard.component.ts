// frontend-angular/src/app/pages/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Resumen {
  incidentes: { total: number; hoy: number; este_mes: number };
  talleres: { total: number; activos: number };
  conductores: number;
  ingresos: { este_mes_bs: number; total_bs: number };
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header class="dash-header">
        <h1>Panel administrativo</h1>
        <span class="badge-admin">Admin</span>
      </header>

      <!-- KPIs -->
      <div class="kpi-grid" *ngIf="resumen">
        <div class="kpi-card">
          <span class="kpi-label">Incidentes hoy</span>
          <span class="kpi-value">{{ resumen.incidentes.hoy }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Este mes</span>
          <span class="kpi-value">{{ resumen.incidentes.este_mes }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Talleres activos</span>
          <span class="kpi-value">{{ resumen.talleres.activos }}/{{ resumen.talleres.total }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Conductores</span>
          <span class="kpi-value">{{ resumen.conductores }}</span>
        </div>
        <div class="kpi-card highlight">
          <span class="kpi-label">Ingresos del mes</span>
          <span class="kpi-value">Bs {{ resumen.ingresos.este_mes_bs | number:'1.0-0' }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Ingresos totales</span>
          <span class="kpi-value">Bs {{ resumen.ingresos.total_bs | number:'1.0-0' }}</span>
        </div>
      </div>

      <!-- Top Talleres -->
      <div class="chart-card">
        <h3>Top talleres</h3>
        <div class="top-list">
          <div class="top-item" *ngFor="let t of topTalleres; let i = index">
            <span class="top-rank">#{{ i+1 }}</span>
            <span class="top-nombre">{{ t.nombre }}</span>
            <span class="top-servicios">{{ t.servicios_totales }} servicios</span>
            <span class="top-stars">{{ t.calificacion | number:'1.1-1' }} ★</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 24px; max-width: 1200px; margin: 0 auto; }
    .dash-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .dash-header h1 { font-size: 22px; font-weight: 600; }
    .badge-admin { background: #EEEDFE; color: #3C3489; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px; }
    .kpi-card { background: #f5f4f0; border-radius: 10px; padding: 16px; }
    .kpi-card.highlight { background: #E24B4A; }
    .kpi-card.highlight .kpi-label, .kpi-card.highlight .kpi-value { color: #fff; }
    .kpi-label { display: block; font-size: 12px; color: #888; margin-bottom: 4px; }
    .kpi-value { font-size: 24px; font-weight: 600; color: #1a1a1a; }
    .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .chart-card { background: #fff; border: 0.5px solid #e0dfd8; border-radius: 12px; padding: 16px; }
    .chart-card h3 { font-size: 14px; font-weight: 500; margin-bottom: 12px; color: #444; }
    .top-list { display: flex; flex-direction: column; gap: 8px; }
    .top-item { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 6px 0; border-bottom: 0.5px solid #f0efeb; }
    .top-rank { font-weight: 600; color: #E24B4A; width: 24px; }
    .top-nombre { flex: 1; }
    .top-servicios { color: #888; font-size: 12px; }
    .top-stars { color: #EF9F27; font-weight: 500; }
    @media(max-width: 700px) { .charts-grid { grid-template-columns: 1fr; } }
  `]
})
export class AdminDashboardComponent implements OnInit {
  resumen: Resumen | null = null;
  topTalleres: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarResumen();
    this.cargarTopTalleres();
  }

  cargarResumen() {
    // Datos de ejemplo para development
    this.resumen = {
      incidentes: { total: 257, hoy: 12, este_mes: 145 },
      talleres: { total: 32, activos: 28 },
      conductores: 1250,
      ingresos: { este_mes_bs: 45000, total_bs: 180000 }
    };
  }

  cargarTopTalleres() {
    // Datos de ejemplo para development
    this.topTalleres = [
      { nombre: 'Taller Central', servicios_totales: 156, calificacion: 4.8 },
      { nombre: 'Taller Norte', servicios_totales: 142, calificacion: 4.6 },
      { nombre: 'Taller Este', servicios_totales: 128, calificacion: 4.5 }
    ];
  }
}
