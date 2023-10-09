const router = require("express").Router();
const Livro =require("../models/livro.model")

const express = require('express');

router.get("/", async (req, res) => {
    try {
        console.log("Request to /livro received");
        const livros = await Livro.find()
        console.log("Livros found:", livros);
        res.json(livros);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const { ObjectId } = require('mongodb');

router.put("/editar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Received id:', id);
    const { nPaginas, autor, dataPublic } = req.body;

    
    const livroId = new ObjectId(id);

    const updatedLivro = await Livro.findByIdAndUpdate(
      livroId, 
      {
        nPaginas,
        autor,
        dataPublic,
      },
      { new: true }
    );

    if (!updatedLivro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    res.json(updatedLivro);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.get("/editar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const livro = await Livro.findById(id);
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.json(livro);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/add", async (req, res) => {
  try {
    const { nPaginas, autor, dataPublic } = req.body;

    
    const novoLivro = new Livro({
      nPaginas,
      autor,
      dataPublic,
    });

    
    const livro = await novoLivro.save();

    res.status(201).json(livro); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

  module.exports = router;