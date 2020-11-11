module.exports.run = async (message, db) => {

    const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)");
    const verification = db.prepare("SELECT * FROM users WHERE id = ?").get(message.author.id);

    if (!verification) {
        const {changes} = stmt.run(message.author.id, message.member.user.username, 0, 0, 0, 1);
        if(changes) return console.log(`Enregistrement --> ${message.author.tag}`);
    }
    else return;
}


