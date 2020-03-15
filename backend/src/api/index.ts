import {Router} from 'express';
import users from './user/user.route';

const router: Router = Router();

router.use('/users', users);

export default router;
