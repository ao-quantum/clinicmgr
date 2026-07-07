import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Get first context item listed in the array which has `isPublic` marked true
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(), // Specific handler/route function
            context.getClass(), // Controller itself
        ]);

        // Allow request to proceed as usual, otherwise send it thru the passport auth guard pipeline to check auth
        return isPublic ? true : super.canActivate(context);
    }
}
