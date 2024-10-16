import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../guard/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ImagesUploadPipe } from 'src/pipes/images-upload/images-upload.pipe';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    private readonly fileUploadService: FileUploadService 
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiQuery({ name: 'page', required: false })
  @Get()
  
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/upload')

  @HttpCode(200)
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @Param('id') id: string, 
    @UploadedFile(new ImagesUploadPipe()) file: Express.Multer.File)
    {
      return this.productsService.uploadFile(file, id);
    }

  @Get(':id/image')
  @HttpCode(200)
  async getImage(@Param('id') id: string) {
    return this.fileUploadService.getUrl(id);
  }
}
