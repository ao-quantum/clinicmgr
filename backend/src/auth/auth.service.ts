import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from '../generated/prisma/client';
import { JwtService } from '@nestjs/jwt';

export interface PayloadBody {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private jwt: JwtService,
    ) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<Omit<User, 'password'> | null> {
        // Find user
        const user = await this.users.get({ email });

        if (!user) return null;

        // Validate password

        const passwordValid = await compare(password, user.password);

        if (passwordValid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...data } = user;
            return data;
        }

        return null;
    }

    login(user: any) {
        const payload: PayloadBody = {
            email: user.email,
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
        };

        console.log(process.env.JWT_SECRET);

        return {
            access_token: this.jwt.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }
}
