import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { ApiSubgenreService } from 'src/app/services/api-subgenre/api-subgenre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subgenre-form',
  templateUrl: './subgenre-form.component.html',
  styleUrls: ['./subgenre-form.component.css']
})
export class SubgenreFormComponent implements OnInit{

  subgenreForm: FormGroup;
  isNewSubgenre: boolean = true;
  subgenreId: number;

  constructor(
    private subgenreService: ApiSubgenreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
      this.loadSubgenres();
  }

  initForm(): void {
    this.subgenreForm = this.formBuilder.group({
      subgenre_name: ['', Validators.required]
    });
  }

  loadSubgenres(): void{
    this.activatedRoute.params.subscribe((params) =>{
      const id = +params['id'];

      if(id){
        this.isNewSubgenre = false;
        this.subgenreId = id;
        this.subgenreService.findSubgenreId(id).subscribe(
          (data) => {
            this.subgenreForm.patchValue({
              subgenre_name: data.subgenre_name
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  public saveSubgenre(): void {
    if (this.subgenreForm.valid) {
      const subgenreData = this.subgenreForm.value;
      const subgenre: Subgenre = {
        subgenre_id: this.subgenreId,
        subgenre_name: subgenreData.subgenre_name
      };

      if (this.isNewSubgenre) {
        this.subgenreService.createSubgenre(subgenre).subscribe(
          () => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-subgeneros']);
            Swal.fire('Éxito!', 'Subgénero creado correctamente', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.subgenreService.updateSubgenre(subgenre,).subscribe(
          () => {
            this.router.navigate(['/mundo-literario/admin/mantenimiento-subgeneros']);
            Swal.fire('Éxito!', 'Subgénero actualizado correctamente', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } 
  }
}
