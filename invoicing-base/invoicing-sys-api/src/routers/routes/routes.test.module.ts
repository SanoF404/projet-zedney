import { Module } from '@nestjs/common';
import { AgentModule } from 'src/shared/agent/agent.module';
import { AgentController } from 'src/shared/agent/agent.controller';
import { PyController } from 'src/shared/py/py.controller';
import { PyModule } from 'src/shared/py/py.module';

@Module({
  controllers: [PyController, AgentController],
  providers: [],
  exports: [],
  imports: [PyModule, AgentModule],
})
export class RoutesTestModule {}
