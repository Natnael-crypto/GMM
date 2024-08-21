import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payment.service';
import { PaymentsController } from './controllers/payment.controller';


@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}