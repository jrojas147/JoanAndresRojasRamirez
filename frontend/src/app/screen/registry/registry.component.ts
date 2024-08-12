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


/**
 * Permite registrar o editar informacion de productos.
 */
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
    this.formAccounts = this.fb.group(this.createControls());
    this.formAccounts.controls['id'].valueChanges.subscribe(
      (selectedValue: string) => {
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
  }

  /**
   * Perimite creacion de formulario
   * @returns valor formulario
   */
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

  /**
   * permite asignar valores a formulario
   * @param account valores de formulario a editar
   */
  setControlValues(account: any) {
    Object.keys(this.formAccounts?.controls).forEach((key) => {
      this.formAccounts?.controls[key].setValue(account[key]);
    });
  }

  /**
   * Permite realizar validaicon si existe producto mediante peticion http
   * @param idAccount idProducto
   */
  public checkIdAccount(idAccount: string):void {
    this.bankService.verifyAccount(idAccount)?.subscribe((response: boolean) => {
      this.existAccount = response;
    });
  }

  /**
   * Permite guardar la informacion de producto, desde la carga de componente se identifica tenemos un param id
   * de ser asi se considera como una edicion, de caso contrario seria adicionar nuevo producto
   * para cada caso de tiene un itervalo de tiempo para visualizar confirmacion de consumo de servicio
   */
  public saveRegistry(): void {
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

  /**
   * Permite limipar valores del formulario
   */
  public clearValues(): void {
    Object.keys(this.formAccounts?.controls).forEach((key) => {
      if (!(key === 'id' || key === 'date_revision')) {
        this.formAccounts?.controls[key].reset();
      }
    });
  }

  /**
   * Permite retornar url prinicipal, pantalla de productos activos
   */
  public backUrl():void {
    this.router.navigateByUrl('/');
  }
}