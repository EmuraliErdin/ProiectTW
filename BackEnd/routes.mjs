import express from 'express';
import { Student, Professor, Team, Project, Jury } from './repository.mjs';
import {
    getRecords, postRecord, deleteRecords,
    getRecord, headRecord, deleteRecord, putRecord, patchRecord
} from './service.mjs';

const router = express.Router();

router.route('/students')
    .get((request, response)=> getRecords(Student, request, response))
    .post((request, response)=> postRecord(Student, request, response))
    .delete((request, response)=> deleteRecords(Student, request, response))
    
 router.route('/students/:id')
    .get((request, response)=> getRecord(Student, request, response))
    .head((request, response)=> headRecord(Student, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Student, request, response))
    .patch((request, response)=> patchRecord(Student, request, response))
    .delete((request, response)=> deleteRecord(Student, request, response))

router.route('/professors')
    .get((request, response)=> getRecords(Professor, request, response))
    .post((request, response)=> postRecord(Professor, request, response))
    .delete((request, response)=> deleteRecords(Professor, request, response))
    
 router.route('/professors/:id')
    .get((request, response)=> getRecord(Professor, request, response))
    .head((request, response)=> headRecord(Professor, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Professor, request, response))
    .patch((request, response)=> patchRecord(Professor, request, response))
    .delete((request, response)=> deleteRecord(Professor, request, response))


    router.route('/teams')
    .get((request, response)=> getRecords(Team, request, response))
    .post((request, response)=> postRecord(Team, request, response))
    .delete((request, response)=> deleteRecords(Team, request, response))
    
 router.route('/teams/:id')
    .get((request, response)=> getRecord(Team, request, response))
    .head((request, response)=> headRecord(Team, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Team, request, response))
    .patch((request, response)=> patchRecord(Team, request, response))
    .delete((request, response)=> deleteRecord(Team, request, response))

    
    router.route('/projects')
    .get((request, response)=> getRecords(Project, request, response))
    .post((request, response)=> postRecord(Project, request, response))
    .delete((request, response)=> deleteRecords(Project, request, response))
    
 router.route('/projects/:id')
    .get((request, response)=> getRecord(Project, request, response))
    .head((request, response)=> headRecord(Project, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Project, request, response))
    .patch((request, response)=> patchRecord(Project, request, response))
    .delete((request, response)=> deleteRecord(Project, request, response))

    
    router.route('/juries')
    .get((request, response)=> getRecords(Jury, request, response))
    .post((request, response)=> postRecord(Jury, request, response))
    .delete((request, response)=> deleteRecords(Jury, request, response))
    
 router.route('/juries/:id')
    .get((request, response)=> getRecord(Jury, request, response))
    .head((request, response)=> headRecord(Jury, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Jury, request, response))
    .patch((request, response)=> patchRecord(Jury, request, response))
    .delete((request, response)=> deleteRecord(Jury, request, response))

    export default router;
