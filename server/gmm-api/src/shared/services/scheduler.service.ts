import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly dataSource: DataSource,
  ) {}

  scheduleJob(
    jobId: string,
    executionTime: Date,
    callback: (queryRunner: QueryRunner) => Promise<void>,
  ): void {
    const job = new CronJob(executionTime, async () => {
      const queryRunner = this.dataSource.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          await callback(queryRunner);
          await queryRunner.commitTransaction();
          console.log(`Job ${jobId} executed successfully.`);
        } catch (error) {
          await queryRunner.rollbackTransaction();
          console.error(`Error executing job ${jobId}:`, error);
        }
      } catch (error) {
        console.error(`Failed to start transaction for job ${jobId}:`, error);
      } finally {
        await queryRunner.release(); // Ensure the queryRunner is released after the callback is done
        this.deleteJob(jobId);
      }
    });

    this.schedulerRegistry.addCronJob(jobId, job);
    job.start();
    console.log(`Job ${jobId} scheduled for ${executionTime}`);
  }

  deleteJob(jobId: string): void {
    try {
      const job = this.schedulerRegistry.getCronJob(jobId);
      if (job) {
        job.stop();
        this.schedulerRegistry.deleteCronJob(jobId);
        console.log(`Job ${jobId} deleted successfully.`);
      }
    } catch (error) {
      console.warn(`Job ${jobId} could not be deleted or was not found.`);
    }
  }
}
