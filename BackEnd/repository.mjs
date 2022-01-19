import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.db'
});

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    grade: {
        type:Sequelize.FLOAT
    }
});

const Professor = sequelize.define('professor', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }


});


const Team = sequelize.define('team', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },


});

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description:Sequelize.STRING,

    projectFile: Sequelize.STRING,

    date:Sequelize.STRING

});

const Deadline = sequelize.define('deadline',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    number:Sequelize.INTEGER,

    date:Sequelize.STRING
});

const Jury = sequelize.define('jury', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
    
});



Professor.hasMany(Student, {
    foreignKey: 'professorId'
});

Student.belongsTo(Professor, {
    foreignKey: 'professorId'
});

Team.hasMany(Student, {
    foreignKey: 'teamId'
});

Student.belongsTo(Team, {
    foreignKey: 'teamId'
});

Jury.hasMany(Student, {
    foreignKey: 'juryId'
});

Student.belongsTo(Jury, {
    foreignKey: 'juryId'
});

Team.hasMany(Project, {
    foreignKey: 'teamId'
});

Team.hasOne(Jury,{
    foreignKey: 'teamId'
});

Project.hasOne(Jury,{
    foreignKey: 'projectId'
});



async function initialize() {
    
    
    await sequelize.authenticate();
    console.log("AAAAAAAAAAAAAAA");
    await sequelize.sync({
        //force:true,
        alter: true
    });
}

export {
    initialize,
    Student,
    Professor,
    Team,
    Jury,
    Project,
    Deadline,
}