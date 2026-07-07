import { Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';

export const Public = () => SetMetadata('isPublic', true);

@Controller()
export class AppController {
    constructor(private readonly auth: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    @Public()
    login(@Request() req) {
        return this.auth.login(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/auth/logout')
    logout(@Request() req) {
        req.logout();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@Request() req) {
        return req.user || '';
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getHello(@Request() req): string {
        return `Hello ${req.user.email}`;
    }
}
