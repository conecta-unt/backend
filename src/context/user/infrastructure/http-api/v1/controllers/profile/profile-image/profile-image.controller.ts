import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from 'src/bootstrap';
import { USER_API_V1_BASE_PATH } from '../../../constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { UploadProfileImageUseCase } from 'src/context/user/application';

@Controller(`${USER_API_V1_BASE_PATH}/profile/profile-image`)
export class UploadProfileImageController {
  constructor(private readonly profileImage: UploadProfileImageUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async run(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.profileImage.execute(req, file);
  }
}
