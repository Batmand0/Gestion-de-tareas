import { Routes } from '@angular/router';
import { TareaComponent } from './tarea/tarea.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent}, // Ruta raíz que carga el componente
    { path: 'home', component: HomeComponent},
    { path: 'tarea', component: TareaComponent}
  // Puedes agregar más rutas aquí
];
