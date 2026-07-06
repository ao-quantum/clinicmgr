import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from '../generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(private users: UsersService) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<Omit<User, 'password'> | null> {
        console.log(process.env.DATABASE_URL);
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
}
