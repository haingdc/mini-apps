import { Component } from '@angular/core';
import * as R from 'ramda';
import { random, name, phone, datatype } from 'faker';
import { BehaviorSubject, from, of, empty } from 'rxjs';
import { mergeMap, bufferTime, scan, catchError } from 'rxjs/operators';
import { approach4ObservableImproved } from './observable-improved';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angualr-app';
}

export interface BatchProcessingOptions {
  /** The amount of companies to fetch in one request. */
  batchSize?: number;
  /** The amount of companies to be queued for processing. */
  maxQueueSize?: number;
  /** The number of concurrent requests to fetch companies.  Should be higher than batchSize. */
  retrieveCompaniesConcurrency?: number;
  /** The number of concurrent requests to fetch a company's orders. */
  retrieveOrdersConcurrency?: number;
  /** The number of concurrent requests to send bulk email.  Should be lower than batchSize. */
  bulkEmailConcurrency?: number;
  /** The maximum number of emails to send in one request. */
  maxBulkEmailCount?: number;
}

export const defaultBatchProcessingOptions: BatchProcessingOptions = {
  batchSize: 5,
  maxQueueSize: 15,
  retrieveCompaniesConcurrency: 1,
  retrieveOrdersConcurrency: 5,
  bulkEmailConcurrency: 5,
  maxBulkEmailCount: 5,
};

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

  constructor(pagination: PaginationResponseInformation = null) {
    this.patch(pagination);
  }

  patch(pagination: PaginationResponseInformation = null): Pagination {
    this.pageNumber = pagination ? pagination.pageNumber : Pagination.PAGE_NUMBER;
    this.currentPage = pagination ? Number(pagination.pageNumber) : 0;
    this.recordsToBeFetched = Pagination.RECORDS_TO_BE_FETCHED;
    this.totalPageCount = pagination ? pagination.totalPageCount : '';
    this.totalRecordCount = pagination ? pagination.totalRecordCount : '';
    this.orderBy = '';
    this.sortByField = '';
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


export class ContactsRequest {
  pagination : PaginationRequestInformation;

  constructor(form: any = null) {
    this.pagination = R.path(['pagination'], form) || Pagination.getPaginationDefault();
  }

  getBodyFromContactsListCrm(): any {
    const body = {
      paginationRequestInformation: this.pagination,
    };
    return body;
  }

  mapStage(type): string {
    switch (type) {
      case 'prospect':
        return 'Assigned|Prospecting|Interview|Fact-finding';
      case 'non-prospect':
        return 'Closing|Sale|No Sales|Uncontactable';
      default:
        return 'Assigned|Prospecting|Interview|Fact-finding|Closing|Sale|No Sales|Uncontactable';
    }
  }

  mapActiveOpportunityIndicator(type: string) {
    switch (type) {
      case 'prospect':
        return 'Y';
      case 'non-prospect':
        return 'N';
      default:
        return '';
    }
  }
}

const USE_ANOMALIES = false;

// Enable to get random delays and order counts.
const USE_RANDOMNESS = false;

const RETRIEVE_LIST_CRM_DELAY = () =>
  USE_RANDOMNESS ? random.number({ min: 4, max: 8 }) : 6;

// retrieveCompanies() will return no data after this limit is reached.
const TOTAL_LIST_CRM_COUNT = 110;



export async function getContactsListCrm(request: ContactsRequest) {
  const pageNumber = parseInt(request.pagination.pageNumber, 10);
  const recordsToBeFetched = parseInt(request.pagination.recordsToBeFetched, 10);
  await new Promise( resolve => setTimeout(resolve, RETRIEVE_LIST_CRM_DELAY() * recordsToBeFetched) );

  if (!pageNumber) {
    return {
      opportunitySummary: [],
      paginationResponseInformation: {
        pageNumber: "0",
        recordsToBeFetched: recordsToBeFetched + "",
        totalPageCount: Math.ceil(TOTAL_LIST_CRM_COUNT / recordsToBeFetched) + "",
        totalRecordCount: 0,
      },
      systemInformation: {
        errorCode: "",
        errorMessage: "",
        timestamp: "",
        details: ""
      }
    };
  }

  if ((pageNumber - 1) * recordsToBeFetched > TOTAL_LIST_CRM_COUNT) {
    return {
      opportunitySummary: [],
      paginationResponseInformation: {
        pageNumber: pageNumber + "",
        recordsToBeFetched: recordsToBeFetched + "",
        totalPageCount: Math.ceil(TOTAL_LIST_CRM_COUNT / recordsToBeFetched) + "",
        totalRecordCount: 0,
      },
      systemInformation: {
        errorCode: "",
        errorMessage: "",
        timestamp: "",
        details: ""
      }
    };
  }
  const currentRecordCount = Math.min(TOTAL_LIST_CRM_COUNT - (pageNumber-1) * recordsToBeFetched, recordsToBeFetched);
  let previousRecordCount = 0;
  if (pageNumber === 2) {
    previousRecordCount = recordsToBeFetched;
    // more than 2
  } else {
    previousRecordCount = (pageNumber-1) * recordsToBeFetched;
  }

  const totalRecordCount = currentRecordCount + previousRecordCount;
  return {
    opportunitySummary: [...Array(Math.min(TOTAL_LIST_CRM_COUNT - (pageNumber-1) * recordsToBeFetched, recordsToBeFetched)).keys()].map(
      (i) => {
        const fullName = `${name.firstName()} ${name.middleName()} ${name.lastName()}`;
        const phoneNumber = phone.phoneNumber();
        return {};
      },
    ),
    paginationResponseInformation: {
      pageNumber: pageNumber + "",
      recordsToBeFetched: recordsToBeFetched + "",
      totalPageCount: Math.ceil(TOTAL_LIST_CRM_COUNT / recordsToBeFetched) + "",
      totalRecordCount: totalRecordCount + "",
    },
    systemInformation: {
      errorCode: "",
      errorMessage: "",
      timestamp: "",
      details: ""
    }
  };
}

const pagination = new Pagination({ pageNumber: '1', recordsToBeFetched: 250 } as any);
pagination.recordsToBeFetched = '250';
const request = new ContactsRequest({ pagination });
getContactsListCrm(request).then(mock => console.log({ mock }));

export const validateBatchProcessingOptions = (
  options: BatchProcessingOptions,
) => {
  if (options.maxQueueSize < options.batchSize) {
    console.warn(
      `Invalid options: maxQueueSize ${
        options.maxQueueSize
      } must be higher than batchSize ${options.batchSize}.`,
    );
    return;
  }
  if (options.maxBulkEmailCount > options.batchSize) {
    console.warn(
      `Invalid options: maxBulkEmailCount ${
        options.maxBulkEmailCount
      } cannot be higher than ${options.batchSize}.`,
    );
    return;
  }
};


// export const approach4ObservableImproved = async (
//   options?: BatchProcessingOptions,
// ) => {
//   options = {
//     ...defaultBatchProcessingOptions,
//     ...options,
//   };
//   validateBatchProcessingOptions(options);
//   // Start the iteration with an offset of 0.
//   const controller$ = new BehaviorSubject(0);

//   return controller$
//     .pipe(
//       /**
//        * Fetch the next batch of data (the batchSize number of records
//        *   after the current offset).
//        */
//       mergeMap(
//         curOffset => retrieveCompanies(options.batchSize, curOffset),
//         undefined,
//         options.retrieveCompaniesConcurrency,
//       ),
//       /**
//        * Flatten the array of fetched companies into individual company records.
//        * The proceeding observable operators will therefore work on the individual companies.
//        * Break the iteration if the fetched data is empty.
//        */
//       mergeMap(companies => {
//         if (companies.length === 0) {
//           controller$.complete();
//         }
//         return from(companies);
//       }),
//       // Retrieve each company's orders concurrently.
//       mergeMap(
//         async company => {
//           company.orders = await retrieveCompanyOrders(company);
//           return company;
//         },
//         undefined,
//         options.retrieveOrdersConcurrency,
//       ),
//       /**
//        * Accumulate the companies processed but don't wait until the entire
//        *   batch has been processed.  Instead accumulate (i.e. buffer) processed
//        *   companies (possibly out of order) until we reach `options.maxBulkEmailCount`
//        *  amount or the `500ms` timer elapses.
//        * When either condition is reached, continue on with the pipeline.
//        */
//       bufferTime(500, undefined, options.maxBulkEmailCount),
//       /**
//        * Don't continue processing if the timer in `bufferTime` was reached and
//        *   there are no buffered companies.
//        */
//       mergeMap(companies => {
//         return companies.length > 0 ? of(companies) : empty();
//       }),
//       /**
//        * Send the bulk emails to the companies accumulated in `bufferTime`.
//        *   Also allow multiple bulk emails to be sent concurrently.
//        */
//       mergeMap(
//         async companies => {
//           await sendBulkEmails(companies);
//           return companies;
//         },
//         undefined,
//         options.bulkEmailConcurrency,
//       ),
//       /**
//        * Accumulate the number of companies processed so far.
//        * As we process companies, the queue of companies remaining
//        *   to be processed gets smaller.  The goal here is to keep the
//        *   queue always full. Therefore, as long as the queue isn't too
//        *   large `< options.maxQueueSize`, keep advancing the `controller$`
//        *   subject to fetch more companies, thereby increasing the size
//        *   of the queue.
//        */
//       scan(
//         (acc: any, companies) => {
//           acc.totalProcessedCount += companies.length;
//           let queueSize = acc.curOffset - acc.totalProcessedCount;
//           while (queueSize + options.batchSize <= options.maxQueueSize) {
//             queueSize += options.batchSize;
//             acc.curOffset += options.batchSize;
//             controller$.next(acc.curOffset);
//           }
//           return acc;
//         },
//         {
//           curOffset: 0,
//           totalProcessedCount: 0,
//         },
//       ),
//       catchError(async err => {
//         console.log("err", err);
//         return err;
//       }),
//     )
//     .toPromise();
// };


approach4ObservableImproved().then(n => {
  console.log('end', n);
});