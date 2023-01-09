const cron = require('node-cron');

function cronJob (interaction, client, job, newPeriode){
    if (job) job.stop();
    job = cron.schedule('00 42 22 * * *', () => {
        console.log('running a task every minute');
        client.channels.cache.get('1057298136093167667').send('test');
    },
    {
        timezone: "Asia/Jakarta"
    });
}

module.exports ={
    name: 'ready',
    async execute(interaction, client){
        // cron in 8:30 pm jakarta timezone
        let job = null;
        let newPeriode = null;
        cronJob(interaction, client, job, newPeriode);
    }
}