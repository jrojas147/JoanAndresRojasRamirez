import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '@services/product-services/product-services';
import {
  AccountsListModel,
  AccountsModel,
} from 'src/app/models/accounts.model';
import { ToastService } from '@components/toast/toast.service';
import { ToastType } from '@components/toast/toast.model';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
})
export class PageRegistryComponent implements OnInit {
  public idAccount: string | null;
  public listAccounts: AccountsModel[] = [];
  public account?: AccountsModel;
  public formAccounts: FormGroup = new FormGroup({});
  public existAccount: boolean = false;
  public loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bankService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    this.idAccount = this.activatedRoute.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    console.log('Entra');
    
    this.formAccounts = this.fb.group(this.createControls());

    this.formAccounts.controls['id'].valueChanges.subscribe(
      (selectedValue: string) => {
        console.log(selectedValue);
        console.log(this.formAccounts);
        this.checkIdAccount(selectedValue);
      }
    );

    if (this.idAccount) {
      this.bankService
        .getAccountsById(this.idAccount)
        ?.subscribe((response: any) => {
          this.account = response;

          this.setControlValues(this.account);
        });
    }

    console.log(this.formAccounts);
  }

  public createControls() {
    const groupControl: any = {};

    groupControl['id'] = [
      {
        value: null,
        disabled: this.idAccount,
      },
      Validators.required,
    ];
    groupControl['name'] = [null, Validators.required];
    groupControl['description'] = [null, [Validators.minLength(6), Validators.required]];
    groupControl['logo'] = [null];
    groupControl['date_release'] = [null, Validators.required];
    groupControl['date_revision'] = [
      {
        value: moment().format('YYYY-MM-DD'),
        disabled: true,
      },
      Validators.required,
    ];

    return groupControl;
  }

  setControlValues(account: any) {
    Object.keys(this.formAccounts?.controls).forEach((key) => {
      this.formAccounts?.controls[key].setValue(account[key]);
    });
  }

  checkIdAccount(idAccount: string) {
    this.bankService.verifyAccount(idAccount)?.subscribe((response: boolean) => {
      this.existAccount = response;
    });
  }

  saveRegistry() {
    const dataForm = this.formAccounts.getRawValue();

    if (this.idAccount) {
      this.bankService.putAccounts(dataForm)?.subscribe((response: AccountsListModel) => {
        this.listAccounts = response.data;
        this.toastService.show('Actualizado', response.message || '');

        setTimeout(() => {
          this.backUrl();  
        }, 1000);
        
      });
    } else {
      this.bankService.postAccounts(dataForm)?.subscribe((response: AccountsListModel) => {
        this.listAccounts = response.data;

        this.toastService.show('Exitoso', response.message || '');

        setTimeout(() => {
          this.backUrl();  
        }, 1000);
      });
    }
  }

  clearValues() {
    Object.keys(this.formAccounts?.controls).forEach((key) => {
      if (!(key === 'id' || key === 'date_revision')) {
        this.formAccounts?.controls[key].reset();
      }
    });
  }

  backUrl() {
    this.router.navigateByUrl('/');
  }
}