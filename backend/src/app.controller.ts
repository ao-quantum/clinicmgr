import {
    Controller,
    Get,
    Post,
    Req,
    Request,
    Session,
    UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/auth/login')
    login(@Request() req) {
        return req.user;
    }

    @Get()
    getHello(@Session() ses: Record<string, any>): string {
        return `Hello ${ses.email}`;
    }
}
