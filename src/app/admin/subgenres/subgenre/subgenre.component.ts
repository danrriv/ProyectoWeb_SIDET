import { Component } from '@angular/core';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { ApiSubgenreService } from 'src/app/services/api-subgenre/api-subgenre.service';

@Component({
  selector: 'app-subgenre',
  templateUrl: './subgenre.component.html',
  styleUrls: ['./subgenre.component.css']
})
export class SubgenreComponent {
  subgenres: Subgenre[] = [];
  search: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private subgenreService: ApiSubgenreService){}

  ngOnInit(): void{
   this.getSubgenres();
  }

  getSubgenres(){
    this.subgenreService.getSubgenre().subscribe((data) =>{
      this.subgenres = data;
    });
  }

  findSubgenre(name: string): void {
    this.errorStatus = false; // Restablece el estado de error

    if (name.trim() === '') {
      this.getSubgenres(); // Si el campo de búsqueda está vacío, muestra todao el registro
    } else {
      this.subgenreService.findSubgenre(name).subscribe(
        (data: Subgenre[]) => {
          if (data.length > 0) {
            this.subgenres = data; // Actualiza los resultados de búsqueda
          } else {
            this.errorStatus = true;
            this.errorMsj = 'No se encontraron resultados para "' + name + '"';
          }
        },
        (error) => {
          console.error('Error al buscar el subgénero ', name, ': ', error);
        }
      );
    }
  }
}
