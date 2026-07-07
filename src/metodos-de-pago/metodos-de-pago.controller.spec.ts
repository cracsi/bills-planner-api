import { Test, TestingModule } from '@nestjs/testing';
import { MetodosDePagoController } from './metodos-de-pago.controller';
import { MetodosDePagoService } from './metodos-de-pago.service';

describe('MetodosDePagoController', () => {
  let controller: MetodosDePagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetodosDePagoController],
      providers: [MetodosDePagoService],
    }).compile();

    controller = module.get<MetodosDePagoController>(MetodosDePagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
