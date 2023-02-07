import {
    Injectable,
    NestMiddleware,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BodyParserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const buffers = [];

            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = JSON.parse(Buffer.concat(buffers).toString());
            req.body = data;
            next();
        } catch (error) {
            throw new BadRequestException('Wrong data type');
        }
    }
}