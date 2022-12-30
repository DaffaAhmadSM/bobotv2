const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios');
require('dotenv').config();
BASE_URL = process.env.BASE_QURAN_API;
const { PrismaClient } = require('@prisma/client')
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
        const ayah = Math.floor(Math.random() * response.data.jumlah_ayat);
        // const ayah = 4;
        const surahName = response.data.nama_latin;
        const SurahTextAR = response.data.ayat[ayah].ar;
        const SurahTextID = response.data.ayat[ayah].idn;
        let ayahConnection = await prisma.ayah_connection.findFirst({
            where: {
                surah: surah,
                ayat: ayah
            }
        });
        if (ayahConnection) {
        letWhereayahConnection = await prisma.ayah_connection.findMany({
            where: {
                random_string_connection: ayahConnection.random_string_connection        
            }
        });

        for (let i = 0; i < letWhereayahConnection.length; i++) {
            mergedAR += response.data.ayat[letWhereayahConnection[i].ayat - 1].ar + " ";
            mergedID += response.data.ayat[letWhereayahConnection[i].ayat - 1].idn + " ";
            
            
            
        }
        embed = {
            color: 0x0099ff,
            title: `Surah ${surahName} Ayat ${ayah}`,
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
        console.log(ayahConnection);
        console.log(letWhereayahConnection);
        return;
    }

    

        //make embed
         embed = {
            color: 0x0099ff,
            title: `Surah ${surahName} Ayat ${ayah}`,
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