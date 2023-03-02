import { Knex, knex } from "knex";
import path from "path";
import fs from "fs";


export default class Database {
     project() {
          return knex({
               client: "sqlite3",
               connection: {
                    filename: path.resolve(`./src/database/projects.sqllite`),
               },
               useNullAsDefault: true
          })
     }

     connect(db:any) {
          return knex({
               client: "sqlite3",
               connection: {
                    filename: path.resolve(`./src/database/${db}.sqllite`),
               },
               useNullAsDefault: true
          })
     }

     async deleteDatabase(dbname:string){
          try{
               fs.unlinkSync(path.resolve(`./src/database/${dbname}.sqllite`))
          }catch(err){
          }
     }

     async createNotesDb(dbname: string) {
          fs.appendFile(path.resolve(`./src/database/${dbname}.sqllite`), '', async (err) => {
               if (err) console.log(err);
               if(!err){
                    const db = this.connect(dbname)
                    if (!(await db.schema.hasTable('project_notes'))) {
                         await db.schema.createTable('project_notes', (table) => {
                              table.increments("id", {
                                   primaryKey: true,
                              });
                              table.string("user_id").nullable();
                              table.string("project_uuid").notNullable();
                              table.string("title").notNullable();
                              table.text("description").notNullable();
                              table.string("tag").notNullable();
                              table.string("created_at").notNullable();
                         });
                    }
               }
          });
     }
     async _migrate_projects_table() {
          const db = this.project()
          if (!(await db.schema.hasTable("projects"))) {
               await db.schema.createTable("projects", (table) => {
                    table.increments("id", {
                         primaryKey: true,
                    });
                    table.string("user_id").nullable();
                    table.string("title").notNullable();
                    table.string("description").notNullable();
                    table.string("created_at").notNullable();
                    table.string('uuid').unique().notNullable()
                    table.string('database').unique().notNullable()
               });
          }
     }

}