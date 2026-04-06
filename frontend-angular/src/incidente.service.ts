// frontend-angular/src/app/services/incidente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CrearIncidenteDTO {
  vehiculo_id: string;
  lat: number;
  lng: number;
  descripcion?: string;
  foto?: File;
  audio?: Blob;
}

export interface Incidente {
  id: string;
  tipo: string;
  estado: 'pendiente' | 'en_proceso' | 'atendido' | 'cancelado';
  prioridad: number;
  lat_incidente: number;
  lng_incidente: number;
  taller?: { nombre: string; direccion: string };
  analisis_ia?: { clasificacion: string; resumen: string; prioridad_sugerida: number };
  creado_en: string;
}

@Injectable({ providedIn: 'root' })
export class IncidenteService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  crearIncidente(datos: CrearIncidenteDTO): Observable<{ incidente_id: string }> {
    const form = new FormData();
    form.append('vehiculo_id', datos.vehiculo_id);
    form.append('lat', datos.lat.toString());
    form.append('lng', datos.lng.toString());
    if (datos.descripcion) form.append('descripcion', datos.descripcion);
    if (datos.foto) form.append('foto', datos.foto, 'foto.jpg');
    if (datos.audio) form.append('audio', datos.audio, 'audio.webm');
    return this.http.post<{ incidente_id: string }>(`${this.api}/incidentes/`, form);
  }

  obtenerIncidente(id: string): Observable<Incidente> {
    return this.http.get<Incidente>(`${this.api}/incidentes/${id}`);
  }

  misIncidentes(): Observable<Incidente[]> {
    return this.http.get<Incidente[]>(`${this.api}/incidentes/usuario/mis-incidentes`);
  }

  // Para la app de talleres
  solicitudesPendientes(): Observable<Incidente[]> {
    return this.http.get<Incidente[]>(`${this.api}/incidentes/talleres/disponibles`);
  }

  actualizarEstado(id: string, estado: string, costo?: number): Observable<any> {
    return this.http.patch(`${this.api}/incidentes/${id}/estado`, { nuevo_estado: estado, costo });
  }
}
