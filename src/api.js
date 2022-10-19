const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

ObjectID = require('mongodb').ObjectID;

app.set('port', 8000)

app.listen(8000, function () {
  console.log('Server is running...')
})

const { MongoClient } = require('mongodb');
const HOSPITAL_DB = 'Hospistal';

const COLLECTION_PACIENTES = 'Pacientes';
const COLLECTION_CONVENIOS = 'Convenios';
const COLLECTION_EXAMES = 'Exames';
const COLLECTION_CONSULTAS = 'Consultas';


app.get('/', (req, res) => {
  const client = getClient();
  client.connect(async function (_) {
    let db = client.db(HOSPITAL_DB);
    let pacientesSemFK = [
      {
        "_id": new ObjectID(),
        "Nome": "Fulano de tal",
        "RG": "12.456.789-1",
        "CPF": "123.456.789-10",
        "Endereço": "Bairro da Tal, Rua tal, Numero 123, Apto 123, Campinas, SP",
        "Celular": "(19) 91234-5678",
        "Convenios": [
          {
            "_id": new ObjectID(),
            "Nome": "Unimed",
            "Tipo": "Particular"
          },
          {
            "_id": new ObjectID(),
            "Nome": "Uniodondo",
            "Tipo": "Coletivo"
          }
        ],
        "Exames": [
          {
            "_id": new ObjectID(),
            "Nome": "Exame geral",
            "Descricao": "Checkup anual."
          }
        ],
        "Consultas": [
          {
            "_id": new ObjectID(),
            "Médico": {
              "_id": new ObjectID(),
              "Nome": "Dr. Fulano de tal",
              "Endereço": "Bairro da Tal, Rua tal, Numero 123, Apto 123, Campinas, SP",
              "Celular": "(19) 91234-5678",
              "Especialidades": [
                {
                  "_id": new ObjectID(),
                  "Nome": "Clinico geral"
                }
              ]
            },
            "Data": "17/10/2022 14:30:00"
          }
        ]
      }
    ];
    let pacientesSemFKCollection = db.collection(COLLECTION_PACIENTES);
    pacientesSemFKCollection.remove();
    pacientesSemFKCollection.insertMany(pacientesSemFK)

    let convenio1ID = new ObjectID();
    let convenio2ID = new ObjectID();
    let convenios = [
      {
        "_id": convenio1ID,
        "Nome": "Unimed",
        "Tipo": "Particular"
      },
      {
        "_id": convenio2ID,
        "Nome": "Uniodondo",
        "Tipo": "Coletivo"
      }
    ];
    let conveniosCollection = db.collection(COLLECTION_CONVENIOS);
    conveniosCollection.remove();
    conveniosCollection.insertMany(convenios);

    let exameID = new ObjectID();
    let exames = [
      {
        "_id": exameID,
        "Nome": "Exame geral",
        "Descricao": "Checkup anual."
      }
    ];
    let examesCollection = db.collection(COLLECTION_EXAMES);
    examesCollection.remove();
    examesCollection.insertMany(exames);


    let consultaID = new ObjectID();
    let consultas = [
      {
        "_id": consultaID,
        "Médico": {
          "_id": new ObjectID(),
          "Nome": "Dr. Fulano de tal",
          "Endereço": "Bairro da Tal, Rua tal, Numero 123, Apto 123, Campinas, SP",
          "Celular": "(19) 91234-5678",
          "Especialidades": [
            {
              "_id": new ObjectID(),
              "Nome": "Clinico geral"
            }
          ]
        },
        "Data": "17/10/2022 14:30:00"
      }
    ];
    let consultasCollection = db.collection(COLLECTION_CONSULTAS);
    consultasCollection.remove();
    consultasCollection.insertMany(consultas);


    let pacientesComFK = [
      {
        "_id": new ObjectID(),
        "Nome": "Fulano de tal",
        "RG": "12.456.789-1",
        "CPF": "123.456.789-10",
        "Endereço": "Bairro da Tal, Rua tal, Numero 123, Apto 123, Campinas, SP",
        "Celular": "(19) 91234-5678",
        "Convenios": [
          convenio1ID,
          convenio2ID
        ],
        "Exames": [
          exameID
        ],
        "Consultas": [
          consultaID
        ]
      }
    ];
    let pacientesComFKCollection = db.collection(COLLECTION_PACIENTES);
    pacientesComFKCollection.insertMany(pacientesComFK);


    res.json({
      "ok": "200"
    })
  })
  client.close();
});

function getClient() {
  const connectionString = 'mongodb+srv://maligno:maligno1234@cluster0.prysevm.mongodb.net/?retryWrites=true&w=majority';
  return new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = app;