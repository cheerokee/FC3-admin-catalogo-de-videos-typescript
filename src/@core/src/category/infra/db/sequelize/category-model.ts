import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

type CategoryModelProperties = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
}

@Table({ tableName: 'categories', timestamps: false })
export class CategoryModel extends Model<CategoryModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;
  // declare = Dizer para o typescript que esse campo vai existir,
  // e essa existencia é fake na modelagem. Na hora de compilar a classe nao terá os
  // campos pois isso será gerenciado pelo proprio sequelize

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ type: DataType.TEXT })
  declare description: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare is_active: boolean;

  @Column({ allowNull: false, type: DataType.DATE })
  declare created_at: Date;
}
