import { Router } from "express"

import { ensureAuthenticate } from "./middleware/ensureAuthenticated"

import { CreateUserController } from "./controllers/create-user"
import { GetTransactionsController } from "./controllers/get-transactions"
import { CreateTransactionController } from "./controllers/create-transaction"
import { LoginUserController } from "./controllers/login-user"
import { GetUserController } from "./controllers/get-user"

const routes = Router()

routes.post("/signup", new CreateUserController().handle)
routes.post("/transactions", ensureAuthenticate, new CreateTransactionController().handle)

routes.get("/transactions", ensureAuthenticate, new GetTransactionsController().handle)
routes.post("/login", new LoginUserController().handle)
routes.get("/users", ensureAuthenticate, new GetUserController().handle)

export { routes }
