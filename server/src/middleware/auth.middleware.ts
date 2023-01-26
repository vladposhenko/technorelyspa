import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {NextFunction} from "express";

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction): any {
        if(req.method === 'OPTIONS') {
            next()
        }
        try {
            console.log(req.headers)
            const token = req.headers['authorization'].split(' ')[1]
            // if(!token) {
            //     return new UnauthorizedException({message: 'Пользователь не авторизован'})
            // }

        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }

    }

}