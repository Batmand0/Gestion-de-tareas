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
  imports: [CommonModule, FormsModule, NavbarComponent] // Agrega CommonModule aquí
})
export class TareaComponent {
  tituloNuevaTarea: string = '';
  filtro: 'todas' | 'completadas' | 'pendientes' = 'todas';

  constructor(public tareaService: TareaService) {}

  agregarTarea(): void {
    if (this.tituloNuevaTarea.trim()) {
      this.tareaService.agregarTarea(this.tituloNuevaTarea);
      this.tituloNuevaTarea = '';
    }
  }

  cambiarEstado(tarea: Tarea): void {
    console.log('Estado de completada antes de cambiar:', tarea.completada);
    this.tareaService.actualizarTarea(tarea.id, tarea.titulo, !tarea.completada);
    console.log('Estado de completada después de cambiar:', tarea.completada);
  }

  eliminarTarea(id: number): void {
    this.tareaService.eliminarTarea(id);
  }

  obtenerTareasFiltradas(): Tarea[] {
    if (this.filtro === 'completadas') {
      return this.tareaService.obtenerTareas().filter(t => t.completada);
    } else if (this.filtro === 'pendientes') {
      return this.tareaService.obtenerTareas().filter(t => !t.completada);
    } else {
      return this.tareaService.obtenerTareas();
    }
  }
}
