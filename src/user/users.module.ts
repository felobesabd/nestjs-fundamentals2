import { Injectable, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { userHabits } from "./users.constants";

// const MockUsersService = {
//   findUsers() {
//     return ['user1', "user2"];
//   }
// }

abstract class ConfigService {}
class DevConfigSer extends ConfigService {}
class ProdConfigSer extends ConfigService {}

@Injectable()
export class UserHabitsService {
  getHabits(){
    return ['eat', 'sleep', 'code'];
  }
}

@Injectable()
export class DatabaseConnection {
  async dbConnect(): Promise<string> {
    return `DataBase connected`;
  }
}

const userHabitsFactory = {
  provide: userHabits,
  useFactory: async (user: UserHabitsService, db: DatabaseConnection)=> {
    const connection = await db.dbConnect();
    console.log(connection);

    return user.getHabits();
  },
  inject: [UserHabitsService, DatabaseConnection]
}


@Injectable()
export class UserLoggedService {
  // logic
}

const userLoggedServiceAlias = {
  provide: 'alias',
  useExisting: UserLoggedService
}

@Module({
  controllers: [UsersController],
  providers: [
    // standard
    UsersService,
    UserHabitsService,

    // custom based provide - use factory => complex + asynchronous => async-await
    DatabaseConnection,
    userHabitsFactory,

    // custom based provide - Alias => Use Existing
    UserLoggedService,
    userLoggedServiceAlias
  ],

  /////////////// export custom provider
  // exports: [userHabits] // export custom provider by token
  // exports: [userHabitsFactory]
})

export class UsersModule {}
//////////// custom provider Use Value
// {
//   provide: UsersService,
//   useValue: MockUsersService
// }
// {
//   provide: 'APP_NAME',
//   useValue: 'FELO_APP'
// }

//////////// custom provider Use Class
// {
//   provide: ConfigService,
//   useClass: process.env.DEV_MODE === 'development' ? DevConfigSer : ProdConfigSer
// }

// factory based provider
////////// simple
// {
//   provide: userHabits,
//   useFactory: ()=> ['eat', 'sleep']
// }