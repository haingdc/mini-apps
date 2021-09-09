import { Component } from '@angular/core';
import { from, Observable, PartialObserver, Subscribable, Unsubscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfiniteScrollDataAdapter } from 'src/infinite-scroll-date.adapter';
import { MockDataSourceService } from './mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-load-more-adapter';

  data$:InfiniteScrollDataAdapter;


  constructor(private mockDataSource:MockDataSourceService) {

  }


  ngOnInit(){
    this.data$ = new InfiniteScrollDataAdapter(this.getSource(),4);
  }


  getSource(){
    return (offset, limit):Observable<any>=>{
      return this.mockDataSource.loadData(offset,limit).pipe(map((data:any)=>{
        return data;
      }));
    }
  }

  loadMore() {
    this.data$.loadMore();

  }

  reset() {
    this.data$.reload();
  }
}

function retrieveCompanies(pageNumber, recordToBeFetch, totalListCrmCount, milliseconds, milliseconds2, _indicator = '') {
  return from(fetch(`http://192.168.1.3:8000/get_contacts_fake_2?pageNumber=${pageNumber}&recordToBeFetch=${recordToBeFetch}&totalListCrmCount=${totalListCrmCount}&milliseconds=${milliseconds}&milliseconds2=${milliseconds2}&_indicator=${_indicator}`)
  .then(response => response.json()));
//   .then(data => console.log(data));
}

export class LoadMoreDataAdapter<T> implements Subscribable<T>{
  subscribe(observer?: PartialObserver<T>): Unsubscribable;
  subscribe(next: null, error: null, complete: () => void): Unsubscribable;
  subscribe(next: null, error: (error: any) => void, complete?: () => void): Unsubscribable;
  subscribe(next: (value: T) => void, error: null, complete: () => void): Unsubscribable;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
  subscribe(next?: any, error?: any, complete?: any): import("rxjs").Unsubscribable {
    throw new Error('Method not implemented.');
  }
}

export class Pagination {
  static readonly PAGE_NUMBER = '1';
  static readonly RECORDS_TO_BE_FETCHED = '25';
  static readonly ORDER_BY = {
    asc: 'Ascending',
    desc: 'Descending'
  };

  public pageNumber: string;
  public recordsToBeFetched: string;
  public totalPageCount: string;
  public totalRecordCount: string;
  public orderBy: string;
  public sortByField: string;
  public currentPage: number;
  public scrollTop: number = 0;

  constructor(pagination: PaginationResponseInformation = null, sortOpt?: { orderBy: string; sortByField: string}) {
    this.orderBy = sortOpt?.orderBy ?? '';
    this.sortByField = sortOpt?.sortByField ?? '';
    this.patch(pagination);
  }

  patch(pagination: PaginationResponseInformation = null): Pagination {
    this.pageNumber         = pagination?.pageNumber ?? Pagination.PAGE_NUMBER;
    this.currentPage        = Number(pagination?.pageNumber ?? 0);
    this.recordsToBeFetched = pagination?.recordsToBeFetched ?? Pagination.RECORDS_TO_BE_FETCHED;
    this.totalPageCount     = pagination?.totalPageCount ?? '';
    this.totalRecordCount   = pagination?.totalRecordCount ?? '';
    return this;
  }

  getPagination(nextPage: boolean = false): PaginationRequestInformation {
    return {
      orderBy: this.orderBy,
      pageNumber: String(nextPage ? this.currentPage + 1 : this.pageNumber),
      recordsToBeFetched: this.recordsToBeFetched,
      sortByField: this.sortByField,
    };
  }

  static getPaginationDefault(): PaginationRequestInformation {
    return {
      orderBy: '',
      pageNumber: Pagination.PAGE_NUMBER,
      recordsToBeFetched: Pagination.RECORDS_TO_BE_FETCHED,
      sortByField: ''
    };
  }

  // Treat pagination like immutability. Creating new instance for each update
  setPagination(pagination: {
    pageNumber?        : string;
    recordsToBeFetched?: string;
    totalPageCount?    : string;
    totalRecordCount?  : string;
    orderBy?           : string;
    sortByField?       : string;
    currentPage?       : number;
    scrollTop?         : number;
  }): Pagination {
    return Object.assign(new Pagination(), this, pagination);
  }

  /**
   * Return whether there is more pages
   */
  public hasMorePage(): boolean {
    const totalPageCount = Number(this.totalPageCount);
    return this.currentPage < totalPageCount;
  }
}

export interface PaginationRequestInformation {
  orderBy           : string;
  pageNumber        : string;  // there is not offset here. if there is offset, then an offset value can look like 0, 25, 50, 75,..
  recordsToBeFetched: string;  // limit or recordsToBeFetched are one
  sortByField       : string;
}

export interface PaginationResponseInformation {
  pageNumber: string;
  recordsToBeFetched: string;
  totalPageCount: string;
  totalRecordCount: string;
}

export enum OrderBy {
  Ascending  = 'ascending',
  Descending = 'descending',
  Empty      = '',
}