import { Request } from 'express';
import * as streamifier from 'streamifier';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { HttpException, HttpStatus, Injectable } from 'src/bootstrap';
import {
  InDatabaseUserProfileRepository,
  InDatabaseUserRepository,
} from 'src/context/auth/infrastructure/persistence';
import { UserNotFoundException } from 'src/context/auth/domain';
import { UserPayload } from 'src/global/types/user';

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class UploadProfileImageUseCase {
  constructor(
    private readonly profile: InDatabaseUserProfileRepository,
    private readonly user: InDatabaseUserRepository,
  ) {}

  async execute(req: Request, file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const user = await this.user.findById(userPayload.id);

    if (!user) throw new UserNotFoundException();

    try {
      const data = await this._upload(file);

      if (data.message) throw new Error();

      const { secure_url } = data as UploadApiResponse;

      const profile = await this.profile.findOne(user.id);

      if (!profile) throw new Error();

      profile.profileImage = secure_url;
      await this.profile.update(profile);
    } catch {
      throw new HttpException(
        'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async _upload(file: Express.Multer.File) {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (error) return reject(error);
          if (result) resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
