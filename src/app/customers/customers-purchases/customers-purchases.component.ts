import { Component, OnInit } from '@angular/core';
import { SaleL } from 'src/app/clases/sales/sale/sale-l';
import { SalesService } from 'src/app/services/api-sales/sales.service';

@Component({
  selector: 'app-customers-purchases',
  templateUrl: './customers-purchases.component.html',
  styleUrls: ['./customers-purchases.component.css']
})
export class CustomersPurchasesComponent implements OnInit {

  customerId: number;
  sales:SaleL[];

  constructor(private saleService:SalesService){}

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('idCustomer'));
    this.getSales();
  }

  getSales(){
    this.saleService.findSaleCustomer(this.customerId).subscribe((data) =>{
      this.sales = data;
    });
  }

}
