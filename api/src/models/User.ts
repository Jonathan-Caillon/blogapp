import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, nullable: false })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationDate: Date;
}
