import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiCustomersService } from 'src/app/services/api-customers/api-customers.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Customer } from 'src/app/clases/customer/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: Customer[] = [];
  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['customer_id','customer_dni', 'customer_surnames', 'customer_names', 'customer_phone_number', 'customer_email'];
  searchInput:string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerService: ApiCustomersService){}

  ngOnInit():void{
    this.loadUsers();
  }

  loadUsers(): void {
    this.customerService.getCustomers().subscribe(
      (response: Customer[]) => {
        this.customers = response;
        this.dataSource = new MatTableDataSource<Customer>(this.customers);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchInput.trim().toLowerCase(); // Aplica el filtro
  }

    exportExcel(): void {
    const filteredCustomers = this.customers.map(customer => ({
      customer_id: customer.customer_id,
      customer_dni: customer.customer_dni,
      customer_surnames: customer.customer_surnames,
      customer_names: customer.customer_names,
      customer_phone_number: customer.customer_phone_number,
      customer_email: customer.customer_email
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredCustomers);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    XLSX.writeFile(wb, 'reporte_clientes.xlsx');
  }

  exportPdf(): void {
    const doc = new jsPDF();
    const col = ["ID", "DNI", "Apellidos", "Nombres", "Teléfono", "Email"];
    const rows: any[][] = [];

    this.customers.forEach(customer => {
      const temp = [
        customer.customer_id, 
        customer.customer_dni, 
        customer.customer_surnames, 
        customer.customer_names, 
        customer.customer_phone_number, 
        customer.customer_email
      ];
      rows.push(temp);
    });

    doc.text('Reporte de Clientes', 75, 16);
    autoTable(doc, { head: [col], body: rows, startY: 20 });
    doc.save('reporte_clientes.pdf');
  }
}
