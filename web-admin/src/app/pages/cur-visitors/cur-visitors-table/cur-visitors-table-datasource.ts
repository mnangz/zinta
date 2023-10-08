import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface CurVisitorsTableItem {
  first_name: string;
  last_name: string;
  email: string;
  id_number: string;
  person_visited: string;
  mobile: string;
  visitor_seen: boolean;
  createdAt: Date;
}


/**
 * Data source for the CurVisitorsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CurVisitorsTableDataSource extends DataSource<CurVisitorsTableItem> {
  data: CurVisitorsTableItem[];
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
  connect(): Observable<CurVisitorsTableItem[]> {
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
  private getPagedData(data: CurVisitorsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CurVisitorsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'first_name': return compare(+a.first_name, +b.first_name, isAsc);
        case 'last_name': return compare(+a.last_name, +b.last_name, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'id_number': return compare(+a.id_number, +b.id_number, isAsc);
        case 'person_visited': return compare(+a.person_visited, +b.person_visited, isAsc);
        case 'mobile': return compare(+a.mobile, +b.mobile, isAsc);
        case 'visitor_seen': return compare(+a.visitor_seen, +b.visitor_seen, isAsc);
        case 'createdAt': return compare(+a.createdAt, +b.createdAt, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
