import { DataSource } from "typeorm"
import {User} from "./users/user.entity";

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'stonkofus',
    password: 'password',
    database: 'postgres',
    entities: [
        User
    ],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource
