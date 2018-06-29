import { Container } from 'typedi'
import { CrudRepository, CrudRepositoryType } from './CrudRepository'
import { DatabaseConnection } from './DatabaseConnection'

export interface RelationRepositoryProps {
  sourceRef?: string
  destRef?: string

  name: string
}

export class RelationRepository<T = {}> {
  constructor(
    private Source: CrudRepositoryType,
    private Dest: CrudRepositoryType<T>,
    private props: RelationRepositoryProps,
  ) {}

  db = Container.get(DatabaseConnection)

  get relatedRepository() {
    return Container.get<any>(this.Dest)
  }

  get sourceRepo() {
    return Container.get<CrudRepository>(this.Source)
  }

  get destRepo() {
    return Container.get<CrudRepository<T>>(this.Dest)
  }

  get junctionTable() {
    return this.props.name
  }

  get sourceIdCol() {
    return this.props.sourceRef || this.sourceRepo.tableName
  }

  get destIDCol() {
    return this.props.destRef || this.destRepo.tableName
  }

  async add(source: string, dests: string[]) {
    return this.db.knex
      .insert(
        dests.map(dest => ({
          [this.sourceIdCol]: source,
          [this.destIDCol]: dest,
        })),
      )
      .into(this.junctionTable)
  }

  async remove(source: string, dest: string) {
    return this.db.knex
      .delete()
      .from(this.junctionTable)
      .where(this.sourceIdCol, source)
      .andWhere(this.destIDCol, dest)
  }

  async findFrom(source: string) {
    const q = this.db.knex
      .select(this.destField('*'))
      .from(this.junctionTable)
      .innerJoin(
        this.destRepo.tableName,
        this.junctionField(this.destIDCol),
        '=',
        this.destField('id'),
      )
      .where(this.junctionField(this.sourceIdCol), source)

    return q.then(rows => this.destRepo.decodeAll(rows))
  }

  async findOneFrom(source: string) {
    return this.findFrom(source).then(xs => xs[0])
  }

  private junctionField(field: string) {
    return `${this.junctionTable}.${field}`
  }

  private sourceField(field: string) {
    return `${this.sourceRepo.tableName}.${field}`
  }

  private destField(field: string) {
    return `${this.destRepo.tableName}.${field}`
  }
}
