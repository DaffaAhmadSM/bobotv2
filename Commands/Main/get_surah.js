const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios');
const util = require('util');
require('dotenv').config();
BASE_URL = process.env.BASE_QURAN_API;


    
module.exports = {
    data : new SlashCommandBuilder()
    .setName('surah')
    .setDescription('Get a surah from the Quran')
    .addIntegerOption(option => option.setName('surat').setDescription('number surah').setRequired(true))
    .addIntegerOption(option => option.setName('ayat').setDescription('number ayat').setRequired(true)),
    async execute(interaction) {
        
        const surah = interaction.options.getInteger('surat');
        if (surah > 114 || surah == 0) {
            const errEmbed = {
                color: 0xC73E1D,
                title: `Nomor surat tidak boleh lebih dari 114 dan tidak boleh kurang dari 1`,
                timestamp: new Date(),
            }
                interaction.reply({embeds: [errEmbed], ephemeral: true});
            return;
        }
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
        const ayat = interaction.options.getInteger('ayat');
        if (ayat > response.data.jumlah_ayat || ayat == 0) {
            const errEmbed = {
                color: 0xC73E1D,
                title: `Surah ${response.data.nama_latin} terdiri dari ayat 1 sampai ${response.data.jumlah_ayat}`,
                timestamp: new Date(),
            }
             interaction.editReply({embeds: [errEmbed]});
            return;
        }
        
        const surahName =  response.data.nama_latin;
        const SurahTextAR =  response.data.ayat[ayat - 1].ar;
        const SurahTextID =  response.data.ayat[ayat - 1].idn;
        const embed = {
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
        console.log(util.inspect(embed));
        try {
            interaction.editReply({embeds: [embed]});
        }
        catch (error) {
            console.log(error);
        }
    }
};