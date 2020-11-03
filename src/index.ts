import './utils/loadEnv';
import userService from 'src/services/user';
import authService from 'src/services/auth';

// could easily be separate processes:
userService.listen(process.env.USER_SERVICE_PORT || 3001);
authService.listen(process.env.AUTH_SERVICE_PORT || 3002);
