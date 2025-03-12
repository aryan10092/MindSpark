


import { serial, boolean, varchar, pgTable, json, integer, text } from "drizzle-orm/pg-core";


 const USER_TABLE=pgTable('users',{
    id:serial().primaryKey(),
    name:varchar().notNull(),
    email:varchar().notNull(),
    isMember:boolean().default(false),
    customerId:varchar()

})

export default USER_TABLE

export const STUDY_TABLE=pgTable('studymaterial',{
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    type:varchar().notNull(),
    topic:varchar().notNull(),
    level:varchar().default('Easy'),
    courselayout:json(),
    createdby:varchar().notNull(),
    status:varchar().default('Generating')

})

export const CHAPTER_NOTES=pgTable('chapternotes',{
    id:serial().primaryKey(),

    courseId:varchar().notNull(),
    chapterId:integer().notNull(),
    notes:text()
}
)

export const PAYMENT_RECORD=pgTable('paymentrecords',{
    id:serial().primaryKey(),
    customerId:varchar(),
    sessionId:varchar()

})