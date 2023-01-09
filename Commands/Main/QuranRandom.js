const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios');
require('dotenv').config();
BASE_URL = process.env.BASE_QURAN_API;
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    data : new SlashCommandBuilder()
        .setName('qrandom')
        .setDescription('Get a random surah from the Quran'),
    async execute(interaction) {
        var mergedAR = String();
        var mergedID = String();
        let embed;
        const surah = Math.floor(Math.random() * 114) + 1;
        // const surah = 107;
        await interaction.deferReply();
        const url = `${BASE_URL}/surat/${surah}`;
        const response = await axios.get(
            url,
            {
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress"
                }
            }
        );
        const find_ayat = Math.floor(Math.random() * response.data.jumlah_ayat);
        const ayat = find_ayat + 1;
        const surahName = response.data.nama_latin;
        const SurahTextAR = response.data.ayat[find_ayat].ar;
        const SurahTextID = response.data.ayat[find_ayat].idn;
        try {
            var ayatConnection = await prisma.ayat_connection.findFirst({
                where: {
                    surah: surah,
                    ayat: ayat
                }
            });
          } catch (e) {
            if(e instanceof Prisma.PrismaClientKnownRequestError)
            {
                console.error(e.message)
            }
            console.error(e)
            return interaction.editReply(`Error: 500 Internal Server Error`);
          }
        
        if (ayatConnection) {
        letWhereayatConnection = await prisma.ayat_connection.findMany({
            where: {
                random_string_connection: ayatConnection.random_string_connection        
            }
        });

        for (let i = 0; i < letWhereayatConnection.length; i++) {
            mergedAR += response.data.ayat[letWhereayatConnection[i].ayat - 1].ar + " ";
            mergedID += response.data.ayat[letWhereayatConnection[i].ayat - 1].idn + " ";
            
            
            
        }
        embed = {
            color: 0x0099ff,
            title: `Surah ${surahName} Ayat ${ayat}`,
            fields: [
                {
                    name: 'Arabic',
                    value: mergedAR,
                },
                {
                    name: 'Indonesia',
                    value: mergedID,
                },
            ],
            timestamp: new Date(),
        }
        interaction.editReply({embeds: [embed]});
        console.log(ayatConnection);
        console.log(letWhereayatConnection);
        return;
    }

    

        //make embed
         embed = {
            color: 0x0099ff,
            title: `Surah ${surahName} Ayat ${ayat}`,
            fields: [
                {
                    name: 'Arabic',
                    value: SurahTextAR,
                },
                {
                    name: 'Indonesia',
                    value: SurahTextID,
                },
            ],
            timestamp: new Date(),
        }
        await interaction.editReply({embeds: [embed]});
    }
}