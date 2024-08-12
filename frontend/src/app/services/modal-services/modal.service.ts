import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  /**
   * Atributo que guarda los modales 
   */
  public modals: any[] = [];

  /**
   * Agrega el un array los modales que solicita el componente
   * @param modal modal
   */
  add(modal: any) {
    this.modals.push(modal);
  }

  /**
   * Remueve en el array los modales que solicita el componente
   * @param id id de modal
   */
  remove(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  /**
   * Busca en el array los modales que solicita el componente para luego
   * abrir el que solicito
   * @param id id modal
   */
  open(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  /**
   * Busca en el array los modales que solicita el componente para luego
   * cerrar el que solicito
   * @param id id modal
   */
  close(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
