import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '../index';
import TeamRepository from './Team.repository';

class MatchRepository extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;

  teamHome!: {
    teamName: string
  };

  teamAway!: {
    teamName: string
  };
}

MatchRepository.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

MatchRepository.belongsTo(TeamRepository, {
  foreignKey: 'homeTeam', as: 'teamHome',
});

MatchRepository.belongsTo(TeamRepository, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

export default MatchRepository;
