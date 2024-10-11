import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { request, Request } from 'express';

interface RequestWithUser extends Request {
  user?: any;
}
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() credentials: SignInAuthDto){
    return this.authService.signin(credentials);
  }
  
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signUpUser: SignupAuthDto){
    const user= await this.authService.signUp(signUpUser);
    return new UserResponseDto(user);
  }

  // @Get('auth0/protected')
  // getAuth0Protected(@Req() req: Request){
  //   console.log(JSON.stringify(request.oidc.idToken));
  //   return JSON.stringify(req.oidc.user);
    
  // }

  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
