import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.alterTable('User', table => {
    table.boolean('isDelegate')
  })

  const users = await db('ConferenceAttendance')
    .select('attendee')
    .where({
      conference: 'LABOUR_2018',
    })

  await db('User')
    .whereIn('id', users.map((attendance: any) => attendance.attendee))
    .update({ isDelegate: true })

  await db.schema.dropTable('ConferenceAttendance')
}

export async function down(db: Knex) {}
