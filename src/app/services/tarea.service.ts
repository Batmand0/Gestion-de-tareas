import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareas: Tarea[] = [];

  constructor() {
    this.cargarTareas();
  }

  private cargarTareas(): void {
    if (typeof window !== 'undefined') {  // Verifica si estamos en el navegador
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas) {
          this.tareas = JSON.parse(tareasGuardadas);
        }
      }
  }

  private guardarTareas(): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
      }
    }

  obtenerTareas(): Tarea[] {
    return this.tareas;
  }
  

  agregarTarea(titulo: string): void {
    const nuevaTarea: Tarea = {
      id: new Date().getTime(),
      titulo,
      completada: false,
    };
    this.tareas.push(nuevaTarea);
    this.guardarTareas();
  }

  actualizarTarea(id: number, titulo: string, completada: boolean): void {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.titulo = titulo;
      tarea.completada = completada;
      this.guardarTareas();
    }
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.guardarTareas();
  }
}
