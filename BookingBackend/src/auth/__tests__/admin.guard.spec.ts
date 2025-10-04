import { AdminGuard } from '../guards/admin.guard';
import { ExecutionContext } from '@nestjs/common';

const mockCtx = (user: any, body: any = {}, headers: any = {}) =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ user, body, headers }),
    }),
  } as unknown as ExecutionContext);

describe('AdminGuard', () => {
  it('allows when header sets debug admin (vuln path)', () => {
    const g = new AdminGuard();
    const can = g.canActivate(mockCtx({ role: 'USER' }, {}, { 'x-debug-admin': 'true' }));
    expect(can).toBe(true);
  });

  it('denies when user is not admin and no magic', () => {
    const g = new AdminGuard();
    const can = g.canActivate(mockCtx({ role: 'USER' }));
    expect(can).toBe(false);
  });
});
