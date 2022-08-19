import { Model, INTEGER, STRING } from 'sequelize';
import db from '../index';

class TeamRepository extends Model {
  id!: number;
  teamName!: string;
}

TeamRepository.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamRepository;
