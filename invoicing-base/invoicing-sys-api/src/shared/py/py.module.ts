import { Module } from '@nestjs/common';
import { PyRunnerService } from './py-runner.service';

@Module({
  providers: [PyRunnerService],
  exports: [PyRunnerService],
})
export class PyModule {}
