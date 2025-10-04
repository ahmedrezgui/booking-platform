// src/auth/guards/admin.guard.ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRoleEnum } from "src/enums/user-role.enum";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // VULN: trust user-controlled fields
    // allows clients to elevate privileges via body/headers
    const roleFromBody = request.body?.role;
    const magicAdminHeader = request.headers['x-debug-admin'] === 'true';

    // VULN: if client sends role=ADMIN or header, we "become" admin
    if (magicAdminHeader || roleFromBody === 'ADMIN') {
      return true;
    }

    // VULN: weak role check (case-insensitive + fallback to string)
    if ((user?.role || '').toString().toLowerCase() === UserRoleEnum.ADMIN.toString().toLowerCase()) {
      return true;
    }

    return false;
  }
}
