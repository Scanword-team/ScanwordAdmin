const express = require('express')
const config = require('config')
const sql = require('mssql')




const app = express()


//
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(express.json({ extendend: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/scanword', require('./routes/scanword.routes'))
app.use('/api/gallery', require('./routes/gallery.routes'))
app.use('/api/audio', require('./routes/audio.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await sql.connect(config.get('configsql'))
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`)
            // connection1.query('select * from Islander', function(err, result) {
            //     console.log('from User result', result)
            // })

            // sql.query('select * from Islander', function(err, result) {
            //     console.log(result)
            // })
        })
    }
    catch (e) {
        console.log("Server error ", e) 
        process.exit(1);
    }
}



start()




