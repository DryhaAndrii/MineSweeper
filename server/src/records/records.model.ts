import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'records' })
export class Record extends Model<Record> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  nickName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  difficult: string;

  @Column({ type: DataType.STRING, allowNull: false })
  time: string;
}
