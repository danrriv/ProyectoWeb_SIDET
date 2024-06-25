import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SaleL } from 'src/app/clases/sales/sale/sale-l';
import { SalesService } from 'src/app/services/api-sales/sales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-sale',
  templateUrl: './confirm-sale.component.html',
  styleUrls: ['./confirm-sale.component.css']
})
export class ConfirmSaleComponent implements OnInit {

  sales: SaleL[];
  dataSource: MatTableDataSource<SaleL>;
  search: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private salesService:SalesService){
  }

  ngOnInit(): void{
    this.getSales();
  }

  getSales(){
    this.salesService.listPending().subscribe((data) =>{
      this.sales = data;
      this.dataSource = new MatTableDataSource<SaleL>(this.sales);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase(); // Aplica el filtro
  }

  confirmSale(id: number): void {
    Swal.fire({
      title: 'Confirmar venta',
      text: "Verifica que la venta entregada es correcta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salesService.confirmSale(id).subscribe(
          (venta) => {
            Swal.fire(
              'Venta confirmada!',
              'La venta ha sido entregada.',
              'success'
            );
            this.getSales();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

}
