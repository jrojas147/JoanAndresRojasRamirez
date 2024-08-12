import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { AccountsModel } from 'src/app/models/accounts.model';
import { ColumnsTable } from './table.model';
import { ModalService } from '@services/modal-services/modal.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges {
  @Output() emmitAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() columns: ColumnsTable[];
  @Input() dataRow: AccountsModel[] = [];
  public filterCharacters: string | null;

  public filteredProductos: any[] = [];
  public paginatedProductos: any[] = [];
  public itemsPerPageOptions: number[] = [5, 10, 20];

  public selectedItem?: any;

  public itemsPerPage = 5;
  public currentPage = 1;
  public totalPages = 1;
  public nameSelected: string | undefined;
  public dataSelected: any;

  constructor(
    private modalService: ModalService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataRow'] && changes['dataRow'].currentValue) {
      this.filteredProductos = this.dataRow;
      this.calculateTotalPages();
    }
  }

  public calculateTotalPages() {
    this.totalPages = Math.ceil(this.dataRow.length / this.itemsPerPage);
  }

  applyFilter() {
    if (this.filterCharacters) {
      this.filteredProductos = this.dataRow.filter((item) =>
        Object.values(item).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(this.filterCharacters?.toLowerCase())
        )
      );
    } else {
      this.filteredProductos = this.dataRow;
    }
    this.currentPage = 1; // Reset to first page after filter
    this.calculateTotalPages();
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProductos.slice(start, end);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onItemsPerPageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage = +select.value;
    this.currentPage = 1; // Reset to first page
    this.calculateTotalPages();
  }

  showTooltip(item: any) {
    this.selectedItem = item;
  }

  closeTooltip() {
    this.selectedItem = undefined;
  }

  public actionBtn(action: string, data?: AccountsModel) {
    if (action === 'add' || action === 'edit') {
      this.emmitAction.emit({
        action: action,
        data: data,
      });
    }

    if (action === 'delete') {
      this.openModal(data);
    }
    // this.emmitAction.emit({
    //   action: action,
    //   data: data,
    // });
  }

  /**
   * metodo que envia via output los datos a eliminar de la tabla
   */
  public deleteSelectedData() {
    this.emmitAction.emit({
      action: 'delete',
      data: this.dataSelected,
    });
    this.closeModal();
  }

  /**
   * Abre el modal de confirmacion de elimnar
   */
  public openModal(data?: AccountsModel): void {
    this.dataSelected = data;
    this.nameSelected = data?.name;
    this.modalService.open('modal-confirm');
  }

  /**
   * Cierra el modal para cancelar el elimiado de datos de la tabla
   */
  public closeModal(): void {
    this.modalService.close('modal-confirm');
  }
}
