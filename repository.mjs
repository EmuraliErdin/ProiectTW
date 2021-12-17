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

    // projectFile:{
    //     type:Sequelize.file
    // }

});


const Jury = sequelize.define('jury', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
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

Team.hasOne(Project, {
    foreignKey: 'projectId'
});
Project.belongsTo(Team, {
    foreignKey: 'juryId'
});

Jury.hasOne(Project, {
    foreignKey: 'juryId'
});
Project.belongsTo(Jury, {
    foreignKey: 'juryId'
});


async function initialize() {
    await sequelize.authenticate();
    await sequelize.sync({
        alter: true
    });
}

export {
    initialize,
    Student,
    Professor,
    Team,
    Jury,
    Project
}