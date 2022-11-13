import jwt, { Algorithm } from 'jsonwebtoken';
import { ITableDataGateway } from '../../gateways';
import { ICredentials } from './ICredentials';

export class Authentication {
  private static _algorithm?: Algorithm;
  private static _exp: number;
  private static _gateway: ITableDataGateway<ICredentials>;
  private static _publicKey: string;
  private static _privateKey: string;

  public static configure(config: {
    algorithm?: Algorithm,
    exp?: number,
    gateway: ITableDataGateway<ICredentials>,
    publicKey: string,
    privateKey: string,
  }) {
    Authentication._algorithm = config.algorithm;
    Authentication._exp = config.exp || 0;
    Authentication._gateway = config.gateway;
    Authentication._privateKey = config.privateKey;
    Authentication._publicKey = config.publicKey;
  }

  public static validate = async (credentials: ICredentials): Promise<string | undefined> => {
    const res = await Authentication._gateway.find(credentials);
    let token: string | undefined;

    if (res.class === 1 && res.data) {
      const user = res.data[0];
      (user.password as unknown) = undefined;
      token = jwt.sign(user, Authentication._privateKey, { algorithm: Authentication._algorithm});
    }

    return token;
  };

  public static verify = (token: string): string | undefined => {
    let username: string | undefined;
    const algos = Authentication._algorithm
      ? [Authentication._algorithm]
      : undefined;

    try {
      if (jwt.verify(token, Authentication._publicKey, { algorithms: algos })) {
        const decoded = jwt.decode(token) as Pick<ICredentials, 'username'>;
        username = decoded.username;
      }
    } catch (err) {
      username = undefined;
    }

    return username;
  };
}
