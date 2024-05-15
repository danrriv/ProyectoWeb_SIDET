import { Sale } from "../sale/sale";
import { SaleDetails } from "../saleDetails/sale-details";

//Clase para registrar ventas con sus detalles
export class SaleDto {
    sale:Sale;
    details:SaleDetails[];
}
