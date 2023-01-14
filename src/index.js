import app from "./app.js";
import { sequelize } from './database/database.js'

//COMENTAMOS LOS MODELOS PORQUE YA GENERAMOS LAS TABLAS

// import './models/Project.js'
// import './models/Task.js'
// import './models/User.js'
// import './models/Device.js'

async function main() {
   try {
     // await sequelize.sync({ force: false })//TAMBIEN CAMBIAMOS DE FORCE:TRUE->FALSE
      //console.log('se sincronizo las tablas');
      app.listen(4000)

      //---------Para probar la conexion
      // await sequelize.authenticate();
      // console.log("la coneccion ha sido establecida");
      // app.listen(4000)
   } catch (error) {
      console.log('algo salio mal');
   }
}

main();