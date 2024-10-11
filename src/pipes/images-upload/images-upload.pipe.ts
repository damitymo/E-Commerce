import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagesUploadPipe implements PipeTransform {

  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
  ];

  private readonly maxSizeInBytes = 10485760; //10Mb

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File not found');
    }
    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException('File too large');
    }
    return file;
  }
}
