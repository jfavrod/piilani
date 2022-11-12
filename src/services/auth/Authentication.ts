import jwt from 'jsonwebtoken';
import { ITableDataGateway } from '../../gateways';
import { ICredentials } from './ICredentials';

export class Authentication {
  private static _exp: number;
  private static _gateway: ITableDataGateway<ICredentials>;
  private static _privateKey: string;

  public static configure(config: {
    exp?: number,
    gateway: ITableDataGateway<ICredentials>,
    privateKey: string,
  }) {
    Authentication._exp = config.exp || 0;
    Authentication._gateway = config.gateway;
    Authentication._privateKey = config.privateKey;
  }

  public static validate = async (credentials: ICredentials): Promise<string | undefined> => {
    const res = await Authentication._gateway.find(credentials);
    let token: string | undefined;

    if (res.class === 1 && res.data) {
      const user = res.data[0];
      (user.password as unknown) = undefined;
      token = jwt.sign(user, Authentication._privateKey);
    }

    return token;
  };

  public static verify = (token: string): string | undefined => {
    let username: string | undefined;

    if (jwt.verify(token, Authentication._privateKey)) {
      const decoded = jwt.decode(token) as Pick<ICredentials, 'username'>;
      username = decoded.username;
    }

    return username;
  };
}
