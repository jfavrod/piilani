/**
 * @type { Dto } A Dto Object.
 * @type { Entity } A Domain Entity.
 */
export interface DtoEntityMapper<Dto, Entity> {
    toDto(entity: Entity): Dto;
    toEntity(dto: Dto): Entity;
}
