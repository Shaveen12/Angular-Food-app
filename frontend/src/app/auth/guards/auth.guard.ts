import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { query } from 'express';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.currentUser().token){
    return true;
  }
  router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  return false;
};
