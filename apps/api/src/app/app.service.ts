import { Order, Pizza } from '@cat/api-interfaces';
import { Injectable } from '@nestjs/common';
import { OrderDto } from './data-transfer-objects/order.dto';
import { PizzaDto } from './data-transfer-objects/pizza.dto';

const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: 'Margherita',
    price: 1290,
    imageUrl: '/api/pizza/images/1.jpg',
    description: 'Tomato sauce, mozzarella, basil',
  },
  {
    id: 2,
    name: 'Prosciutto',
    price: 1345,
    imageUrl: '/api/pizza/images/2.jpg',
    description: 'Tomato sauce, ham, mozzarella, oregano',
  },
  {
    id: 3,
    name: 'Diavola',
    price: 1345,
    imageUrl: '/api/pizza/images/3.jpg',
    description: 'Tomato sauce, Italian spicy salami, mozzarella',
  },
  {
    id: 4,
    name: 'Prosciutto e Mais',
    price: 1480,
    imageUrl: '/api/pizza/images/4.jpg',
    description: 'Tomato sauce, ham, corn, mozzarella',
  },
  {
    id: 5,
    name: 'Piccante',
    price: 1480,
    imageUrl: '/api/pizza/images/5.jpg',
    description:
      'Tomato sauce, ham, italian spicy salami, green peppers, jalapeno, mozzarella',
  },
];

let ORDERS = [];

@Injectable()
export class AppService {
  clear() {
    ORDERS = [];
  }

  async getPizzas(): Promise<Pizza[]> {
    return PIZZAS;
  }

  async getPizza(id: number): Promise<Pizza> {
    return PIZZAS.find((p) => p.id === id);
  }

  async createPizza(pizza: PizzaDto): Promise<number> {
    const id = Math.floor(Math.random() * 100000);
    const newPizza = {
      id,
      ...pizza,
    };
    PIZZAS.push(newPizza);
    return id;
  }

  async updatePizza(pizza: PizzaDto): Promise<number> {
    const existing = await this.getPizza(pizza.id);
    existing.name = pizza.name;
    existing.price = pizza.price;
    existing.description = pizza.description;
    existing.imageUrl = pizza.imageUrl;
    return existing.id;
  }

  async placeOrder(order: OrderDto): Promise<number> {
    const id = Math.floor(Math.random() * 100000);
    const newOrder = {
      id,
      ...order,
    };
    ORDERS.push(newOrder);
    return id;
  }

  async getOrders(): Promise<Order[]> {
    return ORDERS.map((order: OrderDto) => ({
      ...order,
      pizzas: order.pizzas.map((id: number) => PIZZAS.find((p) => p.id === id)),
    }));
  }
}
