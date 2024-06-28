import { BaseLkPublicApi } from './BaseApi'

export interface User {
    id: number;
    body: string;
    title: string;
    url: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
  }

export class UserApi extends BaseLkPublicApi<User> {
    protected readonly endpoint: string = '/clients';
    protected readonly hasFinishSlash = false;
  
    constructor() {
      super();
    }
  
    public getUsers() {
      return this.getAll({});
    }
  
    public getUserById(userId: number) {
      return this.getOne(userId);
    }
  
    public createUser(userData) {
      return this.create(userData);
    }
  }


//   class UserApi extends BaseLkPublicApi<User> {
//     protected readonly endpoint: string = '/users';
  
//     constructor() {
//       super();
//     }
  
//     public getUsers(): Promise<User[]> {
//       return this.getAll<UserParams, UserCollection>({});
//     }
  
//     public getUserById(userId: number): Promise<User> {
//       return this.getOne<UserParams, User>(userId);
//     }
  
//     public createUser(userData: UserData): Promise<User> {
//       return this.create<UserData, User>(userData);
//     }
//   }

  
//   const userApi = new UserApi();

// userApi.getUsers().then((users) => {
//   console.log(users);
// });

// userApi.getUserById(1).then((user) => {
//   console.log(user);
// });

// userApi.createUser({ name: 'John Doe', email: 'john.doe@example.com' }).then((newUser) => {
//   console.log(newUser);
// });
