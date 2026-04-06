import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incidentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="incidentes-container">
      <h1>Gestión de Incidentes</h1>
      
      <div class="filters">
        <input type="text" placeholder="Buscar incidente..." [(ngModel)]="searchTerm">
        <select [(ngModel)]="filterStatus">
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="resuelto">Resuelto</option>
        </select>
      </div>

      <div *ngIf="incidentes" class="incidentes-list">
        <div *ngFor="let incidente of incidentes" class="incidente-card">
          <div class="incidente-header">
            <h3>Incidente #{{ incidente.id }}</h3>
            <span [class]="'status-' + incidente.estado">{{ incidente.estado }}</span>
          </div>
          <p><strong>Conductor:</strong> {{ incidente.usuario_id }}</p>
          <p><strong>Tipo:</strong> {{ incidente.tipo_incidente }}</p>
          <p><strong>Ubicación:</strong> {{ incidente.ubicacion }}</p>
          <p><strong>Fecha:</strong> {{ incidente.fecha_creacion | date:'short' }}</p>
          <div class="incidente-actions">
            <button class="btn-view">Ver detalles</button>
            <button class="btn-edit">Editar</button>
          </div>
        </div>
      </div>

      <div *ngIf="!incidentes || incidentes.length === 0" class="no-data">
        <p>No hay incidentes registrados</p>
      </div>
    </div>
  `,
  styles: [`
    .incidentes-container {
      padding: 20px;
    }

    h1 {
      margin-bottom: 20px;
      color: #1f3a7a;
    }

    .filters {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .filters input,
    .filters select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .incidentes-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .incidente-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .incidente-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }

    .incidente-header h3 {
      margin: 0;
      color: #333;
    }

    .status-pendiente {
      background-color: #fff3cd;
      color: #856404;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .status-en_proceso {
      background-color: #cfe2ff;
      color: #084298;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .status-resuelto {
      background-color: #d1e7dd;
      color: #0f5132;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .incidente-card p {
      margin: 8px 0;
      font-size: 14px;
    }

    .incidente-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .btn-view,
    .btn-edit {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: background-color 0.3s;
    }

    .btn-view {
      background-color: #007bff;
      color: white;
    }

    .btn-view:hover {
      background-color: #0056b3;
    }

    .btn-edit {
      background-color: #6c757d;
      color: white;
    }

    .btn-edit:hover {
      background-color: #5a6268;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #999;
    }
  `]
})
export class IncidentesComponent implements OnInit {
  incidentes: any[] = [];
  searchTerm = '';
  filterStatus = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadIncidentes();
  }

  loadIncidentes() {
    // Simulación de datos - reemplazar con llamada real al backend
    this.incidentes = [
      {
        id: 1,
        usuario_id: 'user123',
        tipo_incidente: 'Accidente',
        estado: 'pendiente',
        ubicacion: 'Av. Principal 123',
        fecha_creacion: new Date('2026-04-05T10:30:00')
      },
      {
        id: 2,
        usuario_id: 'user456',
        tipo_incidente: 'Descompostura',
        estado: 'en_proceso',
        ubicacion: 'Calle Secundaria 456',
        fecha_creacion: new Date('2026-04-05T09:15:00')
      },
      {
        id: 3,
        usuario_id: 'user789',
        tipo_incidente: 'Choque',
        estado: 'resuelto',
        ubicacion: 'Intersección Principal',
        fecha_creacion: new Date('2026-04-04T15:45:00')
      }
    ];
  }
}
