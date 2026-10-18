import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RefTypeRepository } from 'src/shared/reference-types/repositories/ref-type.repository';
import { RefParamRepository } from 'src/shared/reference-types/repositories/ref-param.repository';
import { activitiesSeed } from './data/activities.data';

@Injectable()
export class RefActivitiesSeedCommand {
  constructor(
    private readonly refTypeRepository: RefTypeRepository,
    private readonly refParamRepository: RefParamRepository,
  ) {}

  @Command({
    command: 'seed:activities',
    describe: 'Seed system activities',
  })
  async seed() {
    const start = new Date();
    console.log('🚀 Starting seeding of activities...');
    //=============================================================================================
    let activityRefType = await this.refTypeRepository.findOne({
      where: { label: 'Activity' },
    });

    if (!activityRefType) {
      activityRefType = await this.refTypeRepository.save({
        id: 'activity',
        label: 'Activity',
        description: 'Parent reference type for all activities',
      });
      for (const activity of activitiesSeed) {
        await this.refParamRepository.save({
          label: activity,
          description: `Description for ${activity}`,
          refType: activityRefType,
          extras: {},
        });
      }
    }
    //=============================================================================================
    const end = new Date();
    console.log(
      `✅ Seeding completed in ${end.getTime() - start.getTime()}ms ⏱️`,
    );
  }
}
