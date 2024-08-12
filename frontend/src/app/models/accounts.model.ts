export interface AccountsModel {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface AccountsListModel {
  data: AccountsModel[];
  message?: string;
}
