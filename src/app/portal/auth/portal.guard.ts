import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PortalService } from '../services/portal.service';

@Injectable({
  providedIn: 'root'
})
export class PortalGuard implements CanLoad {
  constructor(private portalService: PortalService, private router: Router) { }
  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('dcAdmin') == null || !this.portalService._adminIsAuthenticated) {
      this.router.navigateByUrl('/access')
    }
    else {
      return this.portalService._adminIsAuthenticated;
    }

  }
}
