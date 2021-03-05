import { Order, Pizza } from '@cat/api-interfaces';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

import { AppService } from './app.service';
import { LoginDto } from './data-transfer-objects/login.dto';
import { OrderDto } from './data-transfer-objects/order.dto';
import { PizzaDto } from './data-transfer-objects/pizza.dto';

/**
 Since this is only a mock back-end, I'm inclined to do everything in one controller.
 */

const ACCEPTED_PASSWORDS = new Set(['pass']);
const LOGGED_IN_USERS = new Set();

function extractToken(auth: string): string {
  return auth.replace('Bearer ', '');
}

function checkAuth(auth: string): void {
  const token = extractToken(auth);
  if (!LOGGED_IN_USERS.has(token)) {
    throw new UnauthorizedException('Access denied');
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('clear-db')
  async clearDatabase() {
    this.appService.clear();
  }

  @Get('pizza/list')
  async getPizzas(): Promise<Pizza[]> {
    return this.appService.getPizzas();
  }

  @Get('pizza/images/:fileName')
  async getPizzaImage(
    @Param('fileName') fileName: string,
    @Res() res: Response
  ): Promise<any> {
    res.sendFile(join(__dirname, '..', 'api', 'assets', fileName));
  }

  @Post('order')
  async placeOrder(@Body() order: OrderDto): Promise<number> {
    return this.appService.placeOrder(order);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginCredentials: LoginDto
  ): Promise<{ accessToken: string }> {
    if (!ACCEPTED_PASSWORDS.has(loginCredentials.password)) {
      throw new UnauthorizedException('Unauthorised!');
    }
    const token = `${new Date().getTime()}`;
    LOGGED_IN_USERS.add(token);
    return {
      accessToken: token,
    };
  }

  /**
   * AUTHENTICATED ENDPOINTS
   */

  @Get('pizza/:id')
  async getPizza(
    @Headers('authorization') auth: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<Pizza> {
    checkAuth(auth);
    return this.appService.getPizza(id);
  }

  @Post('pizza')
  async createPizza(
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) pizzaDto: PizzaDto
  ): Promise<number> {
    checkAuth(auth);
    return this.appService.createPizza(pizzaDto);
  }

  @Put('pizza')
  async updatePizza(
    @Headers('authorization') auth: string,
    @Body(ValidationPipe) pizzaDto: PizzaDto
  ): Promise<number> {
    checkAuth(auth);
    return this.appService.updatePizza(pizzaDto);
  }

  @Get('orders')
  async getOrders(@Headers('authorization') auth: string): Promise<Order[]> {
    checkAuth(auth);
    return this.appService.getOrders();
  }
}
