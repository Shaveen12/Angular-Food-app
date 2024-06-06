import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../http_status";

export default (req: any, res: any, next: any) => {
    //console.log(req.body);
    const token = req.headers['access_token'] as string;
    if (!token) {
        return res.status(HTTP_UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        //console.log(decodedUser)
        req.user = decodedUser;
    } catch (error) {
        return res.status(HTTP_UNAUTHORIZED).json({ error: 'Unauthorized from mid' });
    }

    next();
};
