import {Express} from 'express';
import {UserRoles} from '../../common/entities/UserDTO';
import {AuthenticationMWs} from '../middlewares/user/AuthenticationMWs';
import {RenderingMWs} from '../middlewares/RenderingMWs';
import {ServerTimingMWs} from '../middlewares/ServerTimingMWs';
import {ExtensionManager} from '../../model/extension/ExtensionManager';

export class UserRouter {
  public static route(app: Express): void {
    this.addExtensionList(app);
  }

  private static addExtensionList(app: Express): void {
    app.post(
      ExtensionManager.EXTENSION_API_PATH,
      AuthenticationMWs.authenticate,
      AuthenticationMWs.authorise(UserRoles.Admin),
      ServerTimingMWs.addServerTiming,
      RenderingMWs.renderSessionUser
    );
  }

}
