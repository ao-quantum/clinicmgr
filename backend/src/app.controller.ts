import { Controller, Get, Req, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Session() ses: Record<string, any>): string {
        return `Hello ${ses.email}`;
    }
}
