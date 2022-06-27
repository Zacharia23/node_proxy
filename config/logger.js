const pino = require('pino')


// const streams = Object.keys(levels).map((level) => {
//     return {
//         level: level, 
//         stream: pino.destination(`${__dirname}/app-${level}.log`)
//     }
// })

const streams = [
    { stream: process.stdout },
    {stream: pino.destination(`${__dirname}/combined.log`)}
]

module.exports = pino({
    level: process.env.PINO_LOG_LEVEL || 'info', 
    customLevels: pino.levels, 
    useOnlyCustomLevels: false, 
    formatters: {
        level: (label) => {
            return {level: label}
        }
    }
}, pino.multistream(streams))