import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ToDoList' })
export class ToDoList extends Model<ToDoList> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  taskTitle: string;

  @Column({ type: DataType.DATE, unique: false, allowNull: false })
  deadLine: Date;
}
