import { v2 as cloudinary } from 'cloudinary';
import { AppConfigService } from '../services/app-config.service';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [AppConfigService],
  useFactory: (config: AppConfigService) => {
    return cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });
  },
};
