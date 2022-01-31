import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MakeUrlDto } from './dtos/make-url.dto';
import { PrismaService } from './prisma.service';
const { nanoid } = require('nanoid');
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
  ) {}

  @Post()
  async makeUrl(@Body() body: MakeUrlDto) {

    const shortUrl = nanoid(10);

    try {
      await this.prisma.url.create({
        data: {
          longUrl: body.url,
          shortUrl: shortUrl
        }
      });
    }catch {
      throw new BadRequestException("This link already exists!");
    }
    
    return {
      shortUrl: shortUrl
    };
  }

  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response){
    const urlEntity = await this.prisma.url.findUnique({
      where: {
        shortUrl: shortUrl
      }
    });

    if(!urlEntity){
      throw new NotFoundException();
    }

    return res.redirect("https://" + urlEntity.longUrl);
  }
}
