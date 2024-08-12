import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnsTable } from '@components/table/table.model';
import { ToastService } from '@components/toast/toast.service';
import { ProductService } from '@services/product-services/product-services';
import {
  AccountsListModel,
  AccountsModel,
} from 'src/app/models/accounts.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class PageHomeComponent implements OnInit {
  public listAccounts: AccountsModel[] = [];
  public filterCharacters: string;
  public loading = true;
  public columns: ColumnsTable[] = [
    {
      label: 'logo',
      title: 'Logo',
    },
    {
      label: 'name',
      title: 'Nombre del producto',
    },
    {
      label: 'description',
      title: 'Descripción',
    },
    {
      label: 'date_release',
      title: 'Fecha de liberación',
    },
    {
      label: 'date_revision',
      title: 'Fecha de reestrucutación',
    },
  ];

  constructor(
    private bankService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    console.log('Entra');
    this.loadList();
  }

  loadList() {
    this.bankService.getAccounts()?.subscribe((response: AccountsListModel) => {
      this.listAccounts = response.data;
      
      setTimeout(() => {
        this.loading = false;  
      }, 1000);
    });
  }

  public emitTable(event: any) {
    if (event.action === 'add') {
      this.router.navigateByUrl('/registry');
    }

    if (event.action === 'edit') {
      this.router.navigateByUrl('/registry/' + event.data.id);
    }

    if (event.action === 'delete') {
      this.bankService
        .deleteAccounts(event.data)
        ?.subscribe((response: AccountsListModel) => {
          this.toastService.show('Exitoso', response.message || '');

          this.loadList();
        });
    }
  }
}
