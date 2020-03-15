import CONFIG from '@monorepo-boilerplate/config';
import {initialize as initializeDB} from "@monorepo-boilerplate/db";
import service from './service';

const PORT = CONFIG.PORT;

service.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  initializeDB();

  console.log(`Server is listening on ${PORT}`);
});
