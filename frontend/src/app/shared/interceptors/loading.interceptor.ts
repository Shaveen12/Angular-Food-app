import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { tap } from 'rxjs/operators';

let pendingRequests = 0;
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  pendingRequests += 1;
  loadingService.showLoading();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          pendingRequests -= 1;
          if (pendingRequests === 0) {
            loadingService.hideLoading();
          }
        }
      },
      error: () => {
        pendingRequests -= 1;
        if (pendingRequests === 0) {
          loadingService.hideLoading();
        }
      }
    })
  );
};
