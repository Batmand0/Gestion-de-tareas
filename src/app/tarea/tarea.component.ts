import { Component } from '@angular/core';
import { TareaService } from '../services/tarea.service';
import { Tarea } from '../models/tarea.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-tarea',
  standalone: true,
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class TareaComponent {
  tituloNuevaTarea: string = '';
  filtro: 'todas' | 'completadas' | 'pendientes' = 'todas';
  tareaEnEdicion: Tarea | null = null; // Esto guarda la tarea en edición

  constructor(public tareaService: TareaService) {}

  // Método para agregar tarea
  agregarTarea(): void {
    if (this.tituloNuevaTarea.trim()) {
      this.tareaService.agregarTarea(this.tituloNuevaTarea);
      this.tituloNuevaTarea = '';
    }
  }

  // Método para cambiar el estado de la tarea (completada o pendiente)
  cambiarEstado(tarea: Tarea): void {
    this.tareaService.actualizarTarea(tarea.id, tarea.titulo, tarea.completada);
  }

  // Método para eliminar tarea
  eliminarTarea(id: number): void {
    this.tareaService.eliminarTarea(id);
  }

  // Obtener las tareas filtradas por el estado (completadas, pendientes o todas)
  obtenerTareasFiltradas(): Tarea[] {
    if (this.filtro === 'completadas') {
      return this.tareaService.obtenerTareas().filter(t => t.completada);
    } else if (this.filtro === 'pendientes') {
      return this.tareaService.obtenerTareas().filter(t => !t.completada);
    } else {
      return this.tareaService.obtenerTareas();
    }
  }

  // Habilitar la edición de una tarea
  habilitarEdicion(tarea: Tarea): void {
    this.tareaEnEdicion = { ...tarea }; // Copiar la tarea para poder editarla
  }

  // Guardar la tarea editada
  guardarEdicion(): void {
    if (this.tareaEnEdicion) {
      this.tareaService.actualizarTarea(this.tareaEnEdicion.id, this.tareaEnEdicion.titulo, this.tareaEnEdicion.completada);
      this.tareaEnEdicion = null; // Salir del modo edición
    }
  }

  // Cancelar la edición
  cancelarEdicion(): void {
    this.tareaEnEdicion = null; // Salir del modo edición sin guardar
  }
}
