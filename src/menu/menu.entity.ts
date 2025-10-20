import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/role.entity";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // create update delete read manage 五种策略
    // 使用 simple-array 将 string[] 存为逗号分隔的字符串，TypeORM 原生列类型不能直接映射数组
    @Column('simple-array')
    strategy: string[];

    @ManyToMany(type => Role, role => role.menus)
    roles: Role[];
}
