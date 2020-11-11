const { run } = require('./register');
const { getRandomNumber } = require('./data')


module.exports = async (message, db) => {

    // Ajout automatique de l'user dans la BDD
    run(message, db);

    // Obtention de l'XP et du niveau de l'user

    const stmt = db.prepare("UPDATE users SET xp=xp+? WHERE id = ?");
    const { level } = db.prepare("SELECT level FROM users WHERE id = ?").get(message.author.id);

    // Ajout de l'XP

    stmt.run(Math.ceil(getRandomNumber(1, 200) / parseInt(level)), message.author.id);
    const { xp } = db.prepare("SELECT xp FROM users WHERE id = ?").get(message.author.id);

    // Passage de niveau

    if (xp >= level * 1000) {
        const resetXp = db.prepare("UPDATE users SET xp=0 WHERE id = ?").run(message.author.id);
        const info = db.prepare("UPDATE users SET level=level+1 WHERE id = ?").run(message.author.id);
        if (info.changes && resetXp.changes) {
            const newLevel = db.prepare("SELECT level FROM users WHERE id = ?").get(message.author.id);
            return message.channel.send(`**Va chercher un emploi ${message.member} !** --> *Niveau ${newLevel.level} !*`);
        }
    }


}