import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { AccountsModel } from 'src/app/models/accounts.model';
import { ColumnsTable } from './table.model';
import { SimpleChanges } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [FormsModule], // Import FormsModule for ngModel
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No existen registros" if dataRow is empty', () => {
    component.dataRow = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-data')).toBeTruthy();
  });

  it('should call applyFilter on ngModelChange event', () => {
    spyOn(component, 'applyFilter');
    const input = fixture.nativeElement.querySelector(
      '#filterCharacters'
    ) as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('ngModelChange'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

  it('should correctly filter items based on filterCharacters', () => {
    component.dataRow = [
      {
        id: '1',
        name: 'Test',
        logo: '1',
        description: 'Test description',
        date_release: new Date('2024-08-01'),
        date_revision: new Date('2024-08-01'),
      },
      {
        id: '2',
        name: 'Test 2',
        logo: '2',
        description: 'Test description',
        date_release: new Date('2024-08-12'),
        date_revision: new Date('2024-08-12'),
      },
    ] as AccountsModel[];
    component.filterCharacters = 'Test1';
    component.applyFilter();
    expect(component.filteredProductos.length).toBe(0);
  });

  it('should correctly filter items based on filterCharacters else condition', () => {
    component.dataRow = [
      {
        id: '1',
        name: 'Test',
        logo: '1',
        description: 'Test description',
        date_release: new Date('2024-08-01'),
        date_revision: new Date('2024-08-01'),
      },
      {
        id: '2',
        name: 'Test 2',
        logo: '2',
        description: 'Test description',
        date_release: new Date('2024-08-12'),
        date_revision: new Date('2024-08-12'),
      },
    ] as AccountsModel[];
    component.filterCharacters = null;
    component.applyFilter();
    expect(component.filteredProductos.length).toBe(2);
  });

  it('should paginate items correctly', () => {
    component.dataRow = Array.from({ length: 25 }, (_, i) => ({
      id: '1',
      name: `Item${i}`,
      logo: '2',
      description: `Desc${i}`,
      date_release: new Date('2024-08-12'),
      date_revision: new Date('2024-08-12'),
    })) as AccountsModel[];
    component.itemsPerPage = 5;
    component.currentPage = 1;
    fixture.detectChanges();
    expect(component.paginatedItems.length).toBe(0);
  });

  it('should go to the next page on nextPage method call', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should go to the previous page on previousPage method call', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should emit action when actionBtn is called', () => {
    spyOn(component.emmitAction, 'emit');
    const row = { name: 'Test', description: 'Desc' } as AccountsModel;
    component.actionBtn('edit', row);
    expect(component.emmitAction.emit).toHaveBeenCalledWith({
      action: 'edit',
      data: row,
    });
  });

  it('should call applyFilter on ngModelChange event', () => {
    spyOn(component, 'applyFilter');
    const input = fixture.nativeElement.querySelector(
      '#filterCharacters'
    ) as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('ngModelChange'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

  it('should handle ngOnChanges correctly when dataRow changes', () => {
    const newDataRow = [
      {
        id: '1',
        name: 'Test',
        logo: '1',
        description: 'Test description',
        date_release: new Date('2024-08-01'),
        date_revision: new Date('2024-08-01'),
      },
      {
        id: '2',
        name: 'Test 2',
        logo: '2',
        description: 'Test description',
        date_release: new Date('2024-08-12'),
        date_revision: new Date('2024-08-12'),
      },
    ] as AccountsModel[];

    component.dataRow = newDataRow;

    const changes: SimpleChanges = {
      dataRow: {
        currentValue: newDataRow,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      } as any,
    };

    spyOn(component, 'calculateTotalPages');

    component.ngOnChanges(changes);

    expect(component.filteredProductos).toEqual(newDataRow);

    expect(component.calculateTotalPages).toHaveBeenCalled();
  });

  it('should call method showTooltip', () => {
    const item = 
      {
        id: '1',
        name: 'Test',
        logo: '1',
        description: 'Test description',
        date_release: new Date('2024-08-01'),
        date_revision: new Date('2024-08-01'),
      } as AccountsModel;

    component.showTooltip(item);

    expect(component.selectedItem).toEqual(item);
  });

  it('should call method closeTooltip', () => {
    component.closeTooltip();

    expect(component.selectedItem).toEqual(undefined);
  });
});
