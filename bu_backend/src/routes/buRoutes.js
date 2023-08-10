const router = require('express').Router();
const bu_controller = require('../controllers/bu.controller');
const db_bu_controller = require('../controllers/db_bu.controller');

// retrieve all BUs
router.get("/get_all", (req, res) => {
    db_bu_controller.findAll().then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log(err);
      res.json(err)
    })
  });
  
// retrieve list of BUs with GET parameters.
router.get("/by_id_range", (req, res) => {
    db_bu_controller.findTotalVotesByIdRange(req.query.id_inicial, req.query.id_final)
    .then((response) => {
      res.json(response)
    })    
});
  
// save new BU
router.post("/create", (req, res) => {
    console.log("posting on /bu")
    const tree_name = req.body["tree-name"]
    const data = req.body.data
    const result = bu_controller.create(tree_name, data)
    res.json(result)
})
  
router.get("/get_one", (req, res) => {
    db_bu_controller.findByInfo(req.query.turno, req.query.uf, req.query.zona, req.query.secao).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
})

router.get("/distinct_turno", (req, res) => {
  db_bu_controller.findDistinctTurno()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
router.get("/distinct_uf", (req, res) => {
  const { turno } = req.query;

  db_bu_controller.findDistinctUF(turno)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/distinct_zona", (req, res) => {
  const { turno, uf } = req.query;

  db_bu_controller.findDistinctZona(turno, uf)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/distinct_secao", (req, res) => {
  const { turno, uf, zona } = req.query;

  db_bu_controller.findDistinctSecao(turno, uf, zona)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
router.get("/electioninfo", (req, res) => {
  const { turno, UF, zona, secao } = req.query;

  db_bu_controller.consultBU(turno, UF, zona, secao).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err);
  });
});
  
// retrieve BU by ID
router.get("/:id", (req, res) => {
    db_bu_controller.findById(req.params.id).then((response) => {
        res.json(response);
    }).catch((err) => {
      res.json(err)
    })
})

module.exports = router;