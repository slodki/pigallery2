import { Injectable } from '@angular/core';
import {NetworkService} from '../../../model/network/network.service';
import {UserDTO} from '../../../../../common/entities/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class ExtensionInstallerService {

  constructor(private networkService: NetworkService) {
  }



  public getExtensions(): Promise<Array<UserDTO>> {
    return this.networkService.getJson('/user/list');
  }
}
