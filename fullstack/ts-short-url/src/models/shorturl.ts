import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";


@Entity("short_url")
export class ShortUrl {
    @PrimaryColumn()
    public shorturlid!: string;

    @Column()
    public longurl!: string;

    @Column()
    public createdata!: string;
}