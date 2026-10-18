import { Controller, Get } from '@nestjs/common';
import { PyRunnerService } from './py-runner.service';
import { Public } from '../auth/utils/public-strategy';

@Controller('py')
export class PyController {
  constructor(private readonly pyRunner: PyRunnerService) {}

  @Public()
  @Get('hello-cardinal')
  async sayHello() {
    try {
      const result = await this.pyRunner.runScript('base.py', []);
      return { message: 'Success', output: result };
    } catch (error) {
      console.log(error);
      return { message: 'Error', error: error.message };
    }
  }
}
