import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { SaleL } from 'src/app/clases/sales/sale/sale-l';
import { SaleDetailsL } from 'src/app/clases/sales/saleDetails/sale-details-l';
import { SalesService } from 'src/app/services/api-sales/sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-details-report',
  templateUrl: './sale-details-report.component.html',
  styleUrls: ['./sale-details-report.component.css']
})
export class SaleDetailsReportComponent implements OnInit {

  saleDetails: SaleDetailsL[];
  dataSource: MatTableDataSource<SaleDetailsL>;
  sale: SaleL;
  id: number;



  constructor(private saleService: SalesService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getDetails();
    this.getSale();

  }

  getDetails(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.saleService.findDetails(id).subscribe((data: SaleDetailsL[]) => {
          this.saleDetails = data;
          this.dataSource = new MatTableDataSource<SaleDetailsL>(this.saleDetails)
        }, (error) => {
          console.log(error)
        })
      }
    })
  }

  getSale(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.saleService.findSale(id).subscribe((data) => {
          return this.sale = data;
        })
      }
    })
  }

  exportExcel(): void {
    const filteredCustomers = this.saleDetails.map(s => ({
      saleDetails_id:s.saleDetails_id,
      saleDetails_quantity: s.saleDetails_quantity,
      saleDetails_unit_price: s.saleDetails_unit_price,
      saleDetails_subtotal:s.saleDetails_subtotal,
      book: s.book
    }));

    // Crear una nueva hoja de trabajo y agregar la fecha en la primera fila
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['Fecha de reporte:', new Date().toLocaleDateString()]]);
    
    XLSX.utils.sheet_add_json(ws, filteredCustomers, { origin: 'A3', skipHeader: false });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DetalleVenta');
    XLSX.writeFile(wb, 'reporte_dventas.xlsx');
  }

  exportPdf(): void {
    const doc = new jsPDF();
    const col = ["NºProducto", "Producto", "Cantidad", "Precio", "Subtotal"];
    const rows: any[][] = [];

    this.saleDetails.forEach(s => {
      const temp = [
        s.saleDetails_id,
        s.book,
        s.saleDetails_quantity,
        s.saleDetails_unit_price,
        s.saleDetails_subtotal
      ];
      rows.push(temp);
    });

    const currentDate = new Date().toLocaleDateString();
    doc.text('Reporte de Detalle de Venta', 75, 16);
    doc.text(`Fecha de reporte: ${currentDate}`, 75, 23);
    autoTable(doc, { head: [col], body: rows, startY: 30 });
    doc.save('reporte_dventas.pdf');
  }






}
