import { ApiProperty } from "@nestjs/swagger";

export interface UploadFileDto {
  
    fieldname: string;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
