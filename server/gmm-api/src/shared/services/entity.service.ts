import { Injectable } from '@nestjs/common';
import { PathDef } from '@shared/types/service-options';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityService } from '@shared/types/service';

export const EntityService = <T>(entityClass: new () => T, populateFields: string[] | PathDef = []) => {
  @Injectable()
  class EntityServiceHost implements IEntityService<T> {
    constructor(
      @InjectRepository(entityClass)
      public readonly entityRepository: Repository<T>,
    ) {}
    findAll(): Promise<T[]> {
      try {
        return this.entityRepository.find();
      } catch (e) {
        console.log(e);
        throw new Error('Error fetching entities');
      }
    }


    async findOne(id: string): Promise<T | null> {
      try {
        return await this.entityRepository.findOne({ relations: populateFields as string[] });
      } catch (e) {
        console.log(e);
        throw new Error('Error fetching entity');
      }
    }
    

    async create(data: any): Promise<T> {
      try {
        const entity = this.entityRepository.create(data);
        return await this.entityRepository.save(entity)[0];
      } catch (e) {
        console.log(e);
        throw new Error('Error creating entity');
      }
    }

    async update(id: string, data: any): Promise<void> {
      try {
        await this.entityRepository.update(id, data);
      } catch (e) {
        console.log(e);
        throw new Error('Error updating entity');
      }
    }

    async delete(id: string): Promise<void> {
      try {
        await this.entityRepository.delete(id);
      } catch (e) {
        console.log(e);
        throw new Error('Error deleting entity');
      }
    }
  }

  return EntityServiceHost;
};


