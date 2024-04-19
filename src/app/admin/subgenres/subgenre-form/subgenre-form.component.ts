import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { ApiSubgenreService } from 'src/app/services/api-subgenre/api-subgenre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subgenre-form',
  templateUrl: './subgenre-form.component.html',
  styleUrls: ['./subgenre-form.component.css']
})
export class SubgenreFormComponent {
  public subgenre: Subgenre = new Subgenre();
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(
    private subgenreService: ApiSubgenreService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
      this.loadSubgenres();
  }

  loadSubgenres(): void{
    this.activatedRoute.params.subscribe((params) =>{
      const id = +params['id'];

      if(id){
        this.subgenreService.findSubgenreId(id).subscribe(
          (data) => {
            this.subgenre = data;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  validarCampos(): boolean {
    if (!this.subgenre.subgenre_name) return false;
    return true;
  }

  public createSubgenre(): void {
    if(this.validarCampos()) {
      this.subgenreService.createSubgenre(this.subgenre)
      .subscribe(
        (subgenre) => {
          this.router.navigate(['/mundo-literario/admin/mantenimiento-subgeneros']);
          Swal.fire(
            'Éxito!',
            'Subgénero creado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Complete todos los campos.'
    });
  }

  public updateSubgenre(): void {
    if(this.validarCampos()) {
      console.log("id subgenre:" + this.subgenre.subgenre_id)
    this.subgenreService.updateSubgenre(this.subgenre)
      .subscribe(
        (subgenre) => {
          this.router.navigate(['/mundo-literario/admin/mantenimiento-subgeneros']);
          Swal.fire(
            'Éxito!',
            'Subgénero actualizado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Complete todos los campos.'
    });
  }
}
