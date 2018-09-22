import * as Knex from 'knex'
import {
  uuidPrimaryKey,
  uuidForeignKey,
  dropTableForRollback,
} from 'backend/db/migrationUtils'

export async function up(db: Knex) {
  await db.schema.createTable('MeetupsModerationQueue', table => {
    uuidPrimaryKey(table)

    // User submitting the event.
    uuidForeignKey(table, {
      name: 'user',
      references: 'User',
    }).comment('User submitting meetup')

    // Elements common with the event table
    table.text('name').notNullable()
    table.dateTime('startTime').notNullable()
    table.dateTime('endTime').notNullable()
    table.text('introduction').notNullable()
    table.text('detail').notNullable()
    table.specificType('location', 'geography').notNullable()

    // Additional details captured for meetups
    // Equivalent to name on the venue table
    table
      .text('venueName')
      .notNullable()
      .comment('Proposed venue name')

    // Who is hosting this if not the actual person?
    table
      .text('hostedBy')
      .comment(
        'Proposed host in the situation where the person is acting for an organisation',
      )

    table
      .boolean('isApproved')
      .notNullable()
      .defaultTo(false)
      .comment('Is the event approved or not?')

    table
      .boolean('userNotifiedOfApprovalState')
      .notNullable()
      .defaultTo(false)
      .comment('Is the user notified of the approval?')

    // Relationship to event table if approved
    uuidForeignKey(table, { references: 'event' }).comment(
      'Relationship to event if approved',
    )
  })
}

export async function down(db: Knex) {
  await dropTableForRollback(db, 'MeetupsModerationQueue')
}
