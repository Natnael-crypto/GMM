import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
  import { ZodValidationPipe } from '@shared/pipes/zod.pipe';
  import { EntityControllerOptions } from '@shared/types/controller-options';
  import { IEntityService } from '@shared/types/service';
  import { DeleteResult, UpdateResult } from 'typeorm';
  
  export const EntityController = <T>(controllerOptions: EntityControllerOptions) => {
    @Controller()
    @ApiBearerAuth()
    class EntityController {
      constructor(readonly entityService: IEntityService<T>) {}
  
      @ApiBody({ type: controllerOptions.createDto })
      @Post()
      async create(
        @Body(new ZodValidationPipe(controllerOptions.createSchema))
        createEntityDto,
      ) {
        try {
          return await this.entityService.create(createEntityDto);
        } catch (err) {
          console.error(err);
          throw new BadRequestException('Unable to complete request.');
        }
      }
  
      @Get()
      async findAll() {
        return await this.entityService.findAll();
      }
  
      @Get(':id')
      async findOne(@Param('id') id: string) {
        try {
          return await this.entityService.findOne(id);
        } catch (err) {
          throw new BadRequestException('Unable to complete request.');
        }
      }
  
      @ApiBody({ type: controllerOptions.updateDto })
      @Put(':id')
      async update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(controllerOptions.updateSchema))
        updateEntityDto,
      ) {
        let result: UpdateResult;
        try {
          result = await this.entityService.update(id, updateEntityDto);
        } catch (err) {
          console.error(err);
          throw new BadRequestException('Unable to complete request.');
        }
        if (result.affected === 0) {
          throw new NotFoundException('not_found');
        }
      }
  
      @Delete(':id')
      async delete(@Param('id') id: string) {
        let result: DeleteResult;
        try {
          result = await this.entityService.delete(id);
        } catch (err) {
          console.error(err);
          throw new BadRequestException('Unable to complete request.');
        }
        if (result.affected === 0) {
          throw new NotFoundException('not_found');
        }
      }
    }
  
    return EntityController;
  };
  