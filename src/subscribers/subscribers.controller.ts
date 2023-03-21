import { CreateSubscriberDto } from './dto/CreateSubscriberDto';
import { JwtAuthenticationGuard } from './../authentication/guards/jwt-authentication.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersController {
  constructor(
    @Inject('SUBSCRIBERS_SERVICE') private subscribersService: ClientProxy,
  ) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getSubscribers() {
    return this.subscribersService.send(
      {
        cmd: 'get-all-subscribers',
      },
      '',
    );
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    console.log(subscriber);
    return this.subscribersService.emit(
      {
        cmd: 'add-subscriber',
      },
      subscriber,
    );
  }
}
