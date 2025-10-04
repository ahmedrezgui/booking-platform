import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { HasId } from '../interfaces/hasId.interface';

@Injectable()
export class CrudService<Entity extends HasId> {
  constructor(private repository: Repository<Entity>) { }

  create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async update(id: number, updateDto: DeepPartial<Entity>): Promise<Entity> {
    const entity = await this.repository.preload({
      id,
      ...updateDto,
    });
    if (!entity) {
      throw new NotFoundException('entity Not Found');
    }
    return this.repository.save(entity);
  }

  async remove(entity: Entity) {
    const result = await this.repository.softRemove(entity);
    return result;
  }
  async restore(id: number): Promise<UpdateResult> {
    const result = await this.repository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('entity Not Found');
    }
    return result;
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async findOne(id): Promise<Entity> {
    return await this.repository.findOneBy({ id: id });
  }
}