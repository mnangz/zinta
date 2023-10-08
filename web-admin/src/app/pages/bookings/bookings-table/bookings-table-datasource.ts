import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface BookingsTableItem {
  _id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  company_name: string;
  address: string;
  id_number: string;
  vehicle_reg: string;
  purpose_of_visit: string;
  person_visited: string;
  visit_date: Date;
  booking_ref_no: string;
}


/**
 * Data source for the BookingsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BookingsTableDataSource extends DataSource<BookingsTableItem> {
  data: BookingsTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BookingsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BookingsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BookingsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'first_name': return compare(+a.first_name, +b.first_name, isAsc);
        case 'last_name': return compare(+a.last_name, +b.last_name, isAsc);
        case 'mobile': return compare(+a.mobile, +b.mobile, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'company_name': return compare(+a.company_name, +b.company_name, isAsc);
        case 'address': return compare(+a.address, +b.address, isAsc);
        case 'id_number': return compare(+a.id_number, +b.id_number, isAsc);
        case 'vehicle_reg': return compare(+a.vehicle_reg, +b.vehicle_reg, isAsc);
        case 'purpose_of_visit': return compare(+a.purpose_of_visit, +b.purpose_of_visit, isAsc);
        case 'person_visited': return compare(+a.person_visited, +b.person_visited, isAsc);
        case 'visit_date': return compare(+a.visit_date, +b.visit_date, isAsc);
        case 'booking_ref_no': return compare(+a.booking_ref_no, +b.booking_ref_no, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
