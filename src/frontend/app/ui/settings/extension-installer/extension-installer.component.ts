import { Component, ViewChild } from '@angular/core';
import { ExtensionInstallerService } from './extension-installer.service';
import { ExtensionListItem } from '../../../../../common/entities/extension/ExtensionListItem';
import { NotificationService } from '../../../model/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-extension-installer',
  templateUrl: './extension-installer.component.html',
  styleUrls: ['./extension-installer.component.css']
})
export class ExtensionInstallerComponent {
  @ViewChild('extensionsModal', { static: false }) public extensionsModal: ModalDirective;

  public extensions: ExtensionListItem[] = [];
  public loading = false;
  public error: string | null = null;

  constructor(
    private extensionService: ExtensionInstallerService,
    private notificationService: NotificationService
  ) {}

  public openExtensionsModal(): void {
    this.extensionsModal.show();
    this.loadExtensions();
  }

  public loadExtensions(): void {
    this.loading = true;
    this.error = null;

    this.extensionService.getExtensions()
      .then(extensions => {
        this.extensions = extensions;
        this.loading = false;
      })
      .catch(err => {
        this.error = 'Failed to load extensions: ' + (err.message || err);
        this.loading = false;
        this.notificationService.error('Failed to load extensions', err);
      });
  }

  public installExtension(extension: ExtensionListItem): void {
    if (extension.installed) {
      return;
    }

    this.loading = true;
    this.extensionService.installExtension(extension.id)
      .then(() => {
        extension.installed = true;
        this.notificationService.success(`Extension "${extension.name}" installed successfully`);
        this.loading = false;
      })
      .catch(err => {
        this.notificationService.error(`Failed to install extension "${extension.name}"`, err);
        this.loading = false;
      });
  }
}
