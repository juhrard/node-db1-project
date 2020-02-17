const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from('accounts')
    .then(accounts => {
      console.log(accounts)
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get the list of accounts" });
    });
});

router.get("/:id", (req, res) => {
  getById(req.params.id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get the account" });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      return getById(ids[0]).then(inserted => {
        res.status(201).json(inserted);
      });
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to add the account" });
    });
});

router.put("/:id", (req, res) => {
  // update a account
  const id = req.params.id;
  const changes = req.body;
  db("accounts")
    .where({ id }) // remember to filter or all records will be updated (BAD PANDA!!)
    .update(changes) // could be partial changes, only one column is enough
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to update the account" });
    });
});

router.delete("/:id", (req, res) => {
  // removes a account
  const id = req.params.id;
  db("accounts")
    .where({ id }) // remember to filter or all records will be deleted (BAD PANDA!!)
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to remove the account" });
    });
});

module.exports = router;

function getById(id) {
  return db("accounts")
    .where({ id })
    .first();
}
