import { Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/database/entities/user';
import { verifyJwt } from 'src/jwt';

@Injectable()
export class AuthenticateJwtMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const jwtToken : string = req.headers.authorization!
		if(jwtToken === null || jwtToken === undefined) {
			return res.status(401).send('No auth token')
		}

		const user : User = verifyJwt(jwtToken)

		if(user === null) {
		return res.status(403).send('Token invalid or expired')
		}

		req.user = user
		next();
	}
}
