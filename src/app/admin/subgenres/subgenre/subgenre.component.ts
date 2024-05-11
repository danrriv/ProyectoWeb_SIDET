import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subgenre } from 'src/app/clases/subgenre/subgenre';
import { ApiSubgenreService } from 'src/app/services/api-subgenre/api-subgenre.service';

@Component({
  selector: 'app-subgenre',
  templateUrl: './subgenre.component.html',
  styleUrls: ['./subgenre.component.css']
})
export class SubgenreComponent {
  subgenres: Subgenre[] = [];
  searchInput:string = '';
  dataSource: MatTableDataSource<Subgenre>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private subgenreService: ApiSubgenreService){}

  ngOnInit(): void{
   this.getSubgenres();
  }

  getSubgenres(){
    this.subgenreService.getSubgenre().subscribe((data) =>{
      this.subgenres = data;
      this.dataSource = new MatTableDataSource<Subgenre>(this.subgenres);
        this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchInput.trim().toLowerCase(); // Aplica el filtro
  }
}
