import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { SaleL } from 'src/app/clases/sales/sale/sale-l';
import { SalesService } from 'src/app/services/api-sales/sales.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent  {


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
    this.salesService.listAllSales().subscribe((data) =>{
      this.sales = data;
      this.dataSource = new MatTableDataSource<SaleL>(this.sales);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase(); // Aplica el filtro
  }

  exportExcel():void{
    const filteredCustomers = this.sales.map(s => ({
      sale_id:s.sale_id,
      sale_total: s.sale_total,
      sale_total_products: s.sale_total_products,
      sale_date: s.sale_date,
      sale_status: s.sale_status,
      customer: s.customer
    }));

     // Crear una nueva hoja de trabajo y agregar la fecha en la primera fila
     const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['Fecha de reporte:', new Date().toLocaleDateString()]]);
    
     // Agregar los datos de la tabla empezando desde la fila 3
     XLSX.utils.sheet_add_json(ws, filteredCustomers, { origin: 'A3', skipHeader: false });
 
     // Crear el libro de trabajo y agregar la hoja de trabajo
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    XLSX.writeFile(wb, 'reporte_ventas.xlsx');
  }

  exportPdf(): void {
    const doc = new jsPDF();
  
    var col = ["ID", "Total S/.", "NºLibros", "Estado", "Fecha","Cliente"];
    let rows : any[][] = [];
  
    this.sales.forEach(sale => {
        let temp = [sale.sale_id, sale.sale_total, sale.sale_total_products, sale.sale_status, sale.sale_date,sale.customer];
        rows.push(temp);
    });
  
    const currentDate = new Date().toLocaleDateString();
    doc.text('Reporte de Ventas', 75, 16);
    doc.text(`Fecha de reporte: ${currentDate}`, 75, 23);
    autoTable(doc, {head: [col], body: rows, startY: 30 }); 
  
    doc.save('reporte_Ventas.pdf');
  }
}
