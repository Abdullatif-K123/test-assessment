import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column('decimal', { precision: 10, scale: 8 }) // Adjust precision as needed
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 }) // Adjust precision as needed
  longitude: number;

  @Column({ nullable: true }) // Email field
  email?: string; // Optional email field
}
