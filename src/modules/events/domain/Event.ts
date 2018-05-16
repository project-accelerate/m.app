import { ObjectType, Field } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface EventProps {
  name: string
}

@Entity()
@ObjectType()
export class Event implements EventProps {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string

  @Column()
  @Field()
  name!: string
}
