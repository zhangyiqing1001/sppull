import { join } from 'path';

import { AuthConfig as SPAuthConfigurator, IAuthConfigSettings } from 'node-sp-auth-config';
import { ISPPullOptions, ISPPullContext, Download as IDownload } from './../../src';

const Download: IDownload = require(join(__dirname, '../../src'));
const sppull = Download.sppull;

const authSettings: IAuthConfigSettings = {
  configPath: './config/integration/private.spo.json'
};

(new SPAuthConfigurator(authSettings)).getContext().then((context) => {

  let pullContext: ISPPullContext = {
    siteUrl: context.siteUrl,
    ...context.authOptions
  } as any;

  let pullOptions: ISPPullOptions = {
    spBaseFolder: '/',
    spRootFolder: 'Shared%20Documents', // 'Shared%20Documents', // 'shared documents', // Should act the same
    dlRootFolder: join(__dirname, 'Downloads')
  };

  sppull(pullContext, pullOptions);

}).catch(console.log);
